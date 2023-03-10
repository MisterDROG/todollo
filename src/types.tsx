import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { storeTodollo } from "./redux/store";
import APItodollo from "./utils/APItodollo";

export const TODO_DONE = 'Done'
export const TODO_UNDONE = 'unDone'

export type TodoType = {
    task: string;
    date: string;
    branch: string
    id: string,
    status: string
}

export type TodosArr = TodoType[]

export type BranchType = {
    branchName: string,
    branchCode: string
}

export type BranchArr = BranchType[]

export type AppStatus = {
    status: null | string
    error: null | string | undefined
}

export type APItodolloType = typeof APItodollo

export type addToDoType = (input: TodoType) => void

export type addBranchType = (input: BranchType) => void

export type GetStateType = typeof storeTodollo.getState

export type RootState = ReturnType<typeof storeTodollo.getState>

export type AppDispatch = typeof storeTodollo.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector