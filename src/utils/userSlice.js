import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:null,

    reducers:{
        addLoginUser: (state, action) =>
        {
            return action.payload;
        },

        removeLoginUser: () =>
        {
            return null;
        },
    }
})

export const{addLoginUser,removeLoginUser} = userSlice.actions;
export default userSlice.reducer;