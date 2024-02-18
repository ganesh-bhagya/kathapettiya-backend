const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  stories: {
    type: Schema.Types.ObjectId,
    ref: "Story",
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);
