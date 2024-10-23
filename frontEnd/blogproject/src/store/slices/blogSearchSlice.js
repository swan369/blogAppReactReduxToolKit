import { createSlice } from "@reduxjs/toolkit";

const blogSearchSlice = createSlice({
  name: "blogSearch",
  initialState: { blogs: [], searchTerm: "" },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    searchedBlogs(state, action) {
      const blogs = action.payload;
      const searchedBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      return { ...state, blogs: searchedBlogs };
    },
  },
});

export const { setSearchTerm, searchedBlogs } = blogSearchSlice.actions;
export default blogSearchSlice.reducer;
