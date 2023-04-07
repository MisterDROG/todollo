import { createAsyncThunk } from "@reduxjs/toolkit"
import { APItodolloType, AppDispatch, BranchType, GetStateType, TodosArr, TodoType } from "../../utils/generalTypes"
import { createTodo, deleteTodo, doneTodo, reOrderTodo } from "../reducers/todosReducer"

// module for all thunks of the app

//thunk for loading todos from the database (uses createAsyncThunk for controling status of the app through extrareducers: loading, fulfilled, error)
export const getPostsThunk = createAsyncThunk<
    TodosArr,
    void,
    {
        extra: { APItodollo: APItodolloType },
        rejectValue: string,
    }
>(
    'posts/getPosts',
    async (_, { extra, rejectWithValue }) => {
        const { APItodollo } = extra
        try {
            const response = await APItodollo.getData('https://todollo-default-rtdb.firebaseio.com/todos.json')
            return response as TodosArr
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

//thunk for creating todo and push it to the database
//(first changes state then pushes all state to DB. Not very good implementation for stability, but provides good and fast user experience. Need to be improved by creating catching errors logic)
export function createTodoThunk(payload: TodoType) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
        const { APItodollo } = extraArgument
        dispatch(createTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

//thunk for deleting todo in the database
export function deleteTodoThunk(payload: TodoType) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
        const { APItodollo } = extraArgument
        dispatch(deleteTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

//thunk for changing work-status of todo in the database
export function doneTodoThunk(payload: string) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
        const { APItodollo } = extraArgument
        dispatch(doneTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

//thunk for drag&drop reorder of todos in the database
export function reOrderTodoThunk(payload: { replacedTodo: TodoType | null, draggedTodo: TodoType, enteredBranch: BranchType, putCardToBottom: true | false }) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
        const { APItodollo } = extraArgument
        dispatch(reOrderTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}