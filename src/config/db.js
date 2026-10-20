const {Pool} = require("pg");

// env vars are loaded by dotenv in src/index.js before this file is required
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// fires for errors on idle clients; without a listener they would crash the process
pool.on("error", (error) => {
    console.error("PostgreSQL error:", error);
});

module.exports = pool;
