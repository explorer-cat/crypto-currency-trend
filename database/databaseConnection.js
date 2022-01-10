const mariadb = require('mariadb');
const { connection } = require('mongoose');
const config = require('../config');


const db = async () => {
  try {
    // db connection
      let connection = await mariadb.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "coin-trend",
      });
      let rows = await connection.query("SELECT * FROM listing_coin")
      console.log(rows);
 
  } catch (error) {
      console.log(error);
  }
};

db();



