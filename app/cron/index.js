const httpMethods = require("../enum/httpMethods");
const HapiCron = require('hapi-cron');

module.exports = class CronJobs {
    constructor() {
        return {
            plugin: HapiCron,
            options: {
                jobs: [
                    {
                        name: 'Cron Example',
                        time: '*/60 * * * * *',
                        timezone: 'Europe/London',
                        request: {
                            method: httpMethods.GET,
                            url: '/',
                        },
                        onComplete: (res) => console.log('Cron Test: ', res),
                    }
                ],
            }
        }
    }
}