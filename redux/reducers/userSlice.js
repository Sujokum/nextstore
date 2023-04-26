import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username : '',
    group  : [],
    email : ''
};

const userSlice  = createSlice({

    name : 'user',
    initialState,
    reducers : {
        addUsername(state , action) {
            state.username = action.payload;
            },
        addGroup(state , action) {
            state.group = action.payload;
            },
        addEmail(state , action) {
            state.email = action.payload;
            },
        signout(state , action){
            state = initialState;
        }
         
    }

})



export const { addUsername ,  addGroup , addEmail , signout  } = userSlice.actions;

export default userSlice.reducer;