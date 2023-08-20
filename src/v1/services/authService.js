const AuthRepository = require("../repositories/authRepository");
const UsersRepository = require("../repositories/usersRepository");
const userAgent = require('@utils/userAgent');
const Securitymanager = require('@managers/securityManager');
const now = new Date();


module.exports = class AuthService {
    constructor() {
        this.userAgent = userAgent;
        this.securityManager = new Securitymanager();
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

    async updateOne(options) {
        return await this.authRepository.updateOne(options)
            .then(result => result)
            .catch(error => {
                throw error;
            })
    };

    async authenticate(request) {
        try {
            let session = this.securityManager
                .sessionDataDecrypt(this.securityManager.decryptToken(request.auth.token));
            session = JSON.parse(session);

            return await this.authRepository.getOne({ id: session.id })
                .then(async session => {

                    if (session.length < 1) {
                        // return this.replyManager.handleError(
                        //     this.replyManager.statusEnum.unauthorized,
                        //     { message: 'Session not founded. Please login again.' },
                        // );
                        return
                    };

                    let os = this.userAgent.getOperationSystem(request.headers['user-agent']);
                    let browser = this.userAgent.getBrowser(request.headers['user-agent']);

                    if (!this._checkSessionDevice(os, browser, session[0])) {
                        // return this.replyManager.handleError(
                        //     this.replyManager.statusEnum.unauthorized,
                        //     { message: 'Credentials not valid.' },
                        // );
                        return
                    };

                    session[0].lastActivityTime = new Date();
                    session[0].refreshToken = await this.securityManager.generateToken(session[0].id);

                    return await this.authRepository.updateOne(session[0])
                        .then(result => result)
                        .catch(error => {
                            throw error;
                        })
                })
        } catch (error) {
            console.log(
                '[ERROR] - [File: authService.js - METHOD async authenticate - ',
                `[${now}] - Error: `, error
            );
            throw error;
        }
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