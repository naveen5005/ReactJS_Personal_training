import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    students : []
}

export const handleCreateStudentRegAsync = createAsyncThunk("students/handleCreateStudentRegAsync",(studentRegDetail)=>{
    axios.post("http://localhost:3001/studentRegistration",studentRegDetail);
})
export const handleGetStudentDetailsAsync = createAsyncThunk("students/handleGetStudentDetailsAsync",()=>{
    const studentDetails =axios.get("http://localhost:3001/studentRegistration").then((res)=>{
        return res.data
    });
    return studentDetails;
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
        });
        builder.addCase(handleGetStudentDetailsAsync.fulfilled,(state,action)=>{
            state.students = action.payload;
        });
        builder.addCase(handleGetStudentDetailsAsync.rejected,()=>{
            throw Error("GET Student API got failed...!!!");
        })
    }
})

export default studentSlice.reducer;