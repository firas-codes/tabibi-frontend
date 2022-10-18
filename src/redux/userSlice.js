import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false
}



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.isLoggedIn = false;
            
        },
        login:(state,action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;
            
        }
    }
})

export const {logout,login} = userSlice.actions;

export default userSlice.reducer;