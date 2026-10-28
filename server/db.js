import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "saksham@4545",
  database: "digital_heritage",
  port: 3306,
});

export default db;