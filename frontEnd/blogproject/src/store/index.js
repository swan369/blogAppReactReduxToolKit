import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import { changeDetail, changeTitle } from "./slices/formSlice";
import blogReducer from "./slices/blogSlice";
import { addBlog, removeBlog, updateBlog } from "./slices/blogSlice";
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
  addBlog,
  removeBlog,
  reset,
  toggleUpdate,
  changeUpdateDetail,
  changeUpdateTitle,
  visualUpdateBlog,
  updateBlog,
};
