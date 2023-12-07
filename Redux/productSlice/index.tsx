import { db } from "@/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";


export interface layout {
  action: boolean;
  productId: number;
  isGeneral: boolean;
  productList : any[];
  addData : any;
  isLoading : boolean
}

const initialState: layout = {
  action: false,
  productId: 0,
  isGeneral: true,
  productList : [],
  addData : {},
  isLoading : false,
};

export const productCollectionsRef = collection(db, 'products')

export const addProducts = createAsyncThunk('product/getProduct', async (product : any) =>{      
      const data = await addDoc(productCollectionsRef, {product})
      console.log(data);
      return data.
      
      
})

export const updateProducts = createAsyncThunk('product/updateProduct', async (product : any) =>{  
  const docRef = doc(db, "products", product.id);  
  const updatedProduct : any = {
    product : product.value
  }
  const data = await updateDoc(docRef, updatedProduct)
  console.log(data)
})

export const deleteProducts = createAsyncThunk('product/deleteProduct', async (id : any) =>{  
  const docRef = doc(db, "products", id);  
  const data = await deleteDoc(docRef)
  console.log(data)
})

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
  extraReducers(builder) {
    builder.addCase(addProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProducts.fulfilled, (state, action: any) => {debugger
      let productList = [...state.productList]
      productList.push(action.payload)
      state.productList = productList;
      state.isLoading = false;
    });
    builder.addCase(addProducts.rejected, (state, action: any) => {
      state.isLoading = false;
    });
  },
});

export const { actionActive,generalActive, variationActive, getAllProducts, deleteProduct, editClicked, addProductClicked } = productSlice.actions;

export default productSlice.reducer;
