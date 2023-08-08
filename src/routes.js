const httpMethods = require('../app/enum/httpMethods');
const httpStatus = require('./misc/httpStatus');
const v1Routes = require('./v1/routes');
const Middleware = require('./middleware');
const Joi = require('joi');

module.exports = class Routes {
    constructor(app, version = `v1`) {
        this.app = app;
        this.version = version;
        this.router = {
            app: this.app,
            version: this.version,
            routes: [
                {
                    path: '/',
                    method: httpMethods.GET,
                    auth: false,
                    validate: {
                        headers: Joi.object({
                            agent: Joi.string().default('browser'),
                            'app-version': Joi.number().default(0),
                        }).unknown(),
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
        this.middleware = new Middleware(this.app, this.router.routes);
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

    async registerRoutes() {
        this.validateRoutes().forEach(route => {
            switch (true) {
                case route.method === httpMethods.GET:
                    this.app.get(
                        route.path,
                        route.handler,
                    );

                // case route.method === httpMethods.POST:
                //     this.app.post(route.path, this.middleware, route.handler);

                // case route.method === httpMethods.PUT:
                //     this.app.put(route.path, this.middleware, route.handler);

                // case route.method === httpMethods.DELETE:
                //     this.app.delete(route.path, this.middleware, route.handler);

                // case route.method === httpMethods.PATCH:
                //     this.app.patch(route.path, this.middleware, route.handler);
                //     break;
                // default:
                //     this.app.get(route.path, this.middleware, route.handler);
            }
        })
    }
};