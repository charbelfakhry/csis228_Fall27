const pool = require("../config/db");

// alias columns so the API speaks camelCase and dob stays a plain YYYY-MM-DD string
const COLUMNS = `
    user_id AS id,
    user_first_name AS "firstName",
    user_last_name AS "lastName",
    user_dob::text AS dob`;

const getAll = async () => {
    const result = await pool.query(`SELECT ${COLUMNS} FROM users ORDER BY user_id`);
    return result.rows;
}

const getById = async (id) => {
    const result = await pool.query(`SELECT ${COLUMNS} FROM users WHERE user_id = $1`, [id]);
    return result.rows[0];
}

const create = async (user) => {
    const {firstName, lastName, dob} = user;
    const result = await pool.query(
        `INSERT INTO users (user_first_name, user_last_name, user_dob)
         VALUES ($1, $2, $3)
         RETURNING ${COLUMNS}`,
        [firstName, lastName, dob]);
    return result.rows[0];
}

const update = async (id, user) => {
    const {firstName, lastName, dob} = user;
    const result = await pool.query(
        `UPDATE users SET
            user_first_name = $1,
            user_last_name = $2,
            user_dob = $3
         WHERE user_id = $4
         RETURNING ${COLUMNS}`,
        [firstName, lastName, dob, id]);
    return result.rows[0];
}

const remove = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    return result.rowCount > 0;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
