import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      console.log(action.payload);
      return [...state, action.payload];
    },
    removeBlog(state, action) {
      // action.payload === id
      const BlogsPostDelete = state.filter(
        (blog) => blog.id !== action.payload
      );
      return BlogsPostDelete;
    },
  },
});

export const { addBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
