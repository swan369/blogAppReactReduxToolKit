import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import { changeDetail, changeTitle } from "./slices/formSlice";
import blogReducer from "./slices/blogSlice";
import blogSearchReducer from "./slices/blogSearchSlice";
import {
  setSearchTerm,
  searchedBlogs,
  setQuery,
} from "./slices/blogSearchSlice";
import { reset } from "./slices/actions";
import {
  changeTitle as changeUpdateTitle,
  changeDetail as changeUpdateDetail,
  visualUpdateBlog,
  toggleUpdate,
} from "./slices/updateSlice";
import updateReducer from "./slices/updateSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    blogs: blogReducer,
    update: updateReducer,
    blogSearch: blogSearchReducer,
  },
});

console.log("Initial state: ", store.getState());

// Subscribe to store updates and log state changes aka listener
store.subscribe(() => {
  console.log("Updated state: ", store.getState());
});

export {
  store,
  changeDetail,
  changeTitle,
  reset,
  toggleUpdate,
  changeUpdateDetail,
  changeUpdateTitle,
  visualUpdateBlog,
  setSearchTerm,
  searchedBlogs,
  setQuery,
};

export { addBlog, removeBlog, updateBlog, fetchBlogs } from "./thunks/thunks";
