const mongoose = require("mongoose");
const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  seq: {
    type: Number,
  },
});
const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;
