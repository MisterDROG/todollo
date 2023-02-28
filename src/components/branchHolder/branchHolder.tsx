import React, { useEffect } from "react"
import Branch from "../branch/branch"
import './branchHolder.css'
import { useInputChange } from "../../redux/customHooks/useInputChange"
import { useAppDispatch, useAppSelector } from "../../types"
import { createBranchThunk, getBranchesThunk, getPostsThunk } from "../../redux/middlewares/thunks"

interface BranchHolderProps {
}

function BranchHolder(props: BranchHolderProps) {

    const inputBranch = useInputChange('')
    const stateBranches = useAppSelector((state) => state.branches)
    const stateAppStatus = useAppSelector((state) => state.appStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getBranchesThunk())
        dispatch(getPostsThunk())
    }, [])


    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (inputBranch.value.trim().length !== 0) {
            dispatch(createBranchThunk({
                branchName: inputBranch.value,
                branchCode: Math.random().toString(36).slice(2, 9)
            }))
            inputBranch.setValue('')
        }
    }

    return (
        <div className="branchHolder">
            {(stateAppStatus.status == 'Loading...') && <h1>{stateAppStatus.status}</h1>}
            {stateAppStatus.error && <h1>{stateAppStatus.error}</h1>}
            {stateBranches.map((branch) => {
                return <Branch key={branch.branchCode} branch={branch} />
            })}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="New Branch" onChange={inputBranch.onChange} value={inputBranch.value} />
                <button>Add</button>
            </form>
        </div>
    )
}

export default BranchHolder