const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connectionContract = mysql.createPool(config.Contracts);
const connectionAssistance = mysql.createPool(config.Assistance);

const test = (req, res) => {
    const query = `
      SELECT *
      FROM state
    `;
  
    connectionAssistance.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

  const test1 = (req, res) => {
    const query = `
      SELECT *
      FROM Source
    `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

module.exports = {
    test: test,
    test2: test2
};