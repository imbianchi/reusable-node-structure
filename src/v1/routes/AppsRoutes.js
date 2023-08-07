const httpMethods = require("../../../app/enum/httpMethods");
const AppsControllers = require('../controllers/AppsControllers');


module.exports = class AppsRoutes {
    constructor() {
        this.controller = new AppsControllers();

        return [
            {
                path: '/apps',
                auth: true,
                methods: httpMethods.GET,
                validate: {
                    headers: () => { },
                },
                response: {
                    schema: () => { },
                },
                handler: (req, res) => this.controller.getAll(req, res),
            },
            {
                path: '/apps/:id',
                auth: true,
                methods: httpMethods.GET,
                validate: {
                    headers: () => { },
                    params: {},
                },
                response: {
                    schema: () => { },
                },
                handler: (req, res) => this.controller.getOne(req, res),
            },
            {
                path: '/apps',
                auth: true,
                methods: httpMethods.POST,
                validate: {
                    headers: () => { },
                    payload: {},
                },
                response: {
                    schema: () => { },
                },
                handler: (req, res) => this.controller.registerOne(req, res),
            },
            {
                path: '/apps/:id',
                auth: true,
                methods: httpMethods.DELETE,
                validate: {
                    headers: () => { },
                    params: {},
                },
                response: {
                    schema: () => { },
                },
                handler: (req, res) => this.controller.deleteOne(req, res),
            },
            {
                path: '/apps/:id',
                auth: true,
                methods: httpMethods.PUT,
                validate: {
                    headers: () => { },
                    params: {},
                    payload: {}
                },
                response: {
                    schema: () => { },
                },
                handler: (req, res) => this.controller.updateOne(req, res),
            },
        ]
    }
}