const passport = require('passport');
const express = require('express');
const config = require('config');
const bodyParser = require("body-parser");
const DBConn = require('../database');
const Routes = require('./routes');


class Server {
    constructor() {
        this.app = express();
        this.db = new DBConn(config);
        this.passport = passport;
        this.host = config.get('server.host');
        this.port = config.get('server.port');
        this.plugins = config.get('plugins');
        this.router = this.app.Router();
        this.routes = new Routes().getRoutes();
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
            this.app.use(bodyParser.json());

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
        }
        
    }

    async init() {
        await this.initPlugins();

        await this.db.initConn(config);

        await this.startServer();
        
        // this.router.get('/', (req, res) => res.send('TESTEEEEE'))
        this.app.get('/', (req, res) => res.send('TESTEEEEE'))
        // this.app.route(this.routes);
    }
}

module.exports = Server;