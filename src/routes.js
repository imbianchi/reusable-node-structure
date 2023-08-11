const httpMethods = require('../app/enum/httpMethods');

module.exports = class Routes {
    constructor(version) {
        this.version = version;
        this.path = '/';
        this.main = {
            method: httpMethods.GET,
            path: this.path,
            handler: (req, h) => {
                return {
                    status: 200,
                    message: 'Server is running!',
                    version: this.version,
                }
            },
        }

        return [
            this.main,
        ]
    }
};