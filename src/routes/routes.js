const httpMethods = require('../../app/enum/httpMethods');
const v1Routes = require('./v1');

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
                    validate: {
                        headers: () => {},
                        payload: () => {},
                    },
                    response: {
                        schema: () => {},
                    },
                    handler: (req, res) => {
                        res.json({
                            status: 200,
                            message: "Server is running!",
                            version: this.version,
                        })
                    }
                },
                ...v1Routes,
            ]
        };
    }

    async registerRoutes() {
        this.router.routes.map(route => {
            route.path = '/' +
                this.router.version +
                (route.path !== '/' ? route.path : '');

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
        });
    }
};