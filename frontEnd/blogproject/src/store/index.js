import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import { changeDetail } from "./slices/formSlice";
import { changeTitle } from "./slices/formSlice";
import blogReducer from "./slices/blogSlice";
import { addBlog, removeBlog } from "./slices/blogSlice";
import { reset } from "./slices/actions";

const store = configureStore({
  reducer: {
    form: formReducer,
    blogs: blogReducer,
  },
});

console.log("Initial state: ", store.getState());

// Subscribe to store updates and log state changes aka listener
store.subscribe(() => {
  console.log("Updated state: ", store.getState());
});

export { store, changeDetail, changeTitle, addBlog, removeBlog, reset };
