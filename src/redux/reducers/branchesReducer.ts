import { createAction, createReducer } from "@reduxjs/toolkit";
import { BranchArr, BranchType } from "../../types";
import { createBranch, deleteBranch } from "../actions/actionBranches";
import { initialBranches } from "../initialStates";
import { CREATE_BRANCH, DELETE_BRANCH } from "../types";

// export function branchReducer1(state: BranchArr = initialBranches, action: any) {
//     switch (action.type) {
//         case CREATE_BRANCH:
//             return [...state, action.payload]
//         case DELETE_BRANCH:
//             return state.filter((branch) => branch.branchCode !== action.payload)
//         default: return state
//     }
// }

export const branchReducer = createReducer(initialBranches, (builder) => {
    builder
        .addCase(createBranch, (state, action) => [...state, action.payload])
        .addCase(deleteBranch, (state, action) => state.filter((branch) => branch.branchCode !== action.payload))
        .addDefaultCase((state, action) => state)
})
