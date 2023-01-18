export type TodoType = {
    task: string;
    date: string;
    branch: string
    id: string
}

export type TodosArr = TodoType[]

export type BranchType = {
    branchName: string,
    branchCode: string
}

export type BranchArr = BranchType[]

export type addToDoType = (input: TodoType) => void

export type addBranchType = (input: BranchType) => void