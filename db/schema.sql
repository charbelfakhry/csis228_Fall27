-- run once to create the tables: psql -d <DB_NAME> -f db/schema.sql

CREATE TABLE IF NOT EXISTS users (
    user_id         SERIAL PRIMARY KEY,
    user_first_name TEXT NOT NULL,
    user_last_name  TEXT NOT NULL,
    user_dob        DATE
);

CREATE TABLE IF NOT EXISTS products (
    product_id   BIGSERIAL PRIMARY KEY,
    product_name TEXT NOT NULL,
    product_desc TEXT,
    product_qty  BIGINT NOT NULL
);
