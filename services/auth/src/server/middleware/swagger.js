import Exception from 'server/exception';
import Logger from 'server/utils/logger';
import Sway from 'sway';

const CONTROLLER_KEY: string = 'x-swagger-controller';
const LOGGER: Object = Logger.get('root');
const OPERATION_ID_KEY: string = 'operationId';

/**
 * [description]
 * @param  {[type]} operation   [description]
 * @param  {[type]} controllers [description]
 * @return {[type]}             [description]
 */
const findController = function (operation: Object, controllers: Object): Object {
  const controllerName: string = (CONTROLLER_KEY in operation) ?
    operation[CONTROLLER_KEY] :
    operation.pathObject[CONTROLLER_KEY];

  if (!controllerName || !(controllerName in controllers)) {
    const message: string = `Controller not found for path '[${operation.pathToDefinition}]'`;

    LOGGER.error({ message });
    throw new Exception({ message, status: 404 });
  }

  return controllers[controllerName];
};

/**
 * [description]
 * @param  {[type]} operation  [description]
 * @param  {[type]} controller [description]
 * @return {[type]}            [description]
 */
const findOperation = function (operation: Object, controller: Object): Object {
  const operationId: string = operation[OPERATION_ID_KEY];

  if (!operationId || !(operationId in controller)) {
    const message: string = `'operationId' not found for path '[${operation.pathToDefinition}]'`;

    LOGGER.error({ message });
    throw new Exception({ message, status: 404 });
  }

  return controller[operationId];
};

/**
 * [description]
 * @param  {[type]} operation [description]
 * @param  {[type]} request   [description]
 * @param  {[type]} response  [description]
 * @return {[type]}           [description]
 */
const validateResponse = function (operation: Object, request: Object): void {
  const results: Object = operation.validateResponse(request);

  if (results.warnings.length) {
    const length: number = results.warnings.length;

    for (let i = 0; i < length; i++) {
      LOGGER.warn({ message: results.warnings[i] });
    }
  }

  if (results.errors.length) {
    throw new Exception({ message: results.errors, status: 400 });
  }

  return null;
};

/**
 * [description]
 * @param  {[type]} operation [description]
 * @param  {[type]} request   [description]
 * @param  {[type]} response  [description]
 * @return {[type]}           [description]
 */
const validateRequest = function (operation: Object, request: Object): void {
  const results: Object = operation.validateRequest(request);

  if (results.warnings.length) {
    const length: number = results.warnings.length;

    for (let i = 0; i < length; i++) {
      LOGGER.warn({ message: results.warnings[i] });
    }
  }

  if (results.errors.length) {
    throw new Exception({ message: results.errors, status: 400 });
  }

  return null;
};

/**
 * [swagger description]
 * @param  {[type]} definition  [description]
 * @param  {[type]} controllers [description]
 * @return {[type]}             [description]
 */
export default async function swagger(definition: Object, controllers: Object): Function {
  const api: Object = await Sway.create({ definition });

  return (request: Object, response: Object, next: Function): void => {
    const path: Object = api.getPath(request);

    // This route is not a swagger route - continue
    if (!path) {
      return next();
    }

    const operation: Object = path.getOperation(request.method);

    try {
      validateRequest(operation, request);

      const controller: Object = findController(operation, controllers);
      const operationFn: Function = findOperation(operation, controller);
      const send: Function = response.send;

      // eslint-disable-next-line no-param-reassign
      request.sway = {
        api, // The SwaggerApi object
        path, // The Path object
        operation // The Operation object (if available)
      };

      // eslint-disable-next-line no-param-reassign
      response.send = function proxySend(body): void {
        try {
          validateResponse(operation, request);
          return send(body);
        } catch (e) {
          this.status(e.status || 500);
          return send(e);
        }
      };

      return operationFn(request, response, next);
    } catch (e) {
      return response.status(e.status || 500).send(e);
    }
  };
}
