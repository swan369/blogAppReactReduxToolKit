import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../index";

const formSlice = createSlice({
  name: "form",
  initialState: {
    title: "",
    detail: "",
  },

  reducers: {
    changeTitle(state, action) {
      return { ...state, title: action.payload };
    },
    changeDetail(state, action) {
      return { ...state, detail: action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(reset, (state, action) => {
      return {
        title: "",
        detail: "",
      };
    });
  },
});

// console.log(formSlice);
// console.log(formSlice.reducer);

export const { changeTitle, changeDetail } = formSlice.actions;
export default formSlice.reducer;
