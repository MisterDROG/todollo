import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAppStatus } from "../initialStates";
import { getBranchesThunk, getPostsThunk } from "../middlewares/thunks";

export const appStatusSlice = createSlice({
    name: 'appStatusSlice',
    initialState: initialAppStatus,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsThunk.pending, (state, action) => {
                state.status = 'Loading...'
                state.error = null
            })
            .addCase(getPostsThunk.fulfilled, (state, action) => {
                state.status = 'Download resolved'
                state.error = null
            })
            .addCase(getPostsThunk.rejected, (state, action) => {
                state.status = 'Download rejected'
                state.error = action.payload
            })
            .addCase(getBranchesThunk.pending, (state, action) => {
                state.status = 'Loading...'
                state.error = null
            })
            .addCase(getBranchesThunk.fulfilled, (state, action) => {
                state.status = 'Download resolved'
                state.error = null
            })
            .addCase(getBranchesThunk.rejected, (state, action) => {
                state.status = 'Download rejected'
                state.error = action.payload
            })
    }
})