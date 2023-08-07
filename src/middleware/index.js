const Joi = require('joi');


module.exports = class Middleware {
    constructor(app, routes) {
        this.app = app;
        this.routes = routes;
    }
}