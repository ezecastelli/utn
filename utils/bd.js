const mysql = require('mysql');
const util = require('util');

let pool = mysql.createPool({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSword,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
});
pool.query = util.promisify(pool.query);
module.exports = pool;