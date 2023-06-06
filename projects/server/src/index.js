const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());
 
// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database ✅");
});

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Validasi input email dan password
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter your email and password" });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [email, password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    // Jika email dan password sesuai, kirim respons sukses
    return res.status(200).json({ message: "Login success" });
  });
});

// Handle not found routes
app.use("/api/*", (req, res) => {
  res.status(404).send("Not found!");
});

// Handle errors
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Error!");
});

// Start the server
app.listen(PORT, (err) => {  
  if (err) {
    console.error(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
