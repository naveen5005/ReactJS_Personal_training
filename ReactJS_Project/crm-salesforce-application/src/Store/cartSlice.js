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
            itemPresent ? itemPresent.quantity++ : state.cart.push({...action.payload , quantity : 1, newPrice : action.payload.price});
        },
        removeFromCart : (state,action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
        incrementQuantity: (state,action) => {
            const itemPresent = state.cart.find((item)=>item.id === action.payload.id);
            itemPresent.quantity++;
            itemPresent.newPrice = itemPresent.price * itemPresent.quantity;
        },
        decrementQuantity: (state,action) => {
            const itemPresent = state.cart.find((item)=>item.id === action.payload.id);
            if(itemPresent.quantity === 1){
                state.cart = state.cart.filter((item) => item.id !== action.payload.id)
            }else{
                itemPresent.quantity--;
                itemPresent.newPrice = itemPresent.newPrice - itemPresent.price;
            } 
        },
        clearCart : (state,action) =>{
            state.cart =[];
        }
    }
})

export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;