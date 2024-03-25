import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';

const initialState = {
    users :[]
}
export const handleGetUserAsync = createAsyncThunk("users/handleGetUserAsync",()=>{
    const usersData =Axios.get("http://localhost:3001/users").then((res)=>{
        return res.data;
    })
    return usersData
})
export const handleDeleteUserAsync = createAsyncThunk("users/handleDeleteUserAsync",(user)=>{
   const {data} = Axios.delete("http://localhost:3001/users/"+user.id);
   return data;
})
export const handleCreateUserAsync = createAsyncThunk("users/handleCreateUserAsync",(user)=>{
   const {data} = Axios.post("http://localhost:3001/users/",user);
   return data;
})
export const handleUpdateUserAsync = createAsyncThunk("users/handleUpdateUserAsync",(user)=>{
    const {data} = Axios.put("http://localhost:3001/users/"+user.id,user);
    return data;
 })
export const userSlice = createSlice({
    name:"users",
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(handleGetUserAsync.fulfilled,(state,action)=>{
            state.users = action.payload;
        });
        builder.addCase(handleGetUserAsync.rejected,(state,action)=>{
            state.users =[]
        });

        builder.addCase(handleDeleteUserAsync.fulfilled,()=>{
            console.log("User deleted successfully....")
        });
        builder.addCase(handleCreateUserAsync.fulfilled,()=>{
            console.log("User added successfully...")
        });
        builder.addCase(handleUpdateUserAsync.fulfilled,()=>{
            console.log("User updated successfully...")
        });
    }

})

export default userSlice.reducer;