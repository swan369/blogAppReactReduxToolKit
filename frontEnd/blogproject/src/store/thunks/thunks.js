import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = "http://localhost:3021";

// "blog/fetchBlogs can be named anything, it is used as identifier"
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  const response = await axios.get(`${BASEURL}/blogs`);
  console.log(response);
  return response.data;
});

export const addBlog = createAsyncThunk("blog/addBlogs", async (newBlog) => {
  const response = await axios.post(`${BASEURL}/blogs/create`, newBlog);
  return response.data;
});

export const removeBlog = createAsyncThunk(
  "blog/removeBlog",
  async (blogId) => {
    await axios.delete(`${BASEURL}/blogs/${blogId}`);
    return blogId;
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (updatedBlog) => {
    const response = await axios.put(
      `${BASEURL}/blogs/${updatedBlog.id}`,
      updatedBlog
    );
    return response.data;
  }
);
