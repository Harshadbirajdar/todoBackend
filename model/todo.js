const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [40, "Title should be under 40 characters"],
    },
    tasks: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
