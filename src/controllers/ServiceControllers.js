const httpMethods = require("../../app/enum/httpMethods");
const Services = require('../services');
const services = new Services().services;


module.exports = class ServiceControllers {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.data = {};

        if (req.method === httpMethods.GET) {
            return services.serviceServices.get(this.data)
        }

        if (req.method === httpMethods.POST) {
            return services.serviceServices.post(this.data)
        }
    }
}