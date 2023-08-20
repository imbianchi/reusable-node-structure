const config = require('config');

module.exports = {
  "development": {
    "username": config.get('db.development.user'),
    "password": config.get('db.development.pswd'),
    "database": config.get('db.development.name'),
    "host": config.get('db.development.host'),
    "dialect": config.get('db.dialect'),
  },
  "acceptance": {
    "username": config.get('db.acceptance.user'),
    "password": config.get('db.acceptance.pswd'),
    "database": config.get('db.acceptance.name'),
    "host": config.get('db.acceptance.host'),
    "dialect": config.get('db.dialect'),
  },
  "production": {
    "username": config.get('db.production.user'),
    "password": config.get('db.production.pswd'),
    "database": config.get('db.production.name'),
    "host": config.get('db.production.host'),
    "dialect": config.get('db.dialect'),
  }
}
