import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    studentsRegistration : []
}

export const handleCreateStudentRegAsync = createAsyncThunk("studentsRegistration/handleCreateStudentRegAsync",(studentRegDetail)=>{
    axios.post("http://localhost:3001/studentRegistration",studentRegDetail);
})
export const studentSlice = createSlice({
    name : "studentsRegistration",
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(handleCreateStudentRegAsync.fulfilled,()=>{
            console.log("New User Added Successfully...!!!");
        });
        builder.addCase(handleCreateStudentRegAsync.rejected,()=>{
            throw Error("POST Student Registration API got failed...!!!");
        })
    }
})

export default studentSlice.reducer;