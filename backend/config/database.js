const mysql = require("mysql2");

let pool;

if (process.env.DATABASE_URL) {
  // Use Railway connection string (Render)
  pool = mysql.createPool(process.env.DATABASE_URL);
} else {
  // Use local .env
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }

  console.log("✅ Connected to Railway MySQL");
  connection.release();
});

module.exports = pool.promise();