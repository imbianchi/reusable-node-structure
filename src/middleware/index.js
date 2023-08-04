module.exports = class Middleware {
    constructor(appMiddleware) {
        this.app = appMiddleware;
    }
}