const express = require("express");

const {
  getAllUsers,
  createUser,
  loginUser
} =  require('../controllers/UserController');
const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/login").post(loginUser);

module.exports = router;