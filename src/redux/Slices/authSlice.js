import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setToken: (state, action) => {  // can make it value
            state.token = action.payload
        }
    }
})

export const {setToken} = authSlice.actions

export default authSlice.reducer