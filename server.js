const dotenv = require("dotenv");
const express = require("express");
const app = express();
const morgan = require("morgan");
const dbconnection = require("./config/database");
const categoryRoute = require("./routes/category.route");
dotenv.config({ path: "./config.env" });


if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("Starting development server");
}

dbconnection();
//json
app.use(express.json());
app.use('/api/v1/categories', categoryRoute);

//Global error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err });
});

const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello rechidi!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
