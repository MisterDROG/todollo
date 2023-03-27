import { AppStatus, BranchArr, TodosArr } from "../types";

export const initialTodos: TodosArr = [
    { task: 'clean floor', date: '01.02.22', branch: 'house', id: '1', status: 'unDone', order: 1 },
    { task: 'cook food', date: '15.05.22', branch: 'house', id: '2', status: 'unDone', order: 2 },
    { task: 'wash dishes', date: '23.09.22', branch: 'house', id: '3', status: 'unDone', order: 3 },
    { task: 'write program', date: '11.03.22', branch: 'work', id: '4', status: 'unDone', order: 4 },
    { task: 'work with exel', date: '16.04.22', branch: 'work', id: '5', status: 'unDone', order: 5 },
    { task: 'send email', date: '07.05.22', branch: 'work', id: '6', status: 'unDone', order: 6 },
    { task: 'do squads', date: '06.04.22', branch: 'sport', id: '7', status: 'unDone', order: 7 },
    { task: 'buy a ball', date: '22.11.22', branch: 'sport', id: '8', status: 'unDone', order: 8 },
    { task: 'upgrade bike', date: '17.12.22', branch: 'sport', id: '9', status: 'unDone', order: 9 },
]

export const initialBranches: BranchArr = [
    { branchName: 'house', branchCode: 'house' },
    { branchName: 'work', branchCode: 'work' },
    { branchName: 'sport', branchCode: 'sport' },
]

export const initialAppStatus: AppStatus = {
    status: null,
    error: null,
    draggedTodo: null,
    replacedTodo: null,
    enteredBranch: null,
}

