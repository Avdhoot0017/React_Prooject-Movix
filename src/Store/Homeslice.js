import { createSlice } from "@reduxjs/toolkit";

export const HomeSlice = createSlice({

    name: "Home",
    initialState: {
        url:{},
        genres:{},

    },

    reducers:{
        getApiConfiguration: (state,action)=>{
            state.url = action.payload;

        },

        getGenres: (state,action)=>{
            state.genres = action.payload;

        },
    },
})

export const {getApiConfiguration , getGenres} = HomeSlice.actions;

export default HomeSlice.reducer