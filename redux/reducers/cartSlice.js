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
        state.cartProduct = state.cartProduct.filter((item) => item.id !== action.payload);
       },
       incrementCartItem (state , action){
        state.cartProduct = state.cartProduct.map((item) => {
            if (item.id === action.payload) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
    },
       decrementCartItem (state , action){
        state.cartProduct = state.cartProduct.map((item) => {
            if (item.id === action.payload) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
    },
    getCartTotal (state){
        let {totalQuantity , totalPrice} = state.cartProduct.reduce((cartTotal , cartItem)=>{
            const {price , quantity} = cartItem;
            const itemTotal = price * quantity;
            cartTotal.totalPrice += itemTotal;
            cartTotal.totalQuantity += quantity;
            return cartTotal;
        },{
            totalQuantity : 0,
            totalPrice :0 
        });
        state.totalPrice = parseInt(totalPrice.toFixed(2));
        state.totalQuantity = totalQuantity;
    }
    }

})



export const { add , remove , incrementCartItem , decrementCartItem , getCartTotal} = cartSlice.actions;

export default cartSlice.reducer;