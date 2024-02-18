const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true,
  },
  stories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Series", seriesSchema);
