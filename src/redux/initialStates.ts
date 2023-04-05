import { AppStatus, BranchArr, TodosArr } from "../types";

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

export const initialBranches: BranchArr = [
    { branchName: 'Loading...', branchCode: 'house' },
    { branchName: 'Loading...', branchCode: 'work' },
    { branchName: 'Loading...', branchCode: 'sport' },
]

export const initialAppStatus: AppStatus = {
    status: null,
    error: null,
    draggedTodo: null,
    replacedTodo: null,
    enteredBranch: null,
    isDragging: false,
    putCardToBottom: false
}

