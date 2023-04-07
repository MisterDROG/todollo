import { AppStatus, BranchArr, TodosArr } from "../utils/generalTypes";

// module for all initial states of the app

//initial states for todos reducer (uses as preloading state)
export const initialTodos: TodosArr = [
    { task: 'Loading...', date: 'loading...', branch: 'house', id: '1', status: 'unDone', order: 1 },
    { task: 'Loading...', date: 'loading...', branch: 'house', id: '2', status: 'unDone', order: 2 },
    { task: 'Loading...', date: 'loading...', branch: 'house', id: '3', status: 'unDone', order: 3 },
    { task: 'Loading...', date: 'loading...', branch: 'work', id: '4', status: 'unDone', order: 4 },
    { task: 'Loading...', date: 'loading...', branch: 'work', id: '5', status: 'unDone', order: 5 },
    { task: 'Loading...', date: 'loading...', branch: 'work', id: '6', status: 'unDone', order: 6 },
    { task: 'Loading...', date: 'loading...', branch: 'sport', id: '7', status: 'unDone', order: 7 },
    { task: 'Loading...', date: 'loading...', branch: 'sport', id: '8', status: 'unDone', order: 8 },
    { task: 'Loading...', date: 'loading...', branch: 'sport', id: '9', status: 'unDone', order: 9 },
]

//initial states for branches reducer (uses as preloading state)
export const initialBranches: BranchArr = [
    { branchName: 'Loading...', branchCode: 'house' },
    { branchName: 'Loading...', branchCode: 'work' },
    { branchName: 'Loading...', branchCode: 'sport' },
]

//initial states for app status reducer 
//The purpose of all variables is described in the module with the application status slice
export const initialAppStatus: AppStatus = {
    status: null,
    error: null,
    draggedTodo: null,
    replacedTodo: null,
    enteredBranch: null,
    isDragging: false,
    putCardToBottom: false
}

