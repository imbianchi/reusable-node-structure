const express = require('express');


class Server {
    constructor() {
        this.app = express();
    }

    initDBConn() {
        console.log('Initiated DB Conn')
    }

    initRoutes() {
        console.log('Initiated Routes')
    }

    initPlugins() {
        console.log('Initiated Plugins')
    }

    init() {
        this.initDBConn();

        this.initRoutes();

        this.initPlugins();

        this.app.listen(process.env.PORT, () => {
            console.log(`
                Server is running...
                --- Port: ${process.env.PORT} ---
                --- Host: ${process.env.HOST} ---
            `)
        })
    }
}

module.exports = Server;