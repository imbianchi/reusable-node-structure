const httpMethods = require('../app/enums/httpMethodsEnum');
const httpStatus = require('./misc/httpStatus');
const Joi = require('@hapi/joi');
const CronjobExample = require('./v1/routes/cronRoutes/exampleCronRoute');
const UsersRoute = require('./v1/routes/usersRoute');
const AuthRoute = require('./v1/routes/authRoute');


module.exports = class Routes {
    constructor(version) {
        this.version = version;

        this.root = {
            method: [httpMethods.GET],
            path: '/',
            options: {
                auth: false,
                validate: {
                    headers: Joi.object().keys({
                        'user-agent': Joi.string().required(),
                    }).options({ allowUnknown: true }),
                },
                response: {
                    schema: Joi.object({
                        statusCode: Joi.number().required(),
                        message: Joi.string().required(),
                        version: Joi.string().required(),
                    }),
                },
            },
            handler: async (req, h) => {
                return h.response({
                    statusCode: httpStatus.SUCCESS,
                    message: 'Server is running!',
                    version: this.version,
                });
            },
        };

        this.notFound = {
            method: ['*'],
            path: '/{p}',
            handler: (req, h) => h.view('404'),
        };
    };

    getRoutes() {
        return [
            this.root,
            this.notFound,
            new CronjobExample().getRoutes(),
            new UsersRoute().getRoutes(),
            new AuthRoute().getRoutes(),
        ];
    };
};