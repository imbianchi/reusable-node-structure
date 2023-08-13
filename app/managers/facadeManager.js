const actionEnums = require('../enums/actionsEnum');
const servicesEnum = require('../enums/servicesEnum');
const UsersService = require('../../src/v1/services/usersService');
const AuthService = require('../../src/v1/services/authService');
const now = new Date();


module.exports = class Facade {
    constructor() {
        this.actionEnums = actionEnums;
        this.servicesEnum = servicesEnum;

        this.services = [];
        this.services[servicesEnum.user] = new UsersService();
        this.services[servicesEnum.auth] = new AuthService();
    };

    async _auth(request) {
        return await this.services[servicesEnum.auth].authenticate(request)
            .then(result => result)
            .catch(error => {
                console.log(
                    '[ERROR] - [File: facadeManager.js - METHOD _AUTH - ',
                    `[${now}] - ${error}`,
                );
            });
    };

    async action({ service, action, data, auth = false }) {
        if (auth) {
            data.loggedUser = await this._auth(data)
                .then(result => result)
                .catch(error => {
                    console.log(
                        '[ERROR] - [File: facadeManager.js - METHOD async action - ',
                        `[${now}] - ${error}`, ``
                    );
                });
        };

        switch (action) {
            case actionEnums.getAll:
                return this.services[service].getAll(data);
            case actionEnums.getOne:
                return this.services[service].getOne(data);
            case actionEnums.insertOne:
                return this.services[service].insertOne(data);
            case actionEnums.deleteOne:
                return this.services[service].deleteOne(data);
            case actionEnums.updateOne:
                return this.services[service].updateOne(data);

            case actionEnums.login:
                return this.services[service].login(data)

            default:
                console.log(
                    '[ERROR] - [File: facadeManager.js - METHOD action switch block - ',
                    `[${now}] - ${error}`, ``
                );
        };
    };
};