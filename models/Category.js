const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  stories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
