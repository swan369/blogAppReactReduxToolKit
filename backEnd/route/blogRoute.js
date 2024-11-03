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

require("dotenv").config();
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const mongoURI = `mongodb+srv://${process.env.userNamePw}@clusterweb.1t4x2.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWeb`;

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error("File is undefined"));
      }

      const fileInfo = {
        filename: file.originalname,
        bucketName: "uploads", // GridFS bucket name
      };

      resolve(fileInfo);
    });
  },
});

// Initialize upload
const upload = multer({ storage });

// Define routes
// router.post("/create", upload.single("htmlFile"), blogController.createBlog);
router.post(
  "/create",
  (req, res, next) => {
    upload.single("htmlFile")(req, res, (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ error: "File upload failed" });
      }
      next();
    });
  },
  blogController.createBlog
);

// more specific routes to be higher hierachy
router.get("/:fileId/file", blogController.getHTMLFileById);
router.get("/", blogController.getAllBlogs);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.get("/:id", blogController.getBlogById);

module.exports = router;
