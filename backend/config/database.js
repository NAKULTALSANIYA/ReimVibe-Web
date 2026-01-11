import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables before creating Sequelize instance
dotenv.config();

// Create Sequelize instance at module level
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Database Connected: ' + (process.env.DB_HOST));

    // Sync all models with schema updates - with error handling for constraint issues
    try {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized with schema updates');
    } catch (alterError) {
      console.warn('Schema alteration failed, attempting basic sync:', alterError.message);
      
      // If alter fails, try basic sync without schema changes
      try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized with basic sync');
      } catch (basicSyncError) {
        console.warn('Basic sync also failed, tables may already be in sync:', basicSyncError.message);
      }
    }

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Export sequelize as default for model imports
export default sequelize;
export { connectDB };
