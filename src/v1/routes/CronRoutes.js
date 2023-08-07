const httpMethods = require("../../../app/enum/httpMethods");
const CronControllers = require('../controllers/CronControllers');


module.exports = class CronRoutes {
    constructor() {
        this.controller = new CronControllers();

        return [
            {
                path: '/cron-services',
                auth: true,
                notes: [],
                methods: [
                    httpMethods.GET,
                    httpMethods.POST,
                ],
                validate: {
                    headers: () => { },
                    payload: () => { },
                },
                response: {
                    schema: () => { },
                },
                handler: (req, res) => {
                    if (req.method === httpMethods.GET) {
                        return this.controller.getAll(req, res);
                    }

                    if (req.method === httpMethods.POST) {
                        return this.controller.registerOne(req, res);
                    }
                },
            },
            {
                path: '/cron-services/:id',
                auth: true,
                notes: [],
                methods: [
                    httpMethods.GET,
                    httpMethods.DELETE,
                    httpMethods.PUT,
                ],
                validate: {
                    headers: () => { },
                    payload: () => { },
                },
                response: {
                    schema: () => { },
                },
                handler: (req, res) => {
                    if (req.method === httpMethods.GET) {
                        return this.controller.getOne(req, res);
                    }

                    if (req.method === httpMethods.DELETE) {
                        return this.controller.deleteOne(req, res);
                    }

                    if (req.method === httpMethods.PUT) {
                        return this.controller.updateOne(req, res);
                    }
                },
            },
        ]
    }
}