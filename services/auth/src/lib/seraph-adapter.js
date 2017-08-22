import model from 'seraph-model';

/**
 * [description]
 * @param  {[type]} driver [description]
 * @param  {[type]} name   [description]
 * @return {[type]}        [description]
 */
export default function (driver: Object, name: string): Object {
  const Cls: Object = model(driver, name);

  /**
   * [description]
   * @param  {[type]} idOrObject [description]
   * @return {[type]}            [description]
   */
  Cls.exists = async function (idOrObject: string | number | Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.exists(idOrObject, (err: any, result: boolean): void => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  Cls.findAll = async function (opts: Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.findAll(opts, (err: any, results: Array<Object>): void => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  Cls.prepare = async function (data: Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.prepare(data, (err: any, result: Object): void => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} root     [description]
   * @param  {[type]} compName [description]
   * @param  {[type]} object   [description]
   * @return {[type]}          [description]
   */
  Cls.push = async function (root: string, compName: string, object: Array<Object> | Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.push(root, compName, object, (err: any, results: Array<Object>): void => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} query  [description]
   * @param  {[type]} params [description]
   * @param  {[type]} opts   [description]
   * @return {[type]}        [description]
   */
  Cls.query = async function (query: string, params: Object, opts: Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.query(query, params, opts, (err: any, results: Array<Object>): void => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}         [description]
   */
  Cls.read = async function (data: Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.read(data, (err: any, result: Object): void => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}         [description]
   */
  Cls.save = async function (data: Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.save(data, (err: any, result: Object): void => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} root     [description]
   * @param  {[type]} compName [description]
   * @param  {[type]} objects  [description]
   * @return {[type]}          [description]
   */
  Cls.saveComposition = async function (
    root: string,
    compName: string,
    objects: Array<Object> | Object
  ): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.saveComposition(root, compName, objects, (err: any, results: Array<Object>): void => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}         [description]
   */
  Cls.update = async function (data: Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.update(data, (err: any, result: Object): void => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  Cls.validate = async function (data: Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      return Cls.prototype.exists(data, (err: any, result: Object): void => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  /**
   * [description]
   * @param  {[type]} predicate [description]
   * @param  {[type]} opts      [description]
   * @return {[type]}           [description]
   */
  Cls.where = function (predicate: Object, opts: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      Cls.prototype.where(predicate, opts, (err: any, result: Array<Object>) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  return Cls;
}
