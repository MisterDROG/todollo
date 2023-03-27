import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../../types";
import { initialAppStatus } from "../initialStates";
import { getPostsThunk } from "../middlewares/thunks";

export const appStatusSlice = createSlice({
    name: 'appStatusSlice',
    initialState: initialAppStatus,
    reducers: {
        setDraggedTodo(state, action: PayloadAction<TodoType>) {
            state.draggedTodo = action.payload
        },
        setReplacedTodo(state, action: PayloadAction<TodoType>) {
            state.replacedTodo = action.payload
        },
        setReplacedTodoNull(state, action: PayloadAction<null>) {
            state.replacedTodo = action.payload
        }
    },
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
    }
})

export const { setDraggedTodo, setReplacedTodo, setReplacedTodoNull } = appStatusSlice.actions