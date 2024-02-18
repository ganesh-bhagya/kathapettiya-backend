const express = require("express");
const multer = require("multer");

const {
  getAllStories,
  createStory,
  editStory,
  getAllStoriesByTitle,
  getAllNewStories,
} = require("../controllers/StoryController");

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

// Route for getting all categories and creating a new category
router.route("/").get(getAllStories).post(upload.single("image"), createStory); // Use Multer middleware for 'image' field
router.route("/new-stories").get(getAllNewStories); // Use Multer middleware for 'image' field
router.route("/story-by-title/:title").get(getAllStoriesByTitle);
router.put("/:id", upload.single("image"), editStory);
module.exports = router;
