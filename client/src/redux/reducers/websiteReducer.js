import { createSlice } from "@reduxjs/toolkit";

const websiteReducer = createSlice({
  name: "websiteReducer",
  initialState: {
    selectedCategories: null,
    isCategoriesSelected:false
  },
  reducers: {
    changeChatgories: (state, action) => {
      state.selectedCategories = action.payload;
      state.isCategoriesSelected = true;
    },

  },
});

export default websiteReducer.reducer;
export const { changeChatgories } = websiteReducer.actions;
