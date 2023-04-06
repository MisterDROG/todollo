import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchType, TodoType } from "../../utils/generalTypes";
import { initialAppStatus } from "../initialStates";
import { getPostsThunk } from "../middlewares/thunks";
import { reOrderTodo } from "./todosReducer";

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
        },
        setIsDragging(state, action: PayloadAction<boolean>) {
            state.isDragging = action.payload
        },
        setPutCardToBottom(state, action: PayloadAction<boolean>) {
            state.putCardToBottom = action.payload
        },
        setEnteredBranch(state, action: PayloadAction<BranchType>) {
            state.enteredBranch = action.payload
        },

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
            .addCase(reOrderTodo, (state, action) => {
                state.isDragging = false
            })
    }
})

export const { setDraggedTodo, setReplacedTodo, setReplacedTodoNull, setIsDragging, setPutCardToBottom, setEnteredBranch } = appStatusSlice.actions