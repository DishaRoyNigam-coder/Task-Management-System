require('dotenv').config();

module.exports = {
  mongodb: {
    url: process.env.MONGO_URI,
    databaseName: 'taskmanager',
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
};