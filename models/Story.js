const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  line: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  moderator_note: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  view_count: {
    type: Number,
  },
  section: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  series: {
    type: Schema.Types.ObjectId,
    ref: "Series",
  },
  status: {
    type: String,
    enum: ["pending", "active", "draft"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  image: String,
});

module.exports = mongoose.model("Story", storySchema);
