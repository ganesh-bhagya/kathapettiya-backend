const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Role", userSchema);
