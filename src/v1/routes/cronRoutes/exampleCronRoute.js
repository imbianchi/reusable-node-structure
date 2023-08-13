
const Joi = require("@hapi/joi");
const httpMethods = require("../../../../app/enums/httpMethodsEnum");
const httpStatus = require("../../../misc/httpStatus");


module.exports = class ExampleCronjobRoutes {
    constructor() {
        this.path = '/cron';

        this.exampleCronRoute = {
            path: this.path + '/example',
            method: [httpMethods.GET],
            options: {
                validate: {
                    headers: Joi.object().keys({
                        'user-agent': Joi.string().required(),
                    }).options({ allowUnknown: true }),
                },
                response: {
                    schema: Joi.object({
                        message: Joi.string().required(),
                        statusCode: Joi.number().required(),
                    }),
                },
            },
            handler: async (req, h) => {
                return {
                    message: 'Crojob Example working as expected!',
                    statusCode: httpStatus.SUCCESS,
                }
            },
        };
    };

    getRoutes() {
        return [
            this.exampleCronRoute,
        ]
    }
}