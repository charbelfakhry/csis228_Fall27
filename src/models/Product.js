const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

// pg returns BIGINT as a string (it can exceed JS number precision); our values are small, so expose numbers
const asNumber = (attribute) => function(){
    const value = this.getDataValue(attribute);
    return value == null ? value : Number(value);
};

// attribute names are what the API uses; "field" is the real column in the products table
const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: "product_id",
        get: asNumber("id")
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "product_name"
    },
    description: {
        type: DataTypes.TEXT,
        field: "product_desc"
    },
    quantity: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "product_qty",
        get: asNumber("quantity")
    }
}, {
    tableName: "products",
    timestamps: false
});

module.exports = Product;
