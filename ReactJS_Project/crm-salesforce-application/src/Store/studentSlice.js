import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { all } from "axios";

const initialState = {
    students : [],
    products :[]
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
export const handleGetAllProductsAsync = createAsyncThunk("products/handleGetAllProductsAsync",()=>{
    const allProducts =axios.get("https://fakestoreapi.com/products").then((res)=>{
        return res.data;
    });
    return allProducts;
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
        });
        builder.addCase(handleGetAllProductsAsync.fulfilled,(state,action)=>{
            state.products = action.payload;
        });
        builder.addCase(handleGetAllProductsAsync.rejected,()=>{
            throw Error("GET Products API got failed...!!!");
        })
    },
    reducers : {
        handleSearch : (state,action) => {
            state.products = state.products.filter((item) => item.category.includes(action.payload));
        },
        clearSearch : (state,action) =>{
            state.products =[];
        }
    },
});

export const {handleSearch,clearSearch} = studentSlice.actions;
export default studentSlice.reducer;