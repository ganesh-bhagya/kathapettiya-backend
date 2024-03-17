const express = require("express");
const multer = require("multer");
const {
  createQueue,
  getQueueByUser,
} = require("../controllers/QueueController");

const router = express.Router();
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Use Date.now() to ensure unique file names
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Filter function to accept only certain file types, adjust as needed
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
router.route("/").post(createQueue); // Use Multer middleware for 'image' field
router.route("/queue-by-user/:userId").get(getQueueByUser); // Use Multer middleware for 'image' field

module.exports = router;
