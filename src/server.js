const passport = require('passport');
const config = require('config');
const DBConn = require('../database');
const Routes = require('./routes/routes');


module.exports = class Server {
    constructor(app) {
        this.db = new DBConn(config);
        this.passport = passport;
        this.host = config.get('server.host');
        this.port = config.get('server.port');
        this.plugins = config.get('plugins');
        this.app = app();
    }

    async initPlugins() {
        this.plugins.forEach(pluginName => {
            const plugin = require(pluginName);

            if (typeof plugin.init !== 'function') return;

            console.log(`Initiating plugin ---> `, pluginName);

            plugin.init();
        });
    }

    async startServer() {
        try {
            new Routes(this.app).registerRoutes();

            this.app.listen(this.port, () => {
                console.log(`
                    Server is running!    
                    --- HOST: ${this.host} ---
                    --- PORT: ${this.port} ---
                `);
            });
        } catch (error) {
            console.error(`
                Server initialization error:
                --- [ERROR] ---
                ${error}
            `)

            process.exit(1);
        }

    }

    async init() {
        await this.initPlugins();

        await this.db.initConn(config);

        await this.startServer();
    }
}