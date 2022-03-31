require("dotenv").config({ path: "../.env" });
const Pool = require("pg").Pool;
//  pool object you created above will allow you to
// query into the database that it’s connected to

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addon
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
