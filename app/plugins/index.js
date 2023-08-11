const Vision = require('@hapi/vision');
const CronJobs = require('../cron');

module.exports = [
    Vision,
    new CronJobs(),
]