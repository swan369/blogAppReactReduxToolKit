import { createSlice } from "@reduxjs/toolkit";

const blogSearchSlice = createSlice({
  name: "blogSearch",
  initialState: { blogs: [], searchTerm: "", query: "" },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    // need to rerun searchedBlogs, as editedBlog does not auto update blogSearch blog
    searchedBlogs(state, action) {
      const blogs = action.payload.blogs;
      const searchedTerm = action.payload.query;
      let searchedBlogs = [];

      if (searchedTerm) {
        searchedBlogs = blogs.filter((blog) =>
          //   blog.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          blog.title.toLowerCase().includes(searchedTerm.toLowerCase())
        );
      }

      return { ...state, blogs: searchedBlogs };
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export const { setSearchTerm, searchedBlogs, setQuery } =
  blogSearchSlice.actions;
export default blogSearchSlice.reducer;
