import { configureStore } from "@reduxjs/toolkit";
import Homeslice from "./Homeslice";

export const store = configureStore({

    reducer:{
        Home: Homeslice,

    },  



})