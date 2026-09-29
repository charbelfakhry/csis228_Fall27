const pool = require("../config/db");


const getAll = async() => {
    const sql = "SELECT * FROM products"
    const result = await pool.query(sql);
    return result.rows;
}

const getById = async(id) =>{
    const sql = "SELECT * FROM products WHERE product_id = $1";
    const result = await pool.query(sql, [id]);
    return result.rows[0];
}

const create = async(product) =>{
    const {name, description, quantity} = product;
    const sql = "INSERT INTO products (product_name, product_desc, product_qty) VALUES ($1, $2, $3)";
    const result = await pool.query(sql, [name, description, quantity]);
    return result.rowCount > 0;
}

const update = async(id, product) =>{
    const {name, description, quantity} = product;
    const sql = `UPDATE products SET 
    product_name = $1, 
    product_desc = $2,
    product_qty = $3

    WHERE product_id = $4
    `;

    const result = await pool.query(sql, [name, description, quantity, id]);

    return result.rows[0];
}

const remove = async (id) =>{
     const sql = `DELETE FROM products WHERE product_id = $1`;
     const result = await pool.query(sql, [id]);
     const isDeleted = result.rowCount > 0 ? true : false;
     return isDeleted;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}