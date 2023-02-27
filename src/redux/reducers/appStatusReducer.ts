import { createSlice } from "@reduxjs/toolkit";
import { initialAppStatus } from "../initialStates";
import { getPostsThunk } from "../middlewares/thunks";

export const appStatusSlice = createSlice({
    name: 'appStatusSlice',
    initialState: initialAppStatus,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsThunk.pending, (state, action) => {

            })
            .addCase(getPostsThunk.fulfilled, (state, action) => {
                state = action.payload
            })
            .addCase(getPostsThunk.rejected, (state, action) => {

            })
    }
})