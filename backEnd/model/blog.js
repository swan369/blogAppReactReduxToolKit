const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, min: 3 },
  detail: { type: String, required: true, min: 3 },
  imageURL: { type: String, required: true, min: 3 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
