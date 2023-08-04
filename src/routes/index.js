const httpMethods = require('../../app/enum/httpMethods');

module.exports = class Routes {
    constructor() {
        this.main = {
            path: '/',
            method: httpMethods.GET,
            auth: false,
            notes: [],
            handler: (req, res) => {
                res.json({ teste: 'testeeeeeeeeee' })
            }
        }
    }

    getRoutes() {
        return [
            this.main,
        ]
    }
}