import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { myConfig as config } from "../../config";


const apiKey = config.API_KEY;
const baseUrl = config.moviesBaseUrl;
const searchUrl = config.searchUrl;

 export const fetchMovies = createAsyncThunk('fetchMovies', async ()=>{
    try {
        const response = await axios.get(`${baseUrl}api_key=${apiKey}`);
        const movieData = await response.data.results;
        return movieData;
      } catch (error) {
        console.error("Error =", error);
        throw error;
      }
 })

 export const searchMovies = createAsyncThunk('searchMovies', async (query)=>{
    try {
        const response = await axios.get(`${searchUrl}${query}`);
        const movieData = await response.data.results;
        console.log("Complete URL============>",`${searchUrl}${query}`);
        return movieData;
      } catch (error) {
        console.error("Error =", error);
        throw error;
      }
 })


export const movieSlice = createSlice({
    name: "movieSlice",
    initialState:
    {
        movies:[],
        loading: false,
        error: false,
    },

    extraReducers: {
        [fetchMovies.pending]: (state, action)=>{
            state.loading = true;
        },
        [fetchMovies.fulfilled]: (state, action)=>{
            state.loading = false;
            state.movies = action.payload;
        },
        [fetchMovies.rejected]: (state, action)=>{
            state.loading = false;
            console.log("Error = ", action.payload);
            state.error = true;
        },
        [searchMovies.pending]: (state, action)=>{
            state.loading = true;
        },
        [searchMovies.fulfilled]: (state, action)=>{
            state.loading = false;
            state.movies = action.payload;
        },
        [searchMovies.rejected]: (state, action)=>{
            state.loading = false;
            console.log("Error = ", action.payload);
            state.error = true;
        }
    },

    // extraReducers:(builder)=>{
    //     builder.addCase(fetchMovies.pending,(state, action)=>{
    //         state.loading = true;
    //     })
    //     builder.addCase(fetchMovies.fulfilled,(state, action)=>{
    //         state.loading = false;
    //         state.movies = action.payload;
    //         console.log("Movies=======================>>>>>>>>>>>>>", state.movies);
    //     })
    //     builder.addCase(fetchMovies.rejected,(state, action)=>{
    //         state.loading = false;
    //         console.log("Error = ", action.payload);
    //         state.error = true;
    //     })
    // },

    // extraReducers:(builder)=>{
    //     builder.addCase(searchMovies.pending,(state, action)=>{
    //         state.loading = true;
    //     })
    //     builder.addCase(searchMovies.fulfilled,(state, action)=>{
    //         state.loading = false;
    //         state.movies = action.payload;
    //         console.log("Movies=======================>>>>>>>>>>>>>", state.movies);
    //     })
    //     builder.addCase(searchMovies.rejected,(state, action)=>{
    //         state.loading = false;
    //         console.log("Error = ", action.payload);
    //         state.error = true;
    //     })
    // }

})

export default movieSlice.reducer;