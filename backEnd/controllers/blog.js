const Blog = require("../model/blog");

const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

const createBlog = (req, res) => {
  console.log(req.body);
  const createdBlog = Blog.create(req.body);
  res.status(200).json(createdBlog);
};

exports.getAllBlogs = getAllBlogs;
exports.createBlog = createBlog;
