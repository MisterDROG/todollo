import { BranchType } from "../../types";
import { CREATE_BRANCH, DELETE_BRANCH } from "../types";

export function createBranch(branch: BranchType) {
    return {
        type: CREATE_BRANCH,
        payload: branch
    }
}

export function deleteBranch(branchCode: string) {
    return {
        type: DELETE_BRANCH,
        payload: branchCode
    }
}