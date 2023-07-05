import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, searchInputValue } = action.payload;

      const tempProducts = products.filter(
        product =>
          product.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredPoducts = state => state.filter.filteredProducts;

export default filterSlice.reducer;
