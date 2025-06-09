const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // ✅ your Sequelize instance

class Meeting extends Model {}

Meeting.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hostId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  participantIds: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: [],
  },
}, {
  sequelize,             // ✅ Fix: pass config object with sequelize key
  modelName: 'Meeting',
  tableName: 'meetings', // ✅ optional but helps avoid automatic pluralization issues
});

module.exports = Meeting;
