const mongoose = require('mongoose');
const mongodb = require('mongodb');
const config = require('config');



module.exports = class DBConnect {
    constructor({
        dbEnv = "development",
        dbUriPrefix,
        dbUser,
        dbPswd,
        dbName,
        dbString = "",
        dbHost,
        dbPort,
        dbDebug = false,
        db = {},
    }) {
        this.dbDebug = dbDebug;
        this.dbEnv = dbEnv;
        this.dbUriPrefix = dbUriPrefix;
        this.dbUser = dbUser;
        this.dbPswd = dbPswd;
        this.dbName = dbName;
        this.dbString = dbString;
        this.dbHost = dbHost;
        this.dbPort = dbPort;
        this.db = db;
    }

    async checkAndCreateDB() {
        const client = new mongodb.MongoClient(`mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`);

        const newDB = client.db(config.get('db.name'));
        const collections = await client.db().listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        if (!collectionNames.includes('users')) {
            newDB.createCollection("users");

            console.log('Database & Users table created!');
        }
    }

    async connect() {
        try {
            this.checkAndCreateDB();

            if (this.dbString) {
                mongoose.connect(this.dbString);
                this.db = mongoose.connection;
            } else {
                this.db = mongoose.connect(`${this.dbUriPrefix}://${this.dbUser}:${this.dbPswd}@${this.dbHost}:${this.dbPort}/${this.dbName}`);
            }
        } catch (error) {
            // @TODO: CREATE ERROR LOG HERE
            console.log(`Error when starting Database conn: ${error}`);
        }

        if (this.dbDebug) {
            this.db.on('connected', () =>
                console.log('### Database connected successfully! ###'));

            this.db.on('disconnected', () =>
                console.log('Database is disconnected successfully'))

            this.db.on('error', (err) =>
                console.log('Database connection error:', err));
        }
    };
}