const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const mongoURI = process.env.MONGODB_LINK_ATLAS;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", require("./routes/user/index"));
app.use("/posts", require("./routes/post/index"));
app.use("/auth", require("./routes/auth/index"));

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
