const pool = require("../config/db");

// bigint columns come back from pg as strings, so cast them to int for the API
const COLUMNS = `
    product_id::int AS id,
    product_name AS name,
    product_desc AS description,
    product_qty::int AS quantity`;

const getAll = async () => {
    const result = await pool.query(`SELECT ${COLUMNS} FROM products ORDER BY product_id`);
    return result.rows;
}

const getById = async (id) => {
    const result = await pool.query(`SELECT ${COLUMNS} FROM products WHERE product_id = $1`, [id]);
    return result.rows[0];
}

const create = async (product) => {
    const {name, description, quantity} = product;
    const result = await pool.query(
        `INSERT INTO products (product_name, product_desc, product_qty)
         VALUES ($1, $2, $3)
         RETURNING ${COLUMNS}`,
        [name, description, quantity]);
    return result.rows[0];
}

const update = async (id, product) => {
    const {name, description, quantity} = product;
    const result = await pool.query(
        `UPDATE products SET
            product_name = $1,
            product_desc = $2,
            product_qty = $3
         WHERE product_id = $4
         RETURNING ${COLUMNS}`,
        [name, description, quantity, id]);
    return result.rows[0];
}

const remove = async (id) => {
    const result = await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
    return result.rowCount > 0;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
