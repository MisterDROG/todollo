import { configureStore } from "@reduxjs/toolkit";
import { branchSlice } from "./reducers/branchesReducer";
import { todoSlice } from "./reducers/todosReducer";



export const storeTodollo = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        branches: branchSlice.reducer
    }
})
