const httpMethods = require('../app/enum/httpMethods');
const httpStatus = require('./misc/httpStatus');
const v1Routes = require('./v1/routes');

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
                    methods: [httpMethods.GET],
                    auth: false,
                    notes: [],
                    disabled: false,
                    validate: {
                        headers: () => { },
                        payload: () => { },
                    },
                    response: {
                        schema: () => { },
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

    async registerRoutes() {
        this.validateRoutes().forEach(route => {
            switch (true) {
                case route.methods.includes(httpMethods.GET):
                    this.app.get(route.path, route.handler);

                case route.methods.includes(httpMethods.POST):
                    this.app.post(route.path, route.handler);

                case route.methods.includes(httpMethods.PUT):
                    this.app.put(route.path, route.handler);

                case route.methods.includes(httpMethods.DELETE):
                    this.app.delete(route.path, route.handler);

                case route.methods.includes(httpMethods.PATCH):
                    this.app.patch(route.path, route.handler);
                    break;
                default:
                    this.app.get(route.path, route.handler);
            }
        })
    }
};