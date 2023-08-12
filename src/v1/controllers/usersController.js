const Facade = require('../application/managers/facadeManager');
const ReplyManager = require('../application/managers/replyManager');
const Config = require('../config');
const statusEnum = require('../application/enums/statusEnum');
const actionEnum = require('../application/enums/actionEnum');
const SecurityManager = require('../application/managers/securityManager');


module.exports = class UserController {
    constructor() { }

    async getAll(req) {
        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.user,
            this.facadeManager.actionEnums.getAll
        ).then(result => {
            return this.replyManager
                .handleSuccess('Data fetched.', result)
        }).catch(error => {
            // @TODO: CREATE LOG HERE
            this.replyManager.handleError(
                error.status,
                error,
            )
        })
    }

    async getOne(req) {
        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.user,
            this.facadeManager.actionEnums.getOne,
        ).then(result => {
            return this.replyManager
                .handleSuccess('Data fetched.', result)
        }).catch(error => {
            // @TODO: CREATE LOG HERE
        })
    }

    async createOne(req) {
        const { payload } = req;
        const { id } = req.params;

        const data = {
            id,
            username: payload.username,
            email: payload.email,
        }

        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.user,
            this.facadeManager.actionEnums.createOne,
            data,
        ).then(result => {
            return this.replyManager
                .handleSuccess('User Created.', result)
        }).catch(error => {
            // @TODO: CRATE LOG HERE
        })
    }

    async deleteOne(req) {
        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.user,
            this.facadeManager.actionEnums.delete,
            { _id: req.params.id },
        ).then(result => {
            return this.replyManager
                .handleSuccess('User deleted!.', result)
        }).catch(error => {
            // @TODO: CRATE LOG HERE
        })
    }

    async updateOne(req) {
        const { name } = req.payload;
        const { id } = req.params

        const data = {
            _id: id,
            name,
        }

        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.user,
            this.facadeManager.actionEnums.updateOne,
            data,
        ).then(result => {
            return this.replyManager
                .handleSuccess('User updated!', result)
        }).catch(error => {
            this.replyManager.handleError(
                this.replyManager.statusEnum.badRequest,
                error,
            )
        })
    }
}