const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
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
});

module.exports = mongoose.model("Tag", tagSchema);
