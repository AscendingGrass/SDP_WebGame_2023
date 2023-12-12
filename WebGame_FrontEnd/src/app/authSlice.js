import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: {},
    access_token : ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        loginUser : (state, action) => {
            state.user = action.payload.user;
            state.access_token = action.payload.access_token
        },
        logoutUser: (state) => {
            state.user = {},
            state.access_token = "";
        }
    },
})

export const {loginUser, logoutUser} = authSlice.actions

export default authSlice.reducer