const Facade = require("@managers/facadeManager");
const SecurityManager = require("@managers/securityManager");
const AuthRepository = require("../repositories/authRepository");
const userAgent = require("@utils/userAgent");
const RequestIp = require('@supercharge/request-ip')



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
            userId: userExists.id,
            osName: os.name,
            osVersion: os.version,
            device: os.device,
            browser: browser.name,
            browserVersion: browser.version,
            browserEngine: browser.engine,
            browserEngineVersion: browser.engine_version,
            ipAddress: RequestIp.getClientIp(req),
            sessionStatus: 'active',
            lastActivityTime: new Date(),
            sessionType: userExists.type,
            refreshToken: "",
        };

        const data = {
            id: userExists.id,
            fullName: userExists.fullName,
            username: userExists.username,
            email: userExists.email,
        };

        return await this.facadeManager.action({
            service: this.facadeManager.servicesEnum.auth,
            action: this.facadeManager.actionEnums.login,
            data: session,
        }).then(async result => {
            session.id = result.id;
            session.refreshToken = this.securityManager
                .generateToken(this.securityManager.sessionDataEncrypt(session.id));

            const updatedSession = await this.facadeManager.action({
                service: this.facadeManager.servicesEnum.auth,
                action: this.facadeManager.actionEnums.updateOne,
                data: session,
            })

            if (!updatedSession) {
                // @TODO - Implement reply manager here
                return
            }

            data.token = this.securityManager
                .generateToken(this.securityManager.sessionDataEncrypt(session));

            // @TODO - Implement reply manager here
            return {
                data,
                message: "User logged in with success!",
            }

        }).catch(error => {
            throw error;
        });

    };

    async logout(req) {
        const data = {
            sessionStatus: 'inactive',
            refreshToken: '',
            sessionEndTime: new Date(),
        };

        return await this.facadeManager.action({
            service: this.facadeManager.servicesEnum.auth,
            action: this.facadeManager.actionEnums.logout,
            auth: {
                headers: req.headers,
                auth: req.auth,
            },
            data,
        }).then(result => {
            if (!result) {
                // @TODO IMPLEMENT RESPONSE ERROR HERE
                return
            }

            return { message: "User logged out with success!" }
        })
            .catch(error => {
                throw error;
            });
    }
}