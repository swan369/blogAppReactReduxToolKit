import { createSlice } from "@reduxjs/toolkit";

const blogSearchSlice = createSlice({
  name: "blogSearch",
  initialState: { blogs: [], searchTerm: "", query: "", isQuery: false },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    // need to rerun searchedBlogs, as editedBlog does not auto update blogSearch blog
    searchedBlogs(state, action) {
      const { blogs, query } = action.payload;

      state.blogs = query
        ? blogs.filter((blog) =>
            blog.title.toLowerCase().includes(query.toLowerCase())
          )
        : [];
    },

    setQuery(state, action) {
      state.query = action.payload;
    },
    setIsQuery(state, action) {
      state.isQuery = action.payload;
    },
  },
});

export const { setSearchTerm, searchedBlogs, setQuery, setIsQuery } =
  blogSearchSlice.actions;
export default blogSearchSlice.reducer;
