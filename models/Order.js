const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  peopleCount: {
    type: Number,
    default: 0,
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    default: "000000000000000000000000",
  },
  createdBy: {
    type: String,
    ref: "User",
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  itemsOrdered: {
    type: Array,
    default: [],
  },
  isClosed: {
    type: Boolean,
    default: "false",
  },
  paymentAmount: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
    required: true
  },
  amountOwed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
