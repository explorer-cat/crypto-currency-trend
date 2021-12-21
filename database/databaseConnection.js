const mariadb = require('mariadb');
const config = require('../config');


//local mariadb
const db = mariadb.createPool({
    host : config.DataBaseConnect.Host,
    user : config.DataBaseConnect.User,
    password : config.DataBaseConnect.Pass,
    database : config.DataBaseConnect.Database,
    connectionLimit : config.DataBaseConnect.connectionLimit
   });

   db.getConnection((err, connection) => {
    if (err) {
      switch (err.code) {
        case "PROTOCOL_CONNECTION_LOST":
          console.error("Database connection was closed.");
          break;
        case "ER_CON_COUNT_ERROR":
          console.error("Database has too many connections.");
          break;
        case "ECONNREFUSED":
          console.error("Database connection was refused.");
          break;
      }
    }
    if (connection) {
        console.log('db connection!')
        return connection.release();
    } 
  });
  
  module.exports = db;