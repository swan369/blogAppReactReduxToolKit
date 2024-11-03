// // const path = require("path");
// // const fs = require("fs");

// // // if storing .html in local storage
// // const uploadsDir = path.join(__dirname, "uploads"); // becareful since you created the uploads where __dirname points to this file and thus directory uploads will be created i.e. route/uploads/test.html

// // const ensureUploadDirExists = (req, res, next) => {
// //   try {
// //     console.log("Checking if uploads directory exists...");
// //     if (!fs.existsSync(uploadsDir)) {
// //       console.log("Uploads directory does not exist. Creating...");
// //       fs.mkdirSync(uploadsDir, { recursive: true });
// //       console.log("Uploads directory created.");
// //     } else {
// //       console.log("Uploads directory already exists.");
// //     }
// //   } catch (error) {
// //     console.error("Error checking/creating uploads directory:", error);
// //     return res
// //       .status(500)
// //       .json({ error: "Failed to create upload directory." });
// //   }
// //   next();
// // };

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, uploadsDir); // Use the absolute path here *** important else ENOENT error
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, file.originalname);
// //   },
// // });

// // const upload = multer({ storage });

// // router.post(
// //   "/create",
// //   ensureUploadDirExists, // this must be before, to check if directory exists first
// //   (req, res, next) => {
// //     upload.single("htmlFile")(req, res, (err) => {
// //       if (err) {
// //         console.error("Error during file upload:", err);
// //         return res.status(500).json({ error: "File upload failed." });
// //       }
// //       next();
// //     });
// //   },
// //   (req, res, next) => {
// //     console.log("Uploaded file details:", req.file); // Log the uploaded file details
// //     if (!req.file) {
// //       return res.status(400).json({ error: "No file uploaded." });
// //     }
// //     next();
// //   },
// //   blogController.createBlog
// // );

//........
// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const blogController = require("../controllers/blog");
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");

// const mongoURI = `mongodb+srv://${process.env.userNamePw}@clusterweb.1t4x2.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWeb`;

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       if (!file) {
//         return reject(new Error("File is undefined"));
//       }

//       const fileInfo = {
//         filename: file.originalname,
//         bucketName: "uploads", // GridFS bucket name
//       };

//       resolve(fileInfo);
//     });
//   },
// });

// // Initialize upload
// const upload = multer({ storage });

// // Define routes
// // router.post("/create", upload.single("htmlFile"), blogController.createBlog);
// router.post(
//   "/create",
//   (req, res, next) => {
//     console.log("1stMiddleWare:", req.body); // nothing in {} as multer will process the file first

//     // (req, res, callback) // upload.sing(htmlFile)alone does nothing
//     //uploads the key "htmlFile"/value (req,res,callback)ensures the file and body are processed before moving on
//     upload.single("htmlFile")(req, res, (err) => {
//       if (err) {
//         console.error("File upload error:", err);
//         return res.status(500).json({ error: "File upload failed" });
//       }
//       console.log("1stMiddleWareAfterFileProcessed:", req.body); // req.body will show.
//       console.log("1stMiddleWareFileId", req.file.id); // multer file processed, thus file id available
//       next(); // moves on to next middle/controller
//     });
//   },
//   (req, res, next) => {
//     console.log("you are at 2ndMiddleWareForTesting");
//     next(); // can create many middlewares. Afterall, they are just annonymous callbacks
//   },
//   blogController.createBlog
// );

const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const multer = require("multer");

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for uploading to GridFSBucket
const uploadFileToGridFS = (req, res, next) => {
  const gfsBucket = req.app.locals.gfsBucket; // access gfsBucket created at app.js

  if (!gfsBucket) {
    return res.status(500).json({ error: "GridFSBucket not initialized." });
  }

  // Use multer to handle file upload
  upload.single("htmlFile")(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ error: "File upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Create an upload stream to GridFS // take note using gfsBucket
    const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
      metadata: req.body,
      contentType: req.file.mimetype,
    });

    // Write the file buffer to the upload stream
    uploadStream.end(req.file.buffer);

    // Listen for the 'finish' event to get the file ID
    uploadStream.on("finish", () => {
      req.fileId = uploadStream.id;
      console.log("File uploaded successfully with ID:", req.fileId);
      next();
    });

    // Handle any errors during upload
    uploadStream.on("error", (streamErr) => {
      console.error("Error saving file to GridFSBucket:", streamErr);
      res.status(500).json({ error: "Error saving file to database" });
    });
  });
};

// Define routes
router.post("/create", uploadFileToGridFS, blogController.createBlog);

// more specific routes to be higher hierachy
router.get("/:fileId/file", blogController.getHTMLFileById);
router.get("/", blogController.getAllBlogs);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.get("/:id", blogController.getBlogById);

module.exports = router;
