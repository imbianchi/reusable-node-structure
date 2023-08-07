const ServiceServices = require('./ServiceServices');


module.exports = class MainController {
    constructor() {
        this.services = {
            serviceServices: {
                get: () => { },
                post: () => { },
            }
        }

        return this.services;
    }
}