const Blog = require("../model/blog");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { GridFSBucket } = require("mongodb");

// Initialize GridFSBucket
// let gfsBucket;

// mongoose.connection.once("open", () => {
//   const db = mongoose.connection.db;
//   gfsBucket = new GridFSBucket(db, {
//     bucketName: "uploads", // Ensure this matches your GridFS bucket name
//   });
// });

// Create a new blog entry
const createBlog = async (req, res) => {
  console.log("Uploaded file:", req.file);
  // console.log("fileId:", req.file.id); // file id available after processed by multer at 1st middleware

  let fileId = req.fileId;

  console.log("fileId using FSBucket:", fileId);

  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Extract metadata from req.body
    const { title, detail, imageURL } = req.body;

    // Check if any required fields are missing
    if (!title || !detail || !imageURL) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Use Blog.create to directly create and save the new blog entry
    const createdBlog = await Blog.create({
      // filename: req.file.filename,
      filename: req.file.fieldname,
      fileId: fileId, // take note, where fileId was created n shown on MongoDB
      title,
      detail,
      imageURL,
    });

    console.log("blogCreatednStoredBackend", createdBlog);

    res.status(200).json(createdBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a blog by ID
const getBlogById = async (req, res) => {
  try {
    const foundBlog = await Blog.findById(req.params.id);
    if (!foundBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(foundBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an HTML file by ID
const getHTMLFileById = (req, res) => {
  const gfsBucket = req.app.locals.gfsBucket;

  console.log("Inside getHTMLFileById");
  const fileId = req.params.fileId;
  console.log("Received fileId from params:", fileId);

  if (!gfsBucket) {
    console.log("GridFSBucket is not initialized.");
    return res.status(500).json({ error: "GridFSBucket is not initialized." });
  }

  try {
    // Check if the file exists
    gfsBucket
      .find({ _id: mongoose.Types.ObjectId(fileId) })
      .toArray((err, files) => {
        if (err) {
          console.error("Error finding file:", err);
          return res.status(500).json({ error: "Error finding file" });
        }

        if (!files || files.length === 0) {
          console.log("No file found with given fileId.");
          return res.status(404).json({ error: "No file exists" });
        }

        console.log("File found:", files[0]);

        // Stream the file using GridFSBucket
        const downloadStream = gfsBucket.openDownloadStream(files[0]._id);
        //.on() is a listener attach itself to object allows you handle asynchronous events(stream-related events) that may happen during the downloadStream
        downloadStream.pipe(res).on("error", (streamErr) => {
          // listens for the error event and when occurs, callback receives the streamErr aka error event
          console.error("Error streaming file:", streamErr);
          res.status(500).json({ error: "Error streaming file" });
        });
      });
  } catch (error) {
    console.error("Exception in getHTMLFileById:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog by ID and also delete the stored file
const deleteBlog = async (req, res) => {
  try {
    const gfsBucket = req.app.locals.gfsBucket;
    if (!gfsBucket) {
      return res.status(500).json({ error: "GridFSBucket not initialized." });
    }

    const blogToDelete = await Blog.findById(req.params.id);
    if (!blogToDelete) {
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log("Blog to delete:", blogToDelete);
    console.log("File ID from blog:", blogToDelete.fileId);

    // Ensure fileId is an ObjectId
    const fileId = blogToDelete.fileId;

    try {
      // Delete the file from GridFS
      await gfsBucket.delete(ObjectId(fileId));
    } catch (deleteError) {
      console.error("Error deleting file from GridFS:", deleteError);
      return res.status(404).json({ error: "File not found in GridFS." });
    }

    // Delete the blog entry
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedBlog);
  } catch (error) {
    console.error("Error at deleteBlog:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getHTMLFileById,
};
