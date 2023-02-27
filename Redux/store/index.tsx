import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../layoutSlice";
import productSlice from '../productSlice'

export const store  = configureStore({
    reducer : {
        layout : layoutSlice,
        product : productSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch