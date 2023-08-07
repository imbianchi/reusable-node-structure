module.exports = class Middleware {
    constructor(app, routes) {
        this.app = app;
        this.routes = routes;
    }

    async validateHandlers() {
        console.log(this.routes, '------')
    }



}