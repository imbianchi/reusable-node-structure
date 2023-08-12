const Boom = require("@hapi/boom");
const Config = require('../../config');
const statusEnum = require('../enums/statusEnum');


module.exports = class ReplyManager {
    constructor() {
        this.config = new Config();
        this.statusEnum = statusEnum;
    }

    handleSuccess(message, data) {
        return { message, data }
    }

    handleError(errorStatus, error = null) {
        let message = 'Something went wrong. Please, try again later.';

        if (error != null) {
            message = error.message;

            switch (errorStatus) {
                case this.statusEnum.notFound:
                    throw Boom.notFound(message);
                case this.statusEnum.badRequest:
                    throw Boom.badRequest(message);
                case this.statusEnum.unauthorized:
                    throw Boom.unauthorized(message)
                case this.statusEnum.internalServerError:
                    throw Boom.internal(message)
                case this.statusEnum.notImplemented:
                    throw Boom.notImplemented(message)

                default:
                case this.statusEnum.internalServerError:
                    throw Boom.internal(message)
            }
        }
    }
}