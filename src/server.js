const passport = require('passport');
const config = require('config');
const DBConn = require('../database');
const Routes = require('./routes');
const Middleware = require('./middleware');


module.exports = class Server {
    constructor(app) {
        this.db = new DBConn(config);
        this.passport = passport;
        this.port = config.get('server.port');
        this.plugins = config.get('plugins');
        this.app = app();
        this.router = new Routes(this.app);
        this.middleware = new Middleware(app, this.router.router.routes);
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
            this.app.listen(this.port, () => {
                console.log(`
                    Server is running!    
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

        this.router.registerRoutes();

        this.middleware.validateHandlers();

        await this.startServer();
    }
}