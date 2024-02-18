const express = require("express");
const multer = require("multer");

const {
  getAllCategories,
  createCategory,
  editCategory,
  getCategoryByTitle
} = require("../controllers/CategoryController");

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
router
  .route("/")
  .get(getAllCategories)
  .post(upload.single("image"), createCategory); // Use Multer middleware for 'image' field
router
  .route("/:description")
  .get(getCategoryByTitle); 

router.put("/:id", upload.single("image"), editCategory);
module.exports = router;
