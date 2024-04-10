const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const { userRouter } = require("./Routes/user.routes");
const app = express();
const cors = require("cors");
const { postRouter } = require("./Routes/post.routes");
app.use(cors());
app.get("/", (req, res) => {
  res.send("Yeah your cointab backend is working fine!");
});
app.use("/users", userRouter);
app.use("/posts", postRouter);
const port = process.env.port;
app.listen(port, async () => {
  try {
    connection;
    console.log(`Server is running at port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
