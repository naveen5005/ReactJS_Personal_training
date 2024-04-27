import {combineReducers, configureStore} from '@reduxjs/toolkit'
import studentSlice from './studentSlice'
import cartSlice from './cartSlice'

export const store = configureStore({
    reducer : combineReducers({
        students : studentSlice,
        cart :cartSlice
    })
})