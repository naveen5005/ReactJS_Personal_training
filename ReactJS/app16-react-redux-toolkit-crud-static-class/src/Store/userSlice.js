import { createSlice } from "@reduxjs/toolkit"

const initialState=  {
    users :[],
    products:[]
}

export const userSlice =createSlice({
    name : "users",
    initialState,
    reducers :{
        addUser : (state,action)=>{
            state.users.push(action.payload);
        },
        deleteUser : (state,action)=>{
            state.users = state.users.filter((usr)=>usr.id !== action.payload.id);
        },
        updateUser : (state,action) =>{
            state.users = state.users.map((usr)=>{
                if(usr.id === action.payload.id){
                    return action.payload;
                }
                return usr;
            })
        }
    }
})

export const {addUser,deleteUser,updateUser} = userSlice.actions;

export default userSlice.reducer;