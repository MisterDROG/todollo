import APItodollo from "./APItodollo";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { storeTodollo } from "../redux/store";

//all types for the application

export const TODO_DONE = 'Done'
export const TODO_UNDONE = 'unDone'

export type TodoType = {
    task: string;
    date: string;
    branch: string
    id: string,
    status: string,
    order: number
}

export type BranchType = {
    branchName: string,
    branchCode: string
}

export type TodosArr = TodoType[]

export type BranchArr = BranchType[]

export type AppStatus = {
    status: null | string,
    error: null | string | undefined,
    draggedTodo: null | TodoType,
    replacedTodo: null | TodoType,
    enteredBranch: null | BranchType,
    isDragging: true | false,
    putCardToBottom: true | false,
}

export type APItodolloType = typeof APItodollo

export type GetStateType = typeof storeTodollo.getState

export type RootState = ReturnType<typeof storeTodollo.getState>

export type AppDispatch = typeof storeTodollo.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector