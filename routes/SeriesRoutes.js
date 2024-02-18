const express = require("express");

const {
  getAllSeries,
  createSeries,
  editSeries,
  getSeriesByUser,
} = require("../controllers/SeriesController");

const router = express.Router();

// Route for getting all categories and creating a new category
router.route("/").get(getAllSeries).post(createSeries); // Use Multer middleware for 'image' field
router.route("/series-by-user/:userId").get(getSeriesByUser);
router.put("/:id", editSeries);
module.exports = router;
