import { configureStore } from "@reduxjs/toolkit";
import { branchReducer } from "./reducers/branchesReducer";
import { todosReducer } from "./reducers/todosReducer";



export const storeTodollo = configureStore({
    reducer: {
        todos: todosReducer,
        branches: branchReducer
    }
})
