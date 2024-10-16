import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 
import fitnessReducer from "./fitnessSlice"


export const appStore = configureStore({
    reducer:
    {
        user:userReducer,
        fitness:fitnessReducer
    }
})