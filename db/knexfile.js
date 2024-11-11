// Import dotenv and load environment variables
import dotenv from "dotenv";
//dotenv.config({ path: '../.env' });
dotenv.config()
console.log(process.env.DEV_USER);
console.log(process.env.DEV_PASSWORD); // Be careful logging passwords


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const development = {
  client: "pg",
  connection: {
    database: process.env.DEV_DB,
    user: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD || "12345",
    host: process.env.DEV_HOST || "localhost",
    port: process.env.DEV_PORT || 5432,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const production = {
  client: "pg",
  connection: {
    database: process.env.PROD_DB || "my_db",
    user: process.env.PROD_USER || "username",
    password: process.env.PROD_PASSWORD || "password",
    host: process.env.PROD_HOST || "localhost",
    port: process.env.PROD_PORT || 5432,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export { development, production };

