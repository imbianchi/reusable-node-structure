

module.exports = class Middleware {
    constructor() {
        this.midExample = {
            handler: () =>
                console.log('Logging a system middleware example.'),
        }
    }

    async getMiddlewares() {
        return [
            this.midExample,
        ]
    }

    async register() {
        const middlewares = await this.getMiddlewares();
        middlewares.forEach(mid => mid.handler())
    }
}