const express = require("express");
const { connection } = require("../config/db");
const postRouter = express.Router();
postRouter.use(express.json());

// GET all posts
postRouter.get("/", async (req, res) => {
  try {
    const [posts] = await connection.query("SELECT * FROM posts");
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST a new post
postRouter.post("/", async (req, res) => {
  const { userId, title, body } = req.body;
  try {
    // Create posts table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT,
        title VARCHAR(255),
        body TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

    // Insert post data into the posts table
    await connection.query(
      "INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)",
      [userId, title, body]
    );

    res.status(200).json({ msg: "Post has been added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// single user posts
postRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params; // Get userId from request parameters
    // Use parameterized queries to prevent SQL injection
    const posts = await connection.query(`SELECT * FROM posts WHERE userId=?`, [
      userId,
    ]);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { postRouter };
