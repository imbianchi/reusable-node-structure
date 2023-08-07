const httpMethods = require('../app/enum/httpMethods');
const httpStatus = require('./misc/httpStatus');
const v1Routes = require('./v1/routes');
const Joi = require('joi');

module.exports = class Routes {
    constructor(app, version = `v1`) {
        this.app = app;
        this.version = version;
        this.beforeRequest.bind(this.router);
        this.router = {
            app: this.app,
            version: this.version,
            routes: [
                {
                    path: '/',
                    method: httpMethods.GET,
                    auth: false,
                    validate: {
                        headers: {

                        },
                    },
                    response: {
                        schema: Joi.object().keys({
                            status: Joi.number().max(3).required(),
                            message: Joi.string().required(),
                            version: Joi.string().required(),
                        }),
                    },
                    handler: (req, res) => {
                        res.json({
                            status: httpStatus.SUCCESS,
                            message: "Server is running!",
                            version: this.version,
                        })
                    }
                },
                ...v1Routes,
            ]
        };
    }

    validateRoutes() {
        const validRoutes = [];

        this.router.routes.map(route => {
            route.path = '/' +
                this.router.version +
                (route.path !== '/' ? route.path : '');

            if (!route.disabled) {
                validRoutes.push(route);
            }
        });

        return validRoutes;
    }

    beforeRequest(req, res, next) {
        console.log(this, '0000----')
        // this.router.routes.forEach(route => {
        // })
        next();
    }

    async registerRoutes() {
        this.validateRoutes().forEach(route => {
            switch (true) {
                case route.method === httpMethods.GET:
                    this.app.get(route.path, this.beforeRequest, route.handler);

                case route.method === httpMethods.POST:
                    this.app.post(route.path, route.handler);

                case route.method === httpMethods.PUT:
                    this.app.put(route.path, route.handler);

                case route.method === httpMethods.DELETE:
                    this.app.delete(route.path, route.handler);

                case route.method === httpMethods.PATCH:
                    this.app.patch(route.path, route.handler);
                    break;
                default:
                    this.app.get(route.path, route.handler);
            }
        })
    }
};