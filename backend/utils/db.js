const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Set to true if you want SQL query logs
  }
);

// Optional: Function to test the DB connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully via Sequelize');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
};
