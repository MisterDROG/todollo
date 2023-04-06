import { createAction } from "@reduxjs/toolkit";
import { BranchType } from "../../utils/generalTypes";
import { CREATE_BRANCH, DELETE_BRANCH } from "../types";

// export function createBranch(branch: BranchType) {
//     return {
//         type: CREATE_BRANCH,
//         payload: branch
//     }
// }

// export function deleteBranch(branchCode: string) {
//     return {
//         type: DELETE_BRANCH,
//         payload: branchCode
//     }
// }

export const createBranch = createAction<BranchType>(CREATE_BRANCH)
export const deleteBranch = createAction<string>(DELETE_BRANCH)