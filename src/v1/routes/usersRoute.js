const Joi = require("@hapi/joi");
const httpMethodsEnum = require("../../../app/enums/httpMethodsEnum");
const UsersController = require("../controllers/usersController");


module.exports = class UsersRoute {
    constructor() {
        this.path = '/users';
        this.usersController = new UsersController();

        this.getAll = {
            path: this.path,
            method: [httpMethodsEnum.GET],
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
                return await this.usersController.getAll(req)
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
            method: [httpMethodsEnum.GET],
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
                return await this.usersController.getOne(req)
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
            method: [httpMethodsEnum.POST],
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
                return await this.usersController.createOne(req)
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
            method: [httpMethodsEnum.DELETE],
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
                return await this.usersController.deleteOne(req)
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
            method: [httpMethodsEnum.PUT],
            config: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().required(),
                        username: Joi.string().required().min(5),
                    }),
                },
            },
            handler: async (req, h) => {
                return await this.usersController.updateOne(req)
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