const express = require("express");

const {
  getAllQueues,
  createQueue,
} = require("../controllers/QueueController");

const router = express.Router();

router.route("/").get(getAllQueues).post(createQueue); // Use Multer middleware for 'image' field

module.exports = router;
