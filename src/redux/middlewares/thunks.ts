import { createAsyncThunk } from "@reduxjs/toolkit"
import { APItodolloType, AppDispatch, BranchType, GetStateType, TodosArr, TodoType } from "../../types"
import { createTodo, deleteTodo, doneTodo, reOrderTodo } from "../reducers/todosReducer"

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

export function createTodoThunk(payload: TodoType) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
        const { APItodollo } = extraArgument
        dispatch(createTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

export function deleteTodoThunk(payload: TodoType) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
        const { APItodollo } = extraArgument
        dispatch(deleteTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

export function doneTodoThunk(payload: string) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
        const { APItodollo } = extraArgument
        dispatch(doneTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

export function reOrderTodoThunk(payload: { replacedTodo: TodoType | null, draggedTodo: TodoType, enteredBranch: BranchType, putCardToBottom: true | false }) {
    return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
        const { APItodollo } = extraArgument
        dispatch(reOrderTodo(payload))
        const state = getState().todos
        await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/todos.json`, state)
    }
}

// export function getPostsThunk() {
//     return async (dispatch: AppDispatch, extraArgument: any) => {
//         const { APItodollo } = extraArgument
//         const response = await APItodollo.getData('https://todollo-default-rtdb.firebaseio.com/todos.json')
//         dispatch(getAllTodos(response))
//     }
// }

// export const getBranchesThunk = createAsyncThunk<
//     BranchArr,
//     void,
//     {
//         extra: { APItodollo: APItodolloType },
//         rejectValue: string
//     }
// >(
//     'posts/getBranches',
//     async (_, { extra, rejectWithValue }) => {
//         const { APItodollo } = extra
//         try {
//             const response = await APItodollo.getData('https://todollo-default-rtdb.firebaseio.com/branches.json')
//             return response as BranchArr
//         } catch (error: any) {
//             return rejectWithValue(error.message)
//         }
//     }
// )

// export function getBranchesThunk() {
//     return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: any) => {
//         const { APItodollo } = extraArgument
//         const response = await APItodollo.getData('https://todollo-default-rtdb.firebaseio.com/branches.json')
//         dispatch(getAllBranches(response))
//     }
// }

// export function createBranchThunk(payload: BranchType) {
//     return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
//         const { APItodollo } = extraArgument
//         dispatch(createBranch(payload))
//         const state = getState().branches
//         await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/branches.json`, state)
//     }
// }

// export function deleteBranchThunk(payload: string) {
//     return async (dispatch: AppDispatch, getState: GetStateType, extraArgument: { APItodollo: APItodolloType }) => {
//         const { APItodollo } = extraArgument
//         dispatch(deleteBranch(payload))
//         const state = getState().branches
//         await APItodollo.sendData(`https://todollo-default-rtdb.firebaseio.com/branches.json`, state)
//     }
// }