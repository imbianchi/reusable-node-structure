
const config = require('config');
const SecurityManager = require('../../managers/securityManager');


module.exports = {
    async up(db, client) {
        await db.collection('users').insertOne({ 
            name: config.get('api.masterName'),
            username: config.get('api.masterUsername'),
            email: config.get('api.masterEmail'),
            password:  new SecurityManager().encryptPassword(config.get('api.masterPassword')),
        });
    },
  
    async down(db, client) {
        await db.collection('users').deleteOne({
            username: config.get('api.masterUsername'),
        });
    },
};