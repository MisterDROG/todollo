import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BranchArr, BranchType } from "../../utils/generalTypes";

//crateApi for branch reducers

//for branches used Query istead of slices for easy control of loading status and cache control (in future todos slice also should be transfered)
//for cache control invalidating tags are used
export const branchApi = createApi({
    reducerPath: 'branchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://todollo-default-rtdb.firebaseio.com/' }),
    tagTypes: ['Branches'],
    endpoints: (builder) => ({
        //get all branches query
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
        //create branch mutation
        createBranchRTK: builder.mutation<void, BranchType>({
            query: (branch) => ({
                url: 'branches.json',
                method: 'POST',
                body: branch
            }),
            invalidatesTags: [{ type: 'Branches', id: 'LIST' }]
        }),
        //delete branch mutation
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

