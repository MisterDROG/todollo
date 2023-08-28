import { Middleware } from "redux";

//middleware for logging state actions (analog of Redux DevTools)

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    // console.log('action', action)

    // console.log('before', store.getState())

    let result = next(action)

    // console.log('after', store.getState())

    return result
}