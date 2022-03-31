require("dotenv").config({ path: "../.env" });
const Pool = require("pg").Pool;
//  pool object you created above will allow you to
// query into the database that it’s connected to
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
