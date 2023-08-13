const config = require('config');
const fs = require('fs');
const mongodb = require('mongodb');
const {
    create,
    up,
} = require('migrate-mongo');

let createdFile = "";
let matchingFiles = [];
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

const insertCodeMigration = async (file) => {
    fs.readFile(directoryPath + '/' + file, 'utf8', (err) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        fs.writeFile(directoryPath + '/' + file, codeToInsert, 'utf8', err => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }

            return;
        });
    });

    return;
}

const readAndCreateMigrationFile = async () => {
    fs.readdir(directoryPath, async (err, files) => {
        if (err) {
            console.error('Error reading migrations directory:', err);
            return;
        }

        matchingFiles = files.filter(file => file.includes('create-master-user'));

        console.log('Creating users migrations file...');

        if (matchingFiles.length < 1) {
            return await create('create-master-user');
        }

        console.log('Migration file already created, carry on...')
        return matchingFiles[0];
    });
};

const readAndInsertCodeIntoFile = async () => {
    fs.readdir(directoryPath, async (err, files) => {
        if (err) {
            console.error('Error reading migrations directory:', err);
            return;
        }

        matchingFiles = files.filter(file => file.includes('create-master-user') && file);

        await insertCodeMigration(matchingFiles[0]);
    });
}

const checkAndCreateDB = async () => {
    const client = new mongodb.MongoClient(`mongodb://${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`);

    const newDB = client.db(config.get('db.name'));
    const collections = await client.db().listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('users')) {
        newDB.createCollection("users");

        return console.log('Database & Users table created!');
    }

    return console.log('Database & Users collection already exists, skipping...');
}

(async () => {
    console.log('Checking if main database already exists...');

    await checkAndCreateDB();

    console.log('Checking if users migration file already exists...');

    await readAndCreateMigrationFile();
    setTimeout(() => readAndInsertCodeIntoFile(), 2500);
})();