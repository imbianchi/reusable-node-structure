const config = require('config');
const plugins = require('../app/plugins');
const HapiReactViews = require('hapi-react-views');
const Middleware = require('../app/middleware');
const Routes = require('./routes');
const DBConnect = require('../app/database');
const SecurityManager = require('../app/managers/securityManager');


module.exports = class Server {
    constructor(app) {
        this.securityManager = new SecurityManager();
        this.routes = new Routes('v1');
        this.middleware = new Middleware();
        this.db = new DBConnect({
            dbHost: config.get('db.host'),
            dbName: config.get('db.name'),
            dbPort: config.get('db.port'),
            dbPswd: config.get('db.pswd'),
            dbUriPrefix: config.get('db.uriPrefix'),
            dbUser: config.get('db.user'),
            dbDebug: config.get('db.debug'),
            dbEnv: config.get('db.env'),
            dbString: config.get('db.connString'),
        });
        this.server = app.server({
            host: config.get('server.host'),
            port: config.get('server.port'),
            routes: {
                security: true,
                cors: {
                    credentials: true,
                    exposedHeaders: ['x-total-count'],
                }
            }
        });
    }

    async initRoutes() {
        this.routes.getRoutes()
            .forEach(route => this.server.route(route));
    }

    async initSecurityStrategy() {
        await this.server.auth.strategy('token', 'jwt', {
            key: config.get('security.apiTokenKey'),
            validate: (req, decodedData) => {
                try {
                    let token = decodedData.auth.token;
                    const decryptedData = this.securityManager.decryptToken(token);

                    return { isValid: true };
                } catch (error) {
                    // @TODO: ERROR LOG HERE
                    return { isValid: false };
                }
            },
            verifyOptions: config.get('security.tokenMaxAge'),
            algorithms: [
                config.get('security.tokenAlgorithm'),
            ],
        })
    }

    async initPlugins() {
        await this.server.register(plugins);
    }

    async initViews() {
        require('@babel/register')({
            presets: [
                '@babel/preset-react',
                '@babel/preset-env'
            ],
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
        await this.middleware.register();
    }

    async initDBConn() {
        this.db.connect();
    }

    async start() {
        try {
            await this.server.start();
        } catch (error) {
            console.error(`
                --- [ERROR] ---
                Server initialization error:
                ${error}
            `)

            // @TODO: GENERATE LOG HERE

            process.exit(1);
        }

        if (config.get('server.env') !== 'production') {
            console.log(`
                🖥️  Server is running! 🙂
                ### HOST: ${config.get('server.host')} ###
                ### PORT: ${config.get('server.port')} ###
                Check: http://${config.get('server.host')}:${config.get('server.port')}
            `)
        }
    }

    async init() {
        await this.initPlugins();
        await this.initDBConn();
        await this.initSecurityStrategy();
        await this.initViews();
        await this.initRoutes();
        await this.initMiddleware();
        await this.start();
    }
};