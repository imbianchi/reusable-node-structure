const Facade = require('../../../app/managers/facadeManager');


module.exports = class UsersController {
    constructor() {
        this.facadeManager = new Facade();
        this.servicesEnum = this.facadeManager.servicesEnum;
        this.actionEnums = this.facadeManager.actionEnums;
    }

    async getAll(req) {
        return await this.facadeManager.action({
            service: this.servicesEnum.user,
            action: this.actionEnums.getAll,
        }).then(result => result)
            .catch(error => {
                // @TODO: CREATE LOG HERE
            })
    }

    async getOne(req) {
        const reqData = {
            id: req.params.id,
            email: req.params.email,
        }

        return await this.facadeManager.action({
            service: this.servicesEnum.user,
            action: this.actionEnums.getOne,
            data: reqData,
        }).then(result => result)
            .catch(error => {
                // @TODO: CREATE LOG HERE
            })
    }

    async createOne(req) {
        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.user,
            this.facadeManager.actionEnums.createOne,
        ).then(result => result)
            .catch(error => {
                // @TODO: CRATE LOG HERE
            })
    }

    async deleteOne(req) {
        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.user,
            this.facadeManager.actionEnums.deleteOne,
        ).then(result => result)
            .catch(error => {
                // @TODO: CRATE LOG HERE
            })
    }

    async updateOne(req) {
        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.user,
            this.facadeManager.actionEnums.updateOne,
            data,
        ).then(result => result)
            .catch(error => {
                this.replyManager.handleError(
                    this.replyManager.statusEnum.badRequest,
                    error,
                )
            })
    }
}