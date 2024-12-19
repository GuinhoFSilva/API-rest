const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'api',
    password: 'admin',
    database: 'agendapetshop'
});

module.exports = conexao;