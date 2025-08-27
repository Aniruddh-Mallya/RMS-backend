const { Connection, Request, TYPES } = require("tedious");
require("dotenv").config();

const config = {
  server: process.env.DB_SERVER, // e.g., your-server.database.windows.net
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  },
  options: {
    encrypt: true,
    database: process.env.DB_NAME
  }
};

const connection = new Connection(config);

connection.on('connect', function(err) {
  if (err) {
    console.error("Database Connection Failed:", err);
    process.exit(1);
  } else {
    console.log("Connected to Azure SQL Database!");
  }
});

connection.connect();

module.exports = {
  query: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      const request = new Request(sql, (err, rowCount, rows) => {
        if (err) {
          return reject(err);
        }
        const result = rows.map(row => {
          const rowObject = {};
          row.forEach(col => {
            rowObject[col.metadata.colName] = col.value;
          });
          return rowObject;
        });
        resolve({ rows: result });
      });

      params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
      });

      connection.execSql(request);
    });
  },
  TYPES // Export the TYPES object for use in other files
};