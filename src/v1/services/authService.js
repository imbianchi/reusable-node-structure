const AuthRepository = require("../repositories/authRepository");
const UsersRepository = require("../repositories/usersRepository");
const userAgent = require("@utils/userAgent");
const now = new Date();


module.exports = class AuthService {
    constructor() {
        this.userAgent = userAgent;

        this.authRepository = new AuthRepository();
        this.userRepository = new UsersRepository();
    }

    async login(options) {
        return await this.authRepository.insertOne(options)
            .then(result => result)
            .catch(error => {
                throw error;
            })
    };

    async authenticate(request) {
        try {
            let sessionIdObj = this.securityManager.sessionDataDecrypt(request.auth.credentials.encryptedData);
            sessionIdObj = JSON.parse(sessionIdObj);

            return await this.authRepository.info({ sessionId: sessionIdObj.sessionId })
                .then(async session => {

                    if (session.length === 0) {
                        throw error;
                    };

                    let os = this.userAgent.getOperationSystem(request.headers['user-agent']);
                    let browser = this.userAgent.getBrowser(request.headers['user-agent']);

                    if (!this._checkSessionDevice(os, browser, session[0])) {
                        throw error;
                    };

                    return await this.userRepository.find(session[0]);
                })
        } catch (error) {
            console.log(
                '[ERROR] - [File: authService.js - METHOD async authenticate - ',
                `[${now}] - Error: `, error
            );
            throw error;
        }
    };

    async deleteOne(options) {
        return await this.authRepository.deleteOne(options)
            .then(result => result)
            .catch(error => {
                throw error;
            })
    };

    _checkSessionDevice(os, browser, session) {
        if (os.name !== session.osName ||
            os.version !== session.osVersion ||
            os.device !== session.device) {
            return false;
        }

        if (browser.name !== session.browser || browser.version !== session.browserVersion) {
            return false;
        }

        return true;
    };
}