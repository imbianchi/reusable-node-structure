const middlewareBeforeExample = require('./middlewareExample')
const middlewareAfterExample = require('./middlewareExample')

module.exports = class Middleware {
    constructor(req) {
        this.before = [
            middlewareBeforeExample,
        ],
        this.after = [
            middlewareAfterExample,
        ]
    }

    async beforeRequest() {
        this.before.forEach(func => func());
    }

    async afterRequest() {
        this.after.forEach(func => func());
    }
}