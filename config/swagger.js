module.exports = {
  "fittingsDirs": [ "./dist/fittings", "node_modules" ],
  "defaultPipe": null,
  "swaggerControllerPipe": "swagger_controllers",
  "bagpipes": {
    "_router": {
      "name": "router",
      "mockMode": false
    },
    "_swagger_validate": {
      "name": "swagger_validator",
      "validateResponse": true
    },
    "swagger_controllers": [
      {
        "onError": "json_error_handler"
	    },
      "swagger_params_parser",
	    "swagger_security",
	    "_swagger_validate",
	    "express_compatibility",
	    "_router"
    ],
    "swagger_raw": {
      "name": "swagger_raw"
    }
  }
};
