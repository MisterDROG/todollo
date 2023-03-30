import React, { useEffect } from "react"
import Branch from "../branch/branch"
import './branchHolder.scss'
import { useInputChange } from "../../redux/customHooks/useInputChange"
import { useAppDispatch, useAppSelector } from "../../types"
import { getPostsThunk } from "../../redux/middlewares/thunks"
import { useCreateBranchRTKMutation, useGetBranchesRTKQuery } from "../../redux/reducers/branchesReducer"

interface BranchHolderProps {
}

function BranchHolder(props: BranchHolderProps) {

    const inputBranch = useInputChange('')
    const stateAppStatus = useAppSelector((state) => state.appStatus)
    const { data: branchesRTK, error, isLoading: isLoadingGet } = useGetBranchesRTKQuery()
    const [createBranchRTK, { isError: isErrorCreate, isLoading: isLoadingCreate }] = useCreateBranchRTKMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPostsThunk())
    }, [])


    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (inputBranch.value.trim().length !== 0) {
            createBranchRTK({
                branchName: inputBranch.value,
                branchCode: Math.random().toString(36).slice(2, 9)
            })
            inputBranch.setValue('')
        }
    }

    return (
        <div className="branch-holder">
            {(stateAppStatus.status == 'Loading...') && <h1 className="branch-holder__loading">{stateAppStatus.status}</h1>}
            {stateAppStatus.error && <h1 className="branch-holder__error">{stateAppStatus.error}</h1>}
            {branchesRTK && branchesRTK.map((branch) => {
                return <Branch key={branch.branchCode} branch={branch} />
            })}
            <form className="branch-holder__form-new-branch" onSubmit={handleSubmit}>
                <input className="branch-holder__input-new-branch" type='text' placeholder="New Branch..." onChange={inputBranch.onChange} value={inputBranch.value} />
                <button className="branch-holder__button-add-branch">Add</button>
            </form>
        </div>
    )
}

export default BranchHolder