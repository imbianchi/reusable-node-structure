
const config = require('config');


module.exports = {
    async up(db, client) {
        await db.collection('users').insertOne({ 
            name: config.get('api.masterName'),
            username: config.get('api.masterUsername'),
            email: config.get('api.masterEmail'),
        });
    },
  
    async down(db, client) {
        await db.collection('users').deleteOne({
            username: config.get('api.masterUsername'),
        });
    },
};