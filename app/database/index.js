const { Sequelize } = require('sequelize');
const config = require('config');


class DBConnect {
    constructor({
        dbUser,
        dbPswd,
        dbName,
        dbString = "",
        dbHost,
        dbPort,
        dbDebug = false,
        dbDialect,
        db = {},
    }) {
        this.dbDebug = dbDebug;
        this.dbUser = dbUser;
        this.dbPswd = dbPswd;
        this.dbName = dbName;
        this.dbString = dbString;
        this.dbDialect = dbDialect;
        this.dbHost = dbHost;
        this.dbPort = dbPort;
        this.db = db;
    }

    async checkDBConnection() {
        try {
            await this.db.authenticate();
            console.log('Connection with database has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        this.closeDbConn();
    }

    async closeDbConn() {
        try {
            await this.db.close();
            console.log('Connection with database has been closed successfully.');
        } catch (error) {
            console.error('Unable to close database connection:', error);
        }
    }

    connect() {
        try {
            if (!this.dbString) {
                this.db = new Sequelize(this.dbName, this.dbUser, this.dbPswd, {
                    host: this.dbHost,
                    port: this.dbPort,
                    dialect: this.dbDialect,
                });
            } else {
                this.db = new Sequelize(this.dbString);
            }
        } catch (error) {
            // @TODO: CREATE ERROR LOG HERE
            console.log(`Error when starting Database conn: ${error}`);
        }

        if (this.dbDebug) {
            this.checkDBConnection();
        }

        return this;
    };
}

function handleDBEnv() {
    if (config.get('server.env') === 'development') {
        return new DBConnect({
            dbHost: config.get('db.development.host'),
            dbName: config.get('db.development.name'),
            dbPort: config.get('db.development.port'),
            dbPswd: config.get('db.development.pswd'),
            dbUser: config.get('db.development.user'),
            dbDebug: config.get('db.development.debug'),
            dbString: config.get('db.development.connString'),
            dbDialect: config.get('db.dialect'),
        }).connect();
    }

    if (config.get('server.env') === 'acceptance') {
        return new DBConnect({
            dbHost: config.get('db.acceptance.host'),
            dbName: config.get('db.acceptance.name'),
            dbPort: config.get('db.acceptance.port'),
            dbPswd: config.get('db.acceptance.pswd'),
            dbUser: config.get('db.acceptance.user'),
            dbDebug: config.get('db.acceptance.debug'),
            dbString: config.get('db.acceptance.connString'),
            dbDialect: config.get('db.dialect'),
        }).connect();
    }

    if (config.get('server.env') === 'production') {
        return new DBConnect({
            dbHost: config.get('db.production.host'),
            dbName: config.get('db.production.name'),
            dbPort: config.get('db.production.port'),
            dbPswd: config.get('db.production.pswd'),
            dbUser: config.get('db.production.user'),
            dbDebug: config.get('db.production.debug'),
            dbString: config.get('db.production.connString'),
            dbDialect: config.get('db.dialect'),
        }).connect();
    }
}

const DBSingleton = handleDBEnv();

module.exports = DBSingleton;