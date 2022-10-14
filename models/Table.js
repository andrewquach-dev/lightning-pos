const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  peopleCount: {
    type: Number,
    default: 0,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    default: "000000000000000000000000",
  },
});

module.exports = mongoose.model("Table", TableSchema);
