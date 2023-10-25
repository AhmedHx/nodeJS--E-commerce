const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Hello rechidi!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
