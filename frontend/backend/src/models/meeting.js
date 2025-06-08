const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Meeting extends Model {}

Meeting.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  hostId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  meetingId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Meeting',
  timestamps: true,
});

module.exports = Meeting;