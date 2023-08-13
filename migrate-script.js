const config = require('config');
const fs = require('fs');
const mongodb = require('mongodb');
const { create } = require('migrate-mongo');
const { exit } = require('process');

const directoryPath = 'app/database/migrations';
const codeToInsert = `
const config = require('config');\n\n
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
};`;

const checkAndCreateDB = async () => {
    console.log('Checking if main database already exists...');
    const client = new mongodb.MongoClient(`mongodb://${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`);

    const newDB = client.db(config.get('db.name'));
    const collections = await client.db().listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('users')) {
        newDB.createCollection("users");

        console.log('Database & Users table created!');
        return;
    }

    console.log('Database & Users collection already exists, skipping...');
    return;
}

(async () => {
    try {
        await checkAndCreateDB();

        console.log('Checking if users migration file already exists...');

        const files = fs.readdirSync(directoryPath);        
        let fileExists = false;

        files.forEach(file => {
            if(file.includes('create-master-user')) {
                fileExists = true;
            }
        });

        if (!fileExists) {
            console.log('Creating users migrations file...');
            const file = await create('create-master-user');

            return setTimeout(() => {
                return fs.writeFile(directoryPath + '/' + file, codeToInsert, 'utf8', err => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }

                    console.log('Created user master code migration.');

                    return exit(0);
                });
            }, 3000);
        }

        console.log('Yep, it does exists. Skipping...');

        exit(0);
    } catch (error) {
        console.log('Error: ', error);
    }

})();