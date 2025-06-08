const { Sequelize, DataTypes } = require('sequelize');
const User = require('../models/user');
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Method to find user by email
User.findByEmail = async function(email) {
    return await this.findOne({ where: { email } });
};

// Method to create a new user
User.createUser = async function(userData) {
    return await this.create(userData);
};

module.exports = User;