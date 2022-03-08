require("dotenv").config({ path: "../.env" });
const Pool = require("pg").Pool;
//  pool object you created above will allow you to
// query into the database that it’s connected to
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
