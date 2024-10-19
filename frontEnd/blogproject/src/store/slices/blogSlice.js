import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return [...state, action.payload];
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      const newBlogs = state.map((blog) => {
        if (action.payload.id === blog.id) {
          return { ...blog, ...action.payload };
        }
        return blog;
      });

      return newBlogs;
    },
  },
});

export const { addBlog, removeBlog, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;
