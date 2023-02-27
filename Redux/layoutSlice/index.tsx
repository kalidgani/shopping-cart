import { createSlice } from "@reduxjs/toolkit";

export interface layout {
    sidebar : boolean,
    dropdown : boolean,
    logout : boolean,
}

const initialState : layout  = {
    sidebar : true,
    dropdown : true,
    logout : false
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        sidebarActive : (state) => {
            state.sidebar = !state.sidebar
        },
        dropdownActive : (state) => {
            state.dropdown = !state.dropdown
        },
        logoutActive : (state) => {
            state.logout = !state.logout
        },
    }
})

export const {sidebarActive, dropdownActive, logoutActive} = layoutSlice.actions

export default layoutSlice.reducer