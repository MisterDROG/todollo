import { createAction, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchArr, BranchType } from "../../types";
import { initialBranches } from "../initialStates";
import { getBranchesThunk } from "../middlewares/thunks";
import { CREATE_BRANCH, DELETE_BRANCH } from "../types";

// export function branchReducer(state: BranchArr = initialBranches, action: any) {
//     switch (action.type) {
//         case CREATE_BRANCH:
//             return [...state, action.payload]
//         case DELETE_BRANCH:
//             return state.filter((branch) => branch.branchCode !== action.payload)
//         default: return state
//     }
// }

// export const branchReducer = createReducer(initialBranches, (builder) => {
//     builder
//         .addCase(createBranch, (state, action) => [...state, action.payload])
//         .addCase(deleteBranch, (state, action) => state.filter((branch) => branch.branchCode !== action.payload))
//         .addDefaultCase((state, action) => state)
// })

export const branchSlice = createSlice({
    name: 'branchSlice',
    initialState: initialBranches,
    reducers: {
        getAllBranches(state, action: PayloadAction<BranchArr>) {
            return action.payload
        },
        createBranch(state, action: PayloadAction<BranchType>) {
            state.push(action.payload)
        },
        deleteBranch(state, action: PayloadAction<string>) {
            state.splice(state.findIndex(((branch) => branch.branchCode === action.payload)), 1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBranchesThunk.fulfilled, (state, action: PayloadAction<BranchArr>) => {
                state = action.payload
            })
    }
})

export const { getAllBranches, createBranch, deleteBranch } = branchSlice.actions

