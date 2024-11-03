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

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  addBlog,
  removeBlog,
  updateBlog,
  getBlogById,
} from "../index";

const initialState = {
  blog: {},
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog", // name has no impact on Thunks
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      })
      .addCase(getBlogById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        console.log("insideBlogSlicegetBlogById", action.payload);
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
