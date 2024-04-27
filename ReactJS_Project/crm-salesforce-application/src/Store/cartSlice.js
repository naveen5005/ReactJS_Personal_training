import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : []
}

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
        addToCart : (state,action) => {
            const itemPresent = state.cart.find((item)=> item.id === action.payload.id);
            itemPresent ? itemPresent.quantity++ : state.cart.push({...action.payload , quantity : 1});
        },
        removeFromCart : (state,action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
        incrementQuantity: (state,action) => {
            const itemPresent = state.cart.find((item)=>item.id === action.payload.id);
            itemPresent.quantity++;
            // itemPresent.newPrice = itemPresent.price * itemPresent.quantity;
        },
        decrementQuantity: (state,action) => {
            const itemPresent = state.cart.find((item)=>item.id === action.payload.id);
            if(itemPresent.quantity === 1){
                state.cart = state.cart.filter((item) => item.id !== action.payload.id)
            }else{
                itemPresent.quantity--;
                // itemPresent.price = itemPresent.price * itemPresent.quantity;
            } 
        }
    }
})

export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;