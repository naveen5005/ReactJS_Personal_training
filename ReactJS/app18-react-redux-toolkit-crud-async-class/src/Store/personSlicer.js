import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    persons: []
}

export const handleGetPersonAsync = createAsyncThunk("persons/handleGetPersonAsync",()=>{
    const personsDetails =axios.get("http://localhost:3001/persons").then((res)=>{
        return res.data;
    })
    return personsDetails;
})
export const handleDeletePersonAsync = createAsyncThunk("persons/handleDeletePersonAsync",(person)=>{
    axios.delete("http://localhost:3001/persons/"+person.id);
})
export const handleCreatePersonAsync = createAsyncThunk("persons.handleCreatePersonAsync",(person)=>{
    axios.post("http://localhost:3001/persons",person);
})
export const handleUpdatePersonAsync = createAsyncThunk("persons/handleUpdatePersonAsync",(person)=>{
    axios.put("http://localhost:3001/persons/"+person.id,person);
})
export const personSlice = createSlice({
    name: "persons",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(handleGetPersonAsync.fulfilled, (state, action) => {
            state.persons = action.payload;
        });
        builder.addCase(handleGetPersonAsync.rejected, () => {
            throw Error("GET API is getting rejected...!!!");
        });
        builder.addCase(handleDeletePersonAsync.fulfilled,()=>{
            console.log("Person deleted successfully...!!!")
        });
        builder.addCase(handleDeletePersonAsync.rejected,()=>{
            throw Error("DELETE API is getting rejected...!!!");
        });
        builder.addCase(handleCreatePersonAsync.fulfilled,()=>{
            console.log("New Person added successfully");
        });
        builder.addCase(handleCreatePersonAsync.rejected,()=>{
            throw Error("POST API is getting rejected...!!!")
        });
        builder.addCase(handleUpdatePersonAsync.fulfilled,()=>{
            console.log("Person Updated successfully");
        });
        builder.addCase(handleUpdatePersonAsync.rejected,()=>{
            throw Error("PUT API is getting rejecetd...!!!")
        })
    }
})

export default personSlice.reducer;