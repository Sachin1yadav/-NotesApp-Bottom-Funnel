const express = require("express");
// const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.routes");
const { notesRouter } = require("./routes/Notes.routes");

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/users", userRouter);
app.use("/notes", notesRouter);

app.listen(process.env.port, async () => {
  try {
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`listening at port : ${process.env.port}`);
});
