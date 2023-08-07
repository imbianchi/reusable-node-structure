const ServiceControllers = require('./ServiceControllers');


module.exports = class MainController {
    constructor() {
        this.controllers = {
            serviceControllers: (req, res) =>
                new ServiceControllers(req, res),
        }

        return this.controllers;
    }
}