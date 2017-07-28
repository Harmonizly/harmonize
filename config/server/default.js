module.exports = {
  "loggers": {
    "handlers": [
      {
        "name": "root",
        "level": "debug"
      },
      {
        "name": "auth",
        "level": "debug"
      },
      {
        "name": "db",
        "level": "debug"
      }
    ],
    "streams": {}
  },
  "server": {
    "backlog": 511,
    "hostname": "localhost",
    "port": 3000,
    "secure": false,
    "assets": {
      "cdn": "//s3.amazonaws.com/",
      "staticRoot": "static"
    },
    "ssl": {
      "key": "",
      "cert": "",
      "passphrase": ""
    }
  }
}
