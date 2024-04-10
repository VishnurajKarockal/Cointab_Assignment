const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/user.routes");
const app = express();
const cors = require("cors");
const { postRouter } = require("./Routes/post.routes");
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(8080, async () => {
  try {
    connection;
    console.log("Server is running at port 8080");
  } catch (error) {
    console.log(error.message);
  }
});
