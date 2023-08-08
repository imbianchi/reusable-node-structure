const Joi = require('joi');


module.exports = class Middleware {
    constructor(app, routes) {
        this.app = app;
        this.routes = routes;
        this.beforeRequest = this.app.use((req, res, next) => {
            this.validateRoutesBeforeRequest()
            next();
        })

        this.afterRequest = this.app.use((req, res, next) => {
            next();
        })
    }

    validateRoutesBeforeRequest() {
        this.routes.forEach(route => {
            const headers = route.validate.headers;
            const payload = route.validate.payload;
            const params = routes.validate.params;

            console.log(route.validate.headers, '-000')
        });
    }

    validateRoutesAfterRequest() {
        this.routes.forEach(route => {
            const response = route.response;

            console.log(route.validate.headers, '-000')
        });
    }
}