import { BranchArr } from "../../types";
import { initialBranches } from "../initialStates";
import { CREATE_BRANCH, DELETE_BRANCH } from "../types";

export function branchReducer(state: BranchArr = initialBranches, action: any) {
    switch (action.type) {
        case CREATE_BRANCH:
            return [...state, action.payload]
        case DELETE_BRANCH:
            return state.filter((branch) => branch.branchCode !== action.payload)
        default: return state
    }
}