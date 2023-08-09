const Joi = require('joi');
const httpStatus = require('../misc/httpStatus');
const _ = require('lodash');


module.exports = class Middleware {
    constructor(app, routes) {
        this.app = app;
        this.routes = routes;
        this.beforeRequest = this.app.use((req, res, next) => {
            const result = this.validateRoutesBeforeRequest(req, res);

            if (!result.isValid) {
                return res.send({
                    status: httpStatus.BAD_REQUEST,
                    message: `Bad Request. Please verify your request content.`
                })
            }

            next();
        })

        this.afterRequest = this.app.use((req, res, next) => {
            const result = this.validateRoutesAfterRequest(req, res);

            if (!result) {
                // @TODO: implement error handling here for response
            }

            next();
        })
    }

    validateRoutesBeforeRequest(req) {
        this.routes.forEach(route => {
            const headersSchema = route.validate.headers;
            const payloadSchema = route.validate.payload;
            const paramsSchema = route.validate.params;
            const data = {
                isValid: true,
            };

            if (headersSchema == undefined || _.isEmpty(headersSchema)) {
                data.isValid = false;
                data.headers = 'Headers must have a Schema Validation!'
            }

            if (payloadSchema !== undefined) {
                if (!payloadSchema.validate(req.body)) {
                    data.isValid = false;
                    data.payload = 'Payload request validation error';
                }
            }

            if (paramsSchema !== undefined) {
                if (!paramsSchema.validate(req.params)) {
                    data.isValid = false;
                    data.payload = 'Params request validation error';
                }
            }

            // if (_.isEmpty(payloadSchema)) {
            //     data.isValid = false;
            //     data.payload = 'Payload must have a Schema Validation!'
            // }

            // if (_.isEmpty(paramsSchema)) {
            //     data.isValid = false;
            //     data.params = 'Params must have a Schema Validation!'
            // }

            // if(!data.isValid) return data;


            // data.isValid = headersSchema.validate(req.headers);
            // data.isValid = payloadSchema.validate(req.body);
            // data.isValid = paramsSchema.validate(req.params);

            console.log(data, `------------------`)
        });
    }

    validateRoutesAfterRequest() {
        this.routes.forEach(route => {
            const response = route.response;
        });
    }
}