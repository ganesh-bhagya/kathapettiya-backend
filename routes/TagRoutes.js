const express = require("express");

const {
  getAllTags,
  createTag,
  editTag,
  getAllTagsStories,
} = require("../controllers/TagController");

const router = express.Router();

// Route for getting all categories and creating a new category
router.route("/").get(getAllTags).post(createTag); // Use Multer middleware for 'image' field
router.route("/stories-by-tag/:tagName").get(getAllTagsStories);
router.put("/:id", editTag);
module.exports = router;
