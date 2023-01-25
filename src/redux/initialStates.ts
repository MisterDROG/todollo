import { BranchArr, TodosArr } from "../types";

export const initialTodos: TodosArr = [
    { task: 'clean floor', date: '01.02.22', branch: 'house', id: '1', status: 'unDone' },
    { task: 'cook food', date: '15.05.22', branch: 'house', id: '2', status: 'unDone' },
    { task: 'wash dishes', date: '23.09.22', branch: 'house', id: '3', status: 'unDone' },
    { task: 'write program', date: '11.03.22', branch: 'work', id: '4', status: 'unDone' },
    { task: 'work with exel', date: '16.04.22', branch: 'work', id: '5', status: 'unDone' },
    { task: 'send email', date: '07.05.22', branch: 'work', id: '6', status: 'unDone' },
    { task: 'do squads', date: '06.04.22', branch: 'sport', id: '7', status: 'unDone' },
    { task: 'buy a ball', date: '22.11.22', branch: 'sport', id: '8', status: 'unDone' },
    { task: 'upgrade bike', date: '17.12.22', branch: 'sport', id: '9', status: 'unDone' },
]

export const initialBranches: BranchArr = [
    { branchName: 'house', branchCode: 'house' },
    { branchName: 'work', branchCode: 'work' },
    { branchName: 'sport', branchCode: 'sport' },
]