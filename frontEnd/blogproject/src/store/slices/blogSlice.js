// import { createSlice } from "@reduxjs/toolkit";

// const blogSlice = createSlice({
//   name: "blogs",
//   initialState: [],
//   reducers: {
//     addBlog(state, action) {
//       return [...state, action.payload];
//     },
//     removeBlog(state, action) {
//       return state.filter((blog) => blog.id !== action.payload);
//     },
//     updateBlog(state, action) {
//       const newBlogs = state.map((blog) => {
//         if (action.payload.id === blog.id) {
//           return { ...blog, ...action.payload };
//         }
//         return blog;
//       });

//       return newBlogs;
//     },
//   },
// });

// export const { addBlog, removeBlog, updateBlog } = blogSlice.actions;
// export default blogSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = "http://localhost:3005";

// "blog/fetchBlogs can be named anything, it is used as identifier"
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  const response = await axios.get(`${BASEURL}/blogs`);
  return response.data;
});

export const addBlog = createAsyncThunk("blog/addBlogs", async (newBlog) => {
  const response = await axios.post(`${BASEURL}/blogs`, newBlog);
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
  async (blogId, updatedBlog) => {
    const response = await axios.put(`${BASEURL}/blogs/${blogId}`, updatedBlog);
    return response.data;
  }
);

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog", // name has no impact on Thunks
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch blogs
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(removeBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(removeBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
      });
  },
});

export default blogSlice.reducer;
