const db = require('mongoose');

module.exports = class DBConn {
    constructor(config) {
        this.db = db;
        this.config = config;
        this.dbConn = `
            mongodb://${this.config.get('db.user')}:
            ${this.config.get('db.password')}@
            ${this.config.get('db.server')}/
            ${this.config.get('db.name')}
        `;
    }

    async initConn() {
        try {
            await this.db.connect(
                this.config.has('db.connString') ?
                    this.config.get('db.connString') :
                    this.dbConn
            );

            this.db.connection.on('open', (error) => {
                if (!error) {
                    console.log('DB connected succesfully!');
                }
            })
        } catch (error) {
            console.error(`
                DB Connection initialization error:
                --- [ERROR] ---
                ${error}
            `);
        }
    }
}