const config = require('config');
const plugins = require('../app/plugins');
const HapiReactViews = require('hapi-react-views');
const Routes = require('./routes');
const Middleware = require('../app/middleware');


module.exports = class Server {
    constructor(App) {
        this.server = App.server({
            host: config.get('server.host'),
            port: config.get('server.port'),
        })
    }

    async initRoutes() {
        this.server.route(new Routes('v1'));
    }

    async initPlugins() {
        await this.server.register(plugins);
    }

    async initViews() {
        require('@babel/register')({
            presets: ['@babel/preset-react', '@babel/preset-env']
        });

        this.server.views({
            engines: {
                jsx: HapiReactViews
            },
            relativeTo: __dirname,
            path: 'views'
        });
    }

    async initMiddleware() {
        this.server.ext('onRequest', async (req, h) => {
            new Middleware().beforeRequest();
            return h.continue;
        });

        // this.server.ext('response', async (req, h) => {
        //     new Middleware().afterRequest();
        //     return h.continue;
        // });
    }

    async initServer() {
        try {
            await this.server.start();

            console.log(`
                Server is running!
                --- HOST: ${config.get('server.host')} ---
                --- PORT: ${config.get('server.port')} ---
            `);
        } catch (error) {
            console.error(`
                --- [ERROR] ---
                Server initialization error:
                ${error}
            `)

            process.exit(1);
        }
    }

    async init() {
        await this.initPlugins();

        await this.initViews();

        await this.initMiddleware();

        await this.initRoutes();

        await this.initServer();
    }
};