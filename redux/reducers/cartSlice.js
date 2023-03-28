import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const cartSlice  = createSlice({

    name : 'cart',
    initialState,
    reducers : {
        add(state , action) {
            state.push(action.payload);
        },
       remove (state , action){
        return state.filter((val)=> val.id !== action.payload); 
       },
       increment (state , action){
        return
       }

    }

})



export const { add , remove } = cartSlice.actions;

export default cartSlice.reducer;