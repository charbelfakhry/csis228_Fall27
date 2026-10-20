const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

// attribute names are what the API uses; "field" is the real column in the users table
const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id"
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "user_first_name"
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "user_last_name"
    },
    // DATEONLY keeps dob as a plain YYYY-MM-DD string (no timezone shift)
    dob: {
        type: DataTypes.DATEONLY,
        field: "user_dob"
    }
}, {
    tableName: "users",
    timestamps: false
});

module.exports = User;
