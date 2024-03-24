import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users :[
        {
            id : 1,
            fname : "naveen",
            lname : "kumar"
        },
        {
            id : 2,
            fname : "syam",
            lname : "kumar"
        },
        {
            id : 3,
            fname : "akhil",
            lname : "kumar"
        }
    ],
    products:[]
}
export const userSlice = createSlice({
    name : "users",
    initialState,
    reducers : {
        addUser : (state,action) =>{
            state.users.push(action.payload);
        },
        deleteUser : (state,action) =>{
            state.users = state.users.filter((user)=>user.id !== action.payload.id);
        },
        updateUser : (state,action) =>{
            // console.log(action)
            state.users = state.users.map((user)=>{
                if(user.id === action.payload.id){
                    return action.payload;
                }
                return user;
            })
        }
    }
});

export const {addUser,deleteUser,updateUser} = userSlice.actions;
export default userSlice.reducer