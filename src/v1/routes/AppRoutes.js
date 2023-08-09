const Joi = require("joi");
const httpMethods = require("../../../app/enum/httpMethods");
const AppControllers = require('../controllers/AppControllers');


module.exports = class AppRoutes {
    constructor() {
        this.controller = new AppControllers();

        return [
            {
                path: '/app',
                auth: true,
                methods: httpMethods.GET,
                validate: {
                    headers: Joi.object({
                        agent: Joi.string().default('browser'),
                        'app-version': Joi.number().default(0),
                    }).unknown(),
                },
                response: {
                    schema: {},
                },
                handler: (req, res) =>
                    this.controller.getAll(req, res),
            },
            {
                path: '/app/:id',
                auth: true,
                methods: httpMethods.GET,
                validate: {
                    headers: Joi.object({
                        agent: Joi.string().default('browser'),
                        'app-version': Joi.number().default(0),
                    }).unknown(),
                    params: {
                        id: Joi.string().required(),
                    },
                },
                response: {
                    schema: {
                        id: Joi.string().required(),
                    },
                },
                handler: (req, res) =>
                    this.controller.getOne(req, res),
            },
            {
                path: '/app',
                auth: true,
                methods: httpMethods.POST,
                validate: {
                    headers: Joi.object({
                        agent: Joi.string().default('browser'),
                        'app-version': Joi.number().default(0),
                    }).unknown(),
                    payload: {
                        appName: Joi.string().required().max(45).min(5),
                    },
                },
                response: {
                    schema: {
                        id: Joi.string().required(),
                    },
                },
                handler: (req, res) =>
                    this.controller.registerOne(req, res),
            },
            {
                path: '/app/:id',
                auth: true,
                methods: httpMethods.DELETE,
                validate: {
                    headers: Joi.object({
                        agent: Joi.string().default('browser'),
                        'app-version': Joi.number().default(0),
                    }).unknown(),
                    params: {
                        id: Joi.string().required(),
                    },
                },
                response: {
                    schema: {
                        id: Joi.string().required(),
                    },
                },
                handler: (req, res) =>
                    this.controller.deleteOne(req, res),
            },
            {
                path: '/app/:id',
                auth: true,
                methods: httpMethods.PUT,
                validate: {
                    headers: Joi.object({
                        agent: Joi.string().default('browser'),
                        'app-version': Joi.number().default(0),
                    }).unknown(),
                    params: {
                        id: Joi.string().required(),
                    },
                    payload: {
                        appName: Joi.string().required().max(45).min(5),
                    }
                },
                response: {
                    schema: {
                        id: Joi.string().required(),
                    },
                },
                handler: (req, res) =>
                    this.controller.updateOne(req, res),
            },
        ]
    }
}