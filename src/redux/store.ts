import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "./middlewares/logger";
import { branchSlice } from "./reducers/branchesReducer";
import { todoSlice } from "./reducers/todosReducer";



export const storeTodollo = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        branches: branchSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
})
