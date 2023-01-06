const mysql = require('mysql2');

const connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database: 'sakila'
});

const pool = async (sql, params) => {
    const [rows, fields] = await connection.promise().query(sql, params);
    return rows;
}
module.exports = pool;

