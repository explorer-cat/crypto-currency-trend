const mariadb = require('mariadb');
const { connection } = require('mongoose');
const config = require('../config');

const conn = mariadb.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'cch1676816@',
  database:'coin-trend'
});

module.exports = conn;