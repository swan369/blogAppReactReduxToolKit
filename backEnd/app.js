require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./route/blogRoute");

app.use(cors());
app.use(express.json());
app.use("/blogs/", blogRoutes); //shorten the URL required in route

mongoose.set("strictQuery", false); // Set strictQuery option

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.userNamePw}@clusterweb.1t4x2.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWeb`
    );
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

connectToDatabase();

app.listen(PORT, () => {
  console.log(`server listening on PORT: ${PORT}`);
});
