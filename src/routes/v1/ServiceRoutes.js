const httpMethods = require("../../../app/enum/httpMethods");
const MainController = require('../../controllers');
const mainController = new MainController();


module.exports = class ServiceRoutes {
    constructor() {
        return [
            {
                path: '/apps',
                auth: true,
                notes: [],
                methods: [
                    httpMethods.GET,
                    httpMethods.POST,
                    httpMethods.PUT,
                    httpMethods.DELETE,
                ],
                handler: function (req, res) {
                    return mainController.controllers.serviceControllers(req, res)
                        .then(result => result)
                        .catch(error => error);
                }
            },
            {
                path: '/apps/:id',
                auth: true,
                notes: [],
                methods: [httpMethods.GET],
                handler: function (req, res) {
                    res.send({
                        status: 200,
                        message: req.params
                    })
                }
            },
        ]
    }
}