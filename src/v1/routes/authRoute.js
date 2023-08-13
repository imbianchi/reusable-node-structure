const Joi = require('@hapi/joi');
const Facade = require('../../../app/managers/facadeManager');
const AuthController = require('../controllers/authController');


module.exports = class AuthRoute {
    constructor() {
        this.facadeManager = new Facade();
        this.path = '/auth';
        this.authController = new AuthController();

        this.login = {
            path: `${this.path}/login`,
            method: ['POST'],
            options: {
                auth: false,
                validate: {
                    payload: Joi.object().keys({
                        email: Joi.string().trim().required(),
                        password: Joi.string().required(),
                    }),
                    headers: Joi.object({
                        agent: Joi.string().default('browser'),
                    }).unknown()
                },
                response: {
                    schema:
                        Joi.object({
                            message: Joi.string(),
                            data: Joi.object({
                                id: Joi.string().required(),
                                name: Joi.string().required(),
                                username: Joi.string().required(),
                                email: Joi.string().email().required(),
                                token: Joi.string().required(),
                            })
                        }).meta({ className: 'Response' }),
                },
            },
            handler: async (req, h) => {
                return await this.authController.login(req)
                    .then(result => result)
                    .catch(error => error);
            }
        }

        this.logout = {
            path: this.path + '/logout',
            method: ['POST'],
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
                    schema: Joi.object(
                        {
                            message: Joi.string(),
                            data: Joi.any()
                        },
                    ).meta({ className: 'Response' })
                }
            },
            handler: async (req, res) => {
                return await this.authController.logout(req, res)
                    .then(result => result)
                    .catch(error => error)
            }
        }
    }

    getRoutes() {
        return [
            this.login,
            this.logout,
        ]
    }
}