const config = require('config');

const configMigrations = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: `mongodb://${config.get('db.host')}:${config.get('db.port')}`,

    // TODO Change this to your database name:
    databaseName: config.get('db.name'),

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "app/database/migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js",

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: true,

  // Don't change this, unless you know what you're doing
  moduleSystem: 'commonjs',
};

module.exports = configMigrations;
