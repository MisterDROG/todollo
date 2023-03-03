import { configureStore } from "@reduxjs/toolkit";
import APItodollo from "../utils/APItodollo";
import { loggerMiddleware } from "./middlewares/logger";
import { appStatusSlice } from "./reducers/appStatusReducer";
import { branchApi } from "./reducers/branchesReducer";
import { todoSlice } from "./reducers/todosReducer";

export const storeTodollo = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        [branchApi.reducerPath]: branchApi.reducer,
        appStatus: appStatusSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: { APItodollo },
        }
    }).concat(loggerMiddleware, branchApi.middleware)
})
