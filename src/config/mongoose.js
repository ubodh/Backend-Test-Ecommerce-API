const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.URL;
const mongoConect = async () => {
  mongoose
    .connect(url)
    .then((db) => console.log(`db is connected :${db.connection.host}`))
    .catch((e) => {
      console.log(e);
    });
};

module.exports = mongoConect;
