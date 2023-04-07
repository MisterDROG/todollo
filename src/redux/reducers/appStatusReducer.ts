import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchType, TodoType } from "../../utils/generalTypes";
import { initialAppStatus } from "../initialStates";
import { getPostsThunk } from "../middlewares/thunks";
import { reOrderTodo } from "./todosReducer";

//app status slice uses for controling loading status and keeping context for the elements of the app
export const appStatusSlice = createSlice({
    name: 'appStatusSlice',
    initialState: initialAppStatus,
    reducers: {
        //sets to state data of currently dragging todo card
        setDraggedTodo(state, action: PayloadAction<TodoType>) {
            state.draggedTodo = action.payload
        },
        //sets to state data of todo card on whitch place you will put currently dragging card in this current time
        setReplacedTodo(state, action: PayloadAction<TodoType>) {
            state.replacedTodo = action.payload
        },
        //sets to null currently replaced todo card for situation when you put dragging todo card just to the free space of the branch
        //card in this case puts below all the cards of the branch
        setReplacedTodoNull(state, action: PayloadAction<null>) {
            state.replacedTodo = action.payload
        },
        //sets state of the app that shows that you currently drag a card
        setIsDragging(state, action: PayloadAction<boolean>) {
            state.isDragging = action.payload
        },
        //sets the current position of the dragging card relatively to replacing card (bottom of the card or top of the card)
        //needs to understand where to put card: above replacing card or below 
        setPutCardToBottom(state, action: PayloadAction<boolean>) {
            state.putCardToBottom = action.payload
        },
        //keeps track of which branch the dragging card is currently above to highlight it
        setEnteredBranch(state, action: PayloadAction<BranchType>) {
            state.enteredBranch = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            // controls loadings, errors and fulfilment state   
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
            //monitors reorder action in todo reducer and set to false process of dragging todos when it finishes
            .addCase(reOrderTodo, (state, action) => {
                state.isDragging = false
            })
    }
})

export const { setDraggedTodo, setReplacedTodo, setReplacedTodoNull, setIsDragging, setPutCardToBottom, setEnteredBranch } = appStatusSlice.actions