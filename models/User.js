const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  roles: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  queues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Queue",
    },
  ],
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favourite",
    },
  ],
  // series: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Series",
  //   },
  // ],
});

module.exports = mongoose.model("User", userSchema);
