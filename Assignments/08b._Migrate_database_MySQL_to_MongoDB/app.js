const { MongoClient } = require('mongodb');
const { Model } = require('objection');
const config = require("./knexfile.js")[process.env.NODE_ENV || "development"];
const knex = require("knex")(config);

// MongoDB connection configuration
const mongoConfig = {
  url: 'mongodb://localhost:27017',
  dbName: 'migration_from_mysql_to_mongodb',
  collectionName: 'migrated_data',
};

// Function to establish MongoDB connection
async function connectToMongoDB() {
  const client = new MongoClient(mongoConfig.url, { useUnifiedTopology: true });
  await client.connect();
  return client.db(mongoConfig.dbName).collection(mongoConfig.collectionName);
}

// Function to migrate data from MySQL to MongoDB
async function migrateData() {
  const mysqlConnection = knex(config);
  const mongoCollection = await connectToMongoDB();

  try {
    // Retrieve data from MySQL using Knex
    const data = await mysqlConnection.from('students').select('*');

    // Insert data into MongoDB
    await mongoCollection.insertMany(data);

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close connections
    await mysqlConnection.destroy();
    process.exit();
  }
}

// Execute migration
migrateData();
