const Vision = require('@hapi/vision');
const CronJobs = require('../cron');
const HapiAuthJwt = require('hapi-auth-jwt2').plugin;


module.exports = [
    Vision,
    new CronJobs(),
    HapiAuthJwt,    
]