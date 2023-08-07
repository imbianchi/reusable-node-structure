const AppsRoutes = require('./AppsRoutes');
const CronRoutes = require('./CronRoutes');

module.exports = [
    new AppsRoutes(),
    new CronRoutes(),
].flat(1);