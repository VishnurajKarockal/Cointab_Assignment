const express = require("express");
const { connection } = require("../config/db");
const userRouter = express();
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
  try {
    const [users] = await connection.query("SELECT * FROM users");
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Assuming you have established a database connection and created a connection object named "connection"

userRouter.post("/", async (req, res) => {
  const { id, name, email, phone, website, city, company } = req.body;
  try {
    // Create users table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(255),
        website VARCHAR(255),
        city VARCHAR(255),
        company VARCHAR(255)
      )
    `);

    // Insert user data into the users table
    await connection.query(
      "INSERT INTO users (id, name, email, phone, website, city, company) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, name, email, phone, website, city, company]
    );

    res.status(200).json({ msg: "User has been added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { userRouter };
