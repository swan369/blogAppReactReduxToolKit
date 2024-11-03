// const Blog = require("../model/blog");
// // const path = require("path"); // require for local storage
// // const fs = require("fs").promises; // for local storage
// const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");
// const mongodb = require("mongodb"); // Import the native MongoDB driver

// // Initialize GridFS with both db and mongo
// let gfs;
// mongoose.connection.once("open", () => {
//   gfs = Grid(mongoose.connection.db, mongodb);
//   gfs.collection("uploads"); // Ensure you set the collection name here
// });

// const createBlog = async (req, res) => {
//   console.log("Uploaded file:", req.file); // Add this line

//   try {
//     // Check if file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded." });
//     }

//     // Extract metadata from req.body
//     const { title, detail, imageURL } = req.body; // Extract these variables here

//     // Check if any required fields are missing
//     if (!title || !detail || !imageURL) {
//       return res.status(400).json({ error: "Missing required fields." });
//     }
//     // // if storing locally
//     // const filePath = path.join(
//     //   __dirname, // refers to the absolute path pointing where this file is kept
//     //   "../route/uploads",
//     //   req.file.filename
//     // );

//     // // Read the file asynchronously
//     // const data = await fs.readFile(filePath, "utf8");

//     // Use Blog.create to directly create and save the new blog entry
//     const createdBlog = await Blog.create({
//       filename: req.file.filename,
//       // content: data,
//       fileId: req.file.id,
//       title,
//       detail,
//       imageURL,
//     });

//     res.status(200).json(createdBlog);
//   } catch (error) {
//     console.error("Error creating blog:", error); // Log error for debugging
//     res.status(500).json({ error: error.message });
//   }
// };

// const getBlogById = async (req, res) => {
//   try {
//     const foundBlog = await Blog.findById(req.params.id);
//     if (!foundBlog) {
//       req.status(404).json({ error: "Blog not found" });
//     }
//     res.status(200).json(foundBlog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getHTMLFileById = (req, res) => {
//   console.log("Inside getHTMLFileById");
//   const fileId = req.params.fileId;
//   console.log("Received fileId from params:", fileId);
//   // console.log("Received fileId from params:", fileId);

//   if (!gfs) {
//     console.log("GridFS is not initialized.");
//     return res.status(500).json({ error: "GridFS is not initialized." });
//   }

//   try {
//     gfs.files.findOne(
//       { _id: mongoose.Types.ObjectId(fileId) },

//       (err, file) => {
//         if (err) {
//           console.error("Error finding file:", err);
//           return res.status(500).json({ error: "Error finding file" });
//         }

//         if (!file) {
//           console.log("No file found with given fileId.");
//           return res.status(404).json({ error: "No file exists" });
//         }

//         console.log("File found:", file);

//         // Stream file if it exists using file._id
//         const readstream = gfs.createReadStream({ _id: file._id });
//         readstream.pipe(res).on("error", (streamErr) => {
//           console.error("Error streaming file:", streamErr);
//           res.status(500).json({ error: "Error streaming file" });
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Exception in getHTMLFileById:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// const getAllBlogs = async (req, res) => {
//   try {
//     const allBlogs = await Blog.find();
//     res.status(200).json(allBlogs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //  need to configure deleteBlog to also delete the stored file
// const deleteBlog = async (req, res) => {
//   try {
//     const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
//     if (!deletedBlog) {
//       res.status(404).json({ error: "Blog not found" });
//     }
//     res.status(200).json(deletedBlog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateBlog = async (req, res) => {
//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (!updatedBlog) {
//       res.status(404).json({ error: "Blog not found" });
//     }
//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getAllBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   getBlogById,
//   getHTMLFileById,
// };

const Blog = require("../model/blog");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

// Initialize GridFSBucket
let gfsBucket;

mongoose.connection.once("open", () => {
  const db = mongoose.connection.db;
  gfsBucket = new GridFSBucket(db, {
    bucketName: "uploads", // Ensure this matches your GridFS bucket name
  });
});

// Create a new blog entry
const createBlog = async (req, res) => {
  console.log("Uploaded file:", req.file);

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
      filename: req.file.filename,
      fileId: req.file.id,
      title,
      detail,
      imageURL,
    });

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
        downloadStream.pipe(res).on("error", (streamErr) => {
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
    const blogToDelete = await Blog.findById(req.params.id);
    if (!blogToDelete) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Delete the file from GridFS
    await gfsBucket.delete(blogToDelete.fileId);

    // Delete the blog entry
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBlog);
  } catch (error) {
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
