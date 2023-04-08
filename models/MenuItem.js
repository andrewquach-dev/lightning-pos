const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
