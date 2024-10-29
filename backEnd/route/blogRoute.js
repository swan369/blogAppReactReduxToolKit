const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blog");

router.get("/", blogController.getAllBlogs);
router.post("/create", blogController.createBlog);

module.exports = router;
