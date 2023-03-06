import { createSlice } from "@reduxjs/toolkit";


export interface layout {
  action: boolean;
  productId: number;
  isGeneral: boolean;
  productList : any[];
  addData : any;
}

const initialState: layout = {
  action: false,
  productId: 0,
  isGeneral: true,
  productList : [],
  addData : {}
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    actionActive: (state, action) => {
      state.action = !state.action;
      state.productId = action.payload;
    },
    generalActive: (state) => {
      state.isGeneral = true;
    },
    variationActive: (state) => {
      state.isGeneral = false;
    },
    getAllProducts: (state, action) => {
      state.productList = action.payload
    },
    deleteProduct: (state, action) => {
      let product = state.productList.filter((item) => item.id !== action.payload)
      state.productList = product
      state.action = false
    },
    editClicked : (state) => {
      state.action = false
      state.isGeneral = true;
    },
    addProductClicked : (state) => {
      state.isGeneral = true;
    }
  },
});

export const { actionActive,generalActive, variationActive, getAllProducts, deleteProduct, editClicked, addProductClicked } = productSlice.actions;

export default productSlice.reducer;
