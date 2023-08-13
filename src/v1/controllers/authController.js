const Facade = require("../../../app/managers/facadeManager");
const SecurityManager = require("../../../app/managers/securityManager");
const AuthRepository = require("../repositories/authRepository");
const userAgent = require("../utils/userAgent");



module.exports = class AuthController {
    constructor() {
        this.userAgent = userAgent;
        this.authRepository = new AuthRepository();
        this.securityManager = new SecurityManager();
        this.facadeManager = new Facade();
    }

    async login(req) {
        const { password, email } = req.payload;

        const userExists = await this.facadeManager.action({
            service: this.facadeManager.servicesEnum.user,
            action: this.facadeManager.actionEnums.getOne,
            data: {
                email,
            }
        });

        let decryptedPassword = this.securityManager.decryptPassword(password);
        
        if (decryptedPassword !== userExists.password) {
            // @TODO: IMPLEMENT HANDLE ERROR HERE
        };

        let os;
        let browser;
        try {
            os = this.userAgent.getOperationSystem(req.headers['user-agent']);
            browser = this.userAgent.getBrowser(req.headers['user-agent']);
        } catch (error) {
            // @TODO: IMPLEMENT HANDLE ERROR HERE
            throw error;
        }

        let session = {
            userId: userExists._id.toString(),
            osName: os.name,
            osVersion: os.version,
            device: os.device,
            browser: browser.name,
            browserVersion: browser.version,
            browserEngine: browser.engine,
            browserEngineVersion: browser.engine_version,
            refreshToken: this.securityManager.sessionDataEncrypt(userExists._id.toString()),
        };

        // const data = {
        //     id: userExists._id.toString(),
        //     name: userExists.name,
        //     username: userExists.username,
        //     email: userExists.email,
        // };

        // let sessionResult = await this.authRepository.insertOne(session)
        //     .then(resultInsert => resultInsert)
        //     .catch((error) => {
        //         throw error;
        //     });

        // data.token = this.securityManager.generateToken(sessionResult);
        // data.refreshToken = session.refreshToken;

        // return await this.facadeManager.action(
        //     this.facadeManager.servicesEnum.auth,
        //     this.facadeManager.actionEnums.login,
        // ).then(result => result)
        //     .catch(error => {
        //         throw error;
        //     });
    };

    async logout(req) {
        const data = {
            headers: req.headers,
            auth: req.auth,
        };

        return await this.facadeManager.action(
            this.facadeManager.servicesEnum.auth,
            this.facadeManager.actionEnums.deleteOne,
        ).then(result => result)
            .catch(error => {
                throw error;
            });
    }
}