import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Job from './Job.js';

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
    defaultValue: 'Pending'
  }
}, {
  tableName: 'applications',
  timestamps: true
});

// Define associations
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });

export default Application;
