const httpMethods = require("../../../app/enum/httpMethods");
const AppsControllers = require('../controllers/AppsControllers');
const appsControllers = new AppsControllers();


module.exports = class AppsRoutes {
    constructor() {
        this.controller = new AppsControllers();

        return [
            {
                path: '/apps',
                auth: true,
                notes: [],
                disabled: false,
                methods: [
                    httpMethods.GET,
                    httpMethods.POST,
                ],
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
                path: '/apps/:id',
                auth: true,
                notes: [],
                methods: [
                    httpMethods.GET,
                ],
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