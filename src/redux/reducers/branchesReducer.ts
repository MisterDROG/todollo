import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BranchArr, BranchType } from "../../utils/generalTypes";

export const branchApi = createApi({
    reducerPath: 'branchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://todollo-default-rtdb.firebaseio.com/' }),
    tagTypes: ['Branches'],
    endpoints: (builder) => ({
        getBranchesRTK: builder.query<BranchArr, void>({
            query: () => 'branches.json',
            transformResponse: (response: any) => Object.keys(response).map((key) => {
                return { branchCode: key, branchName: response[key].branchName }
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.map(({ branchCode }) => ({ type: 'Branches', id: branchCode } as const)),
                    { type: 'Branches', id: 'LIST' },
                ]
                :
                [{ type: 'Branches', id: 'LIST' }],
        }),
        createBranchRTK: builder.mutation<void, BranchType>({
            query: (branch) => ({
                url: 'branches.json',
                method: 'POST',
                body: branch
            }),
            invalidatesTags: [{ type: 'Branches', id: 'LIST' }]
        }),
        deleteBranchRTK: builder.mutation<void, string>({
            query: (branchCode) => ({
                url: `branches/${branchCode}.json`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, branchCode) => [{ type: 'Branches', id: branchCode }]
        })

    })
})

export const { useGetBranchesRTKQuery, useCreateBranchRTKMutation, useDeleteBranchRTKMutation } = branchApi

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

// export const branchSlice = createSlice({
//     name: 'branchSlice',
//     initialState: initialBranches,
//     reducers: {
//         getAllBranches(state, action: PayloadAction<BranchArr>) {
//             return action.payload
//         },
//         createBranch(state, action: PayloadAction<BranchType>) {
//             state.push(action.payload)
//         },
//         deleteBranch(state, action: PayloadAction<string>) {
//             state.splice(state.findIndex(((branch) => branch.branchCode === action.payload)), 1)
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getBranchesThunk.fulfilled, (state, action: PayloadAction<BranchArr>) => {
//                 state = action.payload
//             })
//     }
// })

// export const { getAllBranches, createBranch, deleteBranch } = branchSlice.actions

