const httpMethods = require("../enums/httpMethodsEnum");
const HapiCron = require('hapi-cron');


module.exports = class CronJobs {
    constructor() {
        return {
            plugin: HapiCron,
            options: {
                jobs: [
                    // INSERT CRONJOBS HERE
                    {
                        name: 'Cron Example',
                        time: '*/20000 * * * * *',
                        timezone: 'Europe/London',
                        request: {
                            method: httpMethods.GET,
                            url: '/cron/example',
                        },
                        onComplete: (res) => console.log('Cron Test: ', res),
                    },
                ],
            }
        }
    }
}