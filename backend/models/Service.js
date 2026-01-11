import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'code'
  }
}, {
  tableName: 'services',
  timestamps: true
});

export default Service;
