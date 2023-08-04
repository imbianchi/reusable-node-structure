const httpMethods = require("../../../app/enum/httpMethods")

module.exports = class RegisterAppRoute {
    constructor() {
        this.get = {
            path: 'apps',
            method: httpMethods.GET,
            auth: true,
            notes: [],
            handler: function(req, res) {
                return 'get request'
            }
        }
    }
}