const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, min: 3 },
  detail: { type: String, required: true, min: 3 },
  imageURL: { type: String, required: true, min: 3 },
  filename: { type: String, required: true },
  // content: { type: String, required: true },
  fileId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Transform _id to id when converting to JSON
blogSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id; // Create a new `id` field
    delete ret._id; // Remove the `_id` field
    return ret;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
