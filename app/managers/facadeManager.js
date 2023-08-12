const actionEnums = require('../enums/actionEnum');
const servicesEnum = require('../enums/servicesEnum');
const UserService = require('../services/userService');
const AuthService = require('../services/authService');
const SecurityManager = require('../managers/securityManager');
const ReplyManager = require('./replyManager');
const ItemService = require('../services/itemService');
const now = new Date();


module.exports = class Facade {
    constructor() {
        this.actionEnums = actionEnums;
        this.servicesEnum = servicesEnum;

        this.securityManager = new SecurityManager();
        this.replyManager = new ReplyManager();

        this.services = [];
        this.services[servicesEnum.user] = new UserService();
        this.services[servicesEnum.auth] = new AuthService();
        this.services[servicesEnum.item] = new ItemService();
    };

    async _auth(request) {
        return await this.services[servicesEnum.auth].authenticate(request)
            .then(result => result)
            .catch(error => {
                console.log(
                    '[ERROR] - [File: facadeManager.js - METHOD _AUTH - ',
                    `[${now}] - ${error}`,
                );

                this.replyManager.handleError(
                    this.replyManager.statusEnum.unauthorized,
                    error,
                )
            });
    };

    async action(service, action, data, auth = false) {
        if (auth) {
            data.loggedUser = await this._auth(data)
                .then(result => result)
                .catch(error => {
                    console.log(
                        '[ERROR] - [File: facadeManager.js - METHOD async action - ',
                        `[${now}] - ${error}`, ``
                    );

                    this.replyManager.handleError(
                        this.replyManager.statusEnum.unauthorized,
                        error,
                    )
                });
        };

        switch (action) {
            case actionEnums.index:
                return this.services[service].index(data);
            case actionEnums.find:
                return this.services[service].find(data);
            case actionEnums.insert:
                return this.services[service].insert(data);
            case actionEnums.delete:
                return this.services[service].delete(data);
            case actionEnums.update:
                return this.services[service].update(data);

            case actionEnums.login:
                return this.services[service].login(data)
            case actionEnums.refreshToken:
                return this.services[service].refreshToken(data)
            case actionEnums.forgotPassword:
                return this.services[service].forgotPassword(data)
            case actionEnums.resetPassword:
                return this.services[service].resetPassword(data)

            case actionEnums.insertItemsByQRCodeURL:
                return this.services[service].insertItemsByQRCodeURL(data)

            default:
                this.replyManager.handleError(
                    this.replyManager.statusEnum.notImplemented
                );
        };
    };
};