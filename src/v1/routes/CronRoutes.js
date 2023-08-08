const httpMethods = require("../../../app/enum/httpMethods");
const CronControllers = require('../controllers/CronControllers');


module.exports = class CronRoutes {
    constructor() {
        this.controller = new CronControllers();

        return [
            {
                path: '/cron-services',
                auth: true,
                method: httpMethods.GET,
                validate: {
                    headers: {},
                },
                response: {
                    schema: {},
                },
                handler: (req, res) => this.controller.getAll(req, res),
            },
            {
                path: '/cron-services',
                auth: true,
                method: httpMethods.POST,
                validate: {
                    headers: {},
                    payload: {},
                },
                response: {
                    schema: {},
                },
                handler: (req, res) => this.controller.registerOne(req, res),
            },
            {
                path: '/cron-services/:id',
                auth: true,
                method: httpMethods.DELETE,
                validate: {
                    headers: {},
                    params: {},
                },
                response: {
                    schema: {},
                },
                handler: (req, res) => this.controller.deleteOne(req, res),
            },
            {
                path: '/cron-services/:id',
                auth: true,
                method: httpMethods.PUT,
                validate: {
                    headers: {},
                    payload: {},
                    params: {},
                },
                response: {
                    schema: {},
                },
                handler: (req, res) => this.controller.updateOne(req, res),
            },
            {
                path: '/cron-services/:id',
                auth: true,
                method: httpMethods.GET,
                validate: {
                    headers: {},
                    params: {},
                },
                response: {
                    schema: {},
                },
                handler: (req, res) => this.controller.getOne(req, res),
            },
        ]
    }
}