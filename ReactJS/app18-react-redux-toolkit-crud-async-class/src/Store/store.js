import { configureStore } from "@reduxjs/toolkit";
import  personSlice  from "./personSlicer";

export const store = configureStore({
    reducer : personSlice
})