import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartProduct : [],
    totalPrice : 0,
    totalQuantity : 0,
};

const cartSlice  = createSlice({

    name : 'cart',
    initialState,
    reducers : {
        add(state , action) {
            let find = state.cartProduct.findIndex((item)=> item.id === action.payload.id);
            if(find >= 0){
                state.cartProduct[find].quantity += 1;
            }else{
                state.cartProduct.push(action.payload);
            }
        },
       remove (state , action){
        return state.filter((val)=> val.id !== action.payload); 
       },
       increment (state , action){
        return
       }

    }

})



export const { add , remove , incrementCartItem , decrementCartItem , getCartTotal} = cartSlice.actions;

export default cartSlice.reducer;