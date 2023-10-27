const dotenv = require("dotenv");
const express = require("express");
const app = express();
const morgan = require("morgan");
const dbconnection = require("./config/database");
const categoryRoute = require("./routes/category.route");
const ApiError = require("./utils/api.error");
const globalErorr = require("./middleware/error.middleware");
dotenv.config({ path: "./config.env" });



if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("Starting development server");
}

dbconnection();
//json
app.use(express.json());
app.use('/api/v1/categories', categoryRoute);
app.all('*', function (req, res, next) {
  // const err = new Error(`this route is not available : ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`this route is not available : ${req.originalUrl}`, 400));

})

//Global error handling middleware
app.use(globalErorr);

const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello rechidi!");
});
const server = app.listen(port, () => console.log(`This app listening on port ${port}!`));

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled rejection error: >>> ${err.name} | ${err.message} <<<`);
  server.close(() => { console.error(`Shuting Down`); process.exit(1); });
})
