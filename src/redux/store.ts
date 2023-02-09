import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import APItodollo from "../utils/APItodollo";
import { loggerMiddleware } from "./middlewares/logger";
import { branchSlice } from "./reducers/branchesReducer";
import { todoSlice } from "./reducers/todosReducer";



export const storeTodollo = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        branches: branchSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: { APItodollo },
        }
    }).concat(loggerMiddleware)
})

export type AppDispatch = typeof storeTodollo.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch