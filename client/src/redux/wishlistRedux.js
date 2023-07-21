import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = wishlistSlice.actions;
export default wishlistSlice.reducer;
