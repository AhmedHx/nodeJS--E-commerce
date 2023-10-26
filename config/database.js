const mongoose = require("mongoose");

const dbconnection = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then((value) => {
            console.log(`DATABASE CONNECTED : ${value.connection.host}`);
        })
        .catch((err) => {
            console.error(`DATABASE ERROR  : ${err}`);
            process.exit(1);
        });
};

module.exports = dbconnection;
