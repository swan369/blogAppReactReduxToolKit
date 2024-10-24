import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "update",
  initialState: {
    blogBeingEdited: null,
    isBlogUpdate: false,
    blogChange: { title: "", detail: "" },
  },

  reducers: {
    toggleUpdate(state, action) {
      console.log(action.payload);
      state.isBlogUpdate = action.payload.isUpdate;
      state.blogBeingEdited = action.payload.id;
    },
    visualUpdateBlog(state, action) {
      return {
        ...state,
        blogChange: {
          ...state.blogChange,
          ...action.payload,
        },
      };
    },

    changeTitle(state, action) {
      return {
        ...state,
        blogChange: { ...state.blogChange, title: action.payload },
      };
    },
    changeDetail(state, action) {
      return {
        ...state,
        blogChange: { ...state.blogChange, detail: action.payload },
      };
    },
  },
});

export const { toggleUpdate, visualUpdateBlog, changeTitle, changeDetail } =
  updateSlice.actions;
export default updateSlice.reducer;
