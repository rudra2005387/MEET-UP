const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Meeting extends Model {}

Meeting.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    hostId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    participantIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    endTime: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'ongoing', 'completed'),
      defaultValue: 'scheduled',
      validate: {
        isIn: [['scheduled', 'ongoing', 'completed']]
      }
    }
  },
  {
    sequelize,
    modelName: 'Meeting',
    tableName: 'meetings',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['roomId']
      }
    ]
  }
);

// Instance methods
Meeting.prototype.isActive = function() {
  return this.status === 'ongoing';
};

// Static methods
Meeting.findActiveByHost = function(hostId) {
  return this.findAll({
    where: {
      hostId,
      status: 'ongoing'
    }
  });
};

module.exports = Meeting;