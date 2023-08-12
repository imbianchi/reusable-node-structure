const httpMethods = require("../../../app/enums/httpMethods");


module.exports = class UserRoutes {
    constructor() {
        this.path = '/users';

        this.getAll = {
            path: this.path,
            method: [httpMethods.GET],
            options: {
                disabled: true,
                auth: 'token',
                validate: {
                    headers: Joi.object(
                        {
                            authorization: Joi.string().required(),
                            agent: Joi.string().default('browser'),
                        },
                    ).unknown(),
                },
                response: {
                    schema:
                        Joi.object({
                            message: Joi.string(),
                            data: Joi.array().items({
                                _id: Joi.string().required(),
                                name: Joi.string().required(),
                                username: Joi.string().required(),
                                email: Joi.string().email().required(),
                                createdAt: Joi.any(),
                                updatedAt: Joi.any(),
                            })
                        }),
                },
            },
            handler: async (req, h) => {
                return await this.userControllerss.getAll(req)
                    .then(result => result)
                    .catch(error => {
                        console.log(
                            '[ERROR] - [File: userRoutes.js - METHOD this.getAll - ',
                            `[${now}] - Error: `, error
                        );
                        throw error;
                    });
            },
        };

        this.getOne = {
            path: `${this.path}/{id}`,
            method: [httpMethods.GET],
            options: {
                auth: 'token',
                validate: {
                    headers: Joi.object(
                        {
                            authorization: Joi.string().required(),
                            agent: Joi.string().default('browser'),
                        },
                    ).unknown(),
                },
                response: {
                    schema:
                        Joi.object({
                            message: Joi.string(),
                            data: Joi.object({
                                _id: Joi.string().required(),
                                name: Joi.string().required(),
                                username: Joi.string().required(),
                                email: Joi.string().email().required(),
                                createdAt: Joi.any(),
                                updatedAt: Joi.any(),
                                __v: Joi.any(),
                            })
                        }),
                },
            },
            handler: async (req, h) => {
                return await this.userControllers.getOne(req)
                    .then(result => result)
                    .catch(error => {
                        console.log(
                            '[ERROR] - [File: userRoutes.js - METHOD this.getOne - ',
                            `[${now}] - Error: `, error
                        );
                        throw error;
                    });
            }
        }

        this.createOne = {
            path: this.path,
            method: [httpMethods.POST],
            config: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().required(),
                        username: Joi.string().required().min(5),
                        email: Joi.string().email().required(),
                    }),
                },
            },
            handler: async (req, h) => {
                return await this.userControllers.createOne(req)
                    .then(result => result)
                    .catch(error => {
                        console.log(
                            '[ERROR] - [File: userRoutes.js - METHOD this.createOne - ',
                            `[${now}] - Error: `, error
                        );
                        throw error;
                    });
            }
        };

        this.deleteOne = {
            path: `${this.path}/{id}`,
            method: [httpMethods.DELETE],
            config: {
                validate: {
                    headers: Joi.object({
                        authorization: Joi.string().required(),
                        agent: Joi.string().default('browser'),
                    },
                    ).unknown(),
                },
            },
            handler: async (req, h) => {
                return await this.userControllers.deleteOne(req)
                    .then(result => result)
                    .catch(error => {
                        console.log(
                            '[ERROR] - [File: userRoutes.js - METHOD this.deleteOne - ',
                            `[${now}] - Error: `, error
                        );
                        throw error;
                    });
            }
        };

        this.updateOne = {
            path: `${this.path}/{id}`,
            method: [httpMethods.PUT],
            config: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().required(),
                        username: Joi.string().required().min(5),
                    }),
                },
            },
            handler: async (req, h) => {
                return await this.userControllers.updateOne(req)
                    .then(result => result)
                    .catch(error => {
                        console.log(
                            '[ERROR] - [File: userRoutes.js - METHOD this.updateOne - ',
                            `[${now}] - Error: `, error
                        );
                        throw error;
                    });
            }
        };
    };

    getRoutes() {
        return [
            this.getAll,
            this.getOne,
            this.createOne,
            this.deleteOne,
            this.updateOne,
        ]
    }
}