import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, BranchType, GetStateType, TodoType } from "../../types"
import { createBranch, deleteBranch, getAllBranches } from "../reducers/branchesReducer"
import { createTodo, deleteTodo, doneTodo, getAllTodos } from "../reducers/todosReducer"


export const getPostsThunk = createAsyncThunk(
    'posts/getPosts',
    async (_, { dispatch, extra, rejectWithValue }) => {
        const { APItodollo } = extra as any
        try {
            const response = await APItodollo.getData('https://todollo-default-rtdb.firebaseio.com/todos.json')
            if (response == 'error') {
                throw new Error('Error while getting')
            }
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)

export function getPostsThunk0() {
    return async (dispatch: AppDispatch, extraArgument: any) => {
        const { APItodollo } = extraArgument
        const response = await APItodollo.getData('https://todollo-default-rtdb.firebaseio.com/todos.json')
        dispatch(getAllTodos(response))
    }
}

export function createTodoThunk(payload: TodoType) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: any) => {
        const { APItodollo } = extraArgument
        dispatch(createTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

export function deleteTodoThunk(payload: string) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: any) => {
        const { APItodollo } = extraArgument
        dispatch(deleteTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

export function doneTodoThunk(payload: string) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: any) => {
        const { APItodollo } = extraArgument
        dispatch(doneTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

export function getBranchesThunk() {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: any) => {
        const { APItodollo } = extraArgument
        const response = await APItodollo.getData('https://todollo-default-rtdb.firebaseio.com/branches.json')
        dispatch(getAllBranches(response))
    }
}

export function createBranchThunk(payload: BranchType) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: any) => {
        const { APItodollo } = extraArgument
        dispatch(createBranch(payload))
        const state = getState().branches
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/branches.json`, state)
    }
}

export function deleteBranchThunk(payload: string) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: any) => {
        const { APItodollo } = extraArgument
        dispatch(deleteBranch(payload))
        const state = getState().branches
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/branches.json`, state)
    }
}