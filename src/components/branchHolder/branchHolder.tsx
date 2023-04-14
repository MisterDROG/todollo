import './branchHolder.scss'
import Branch from "../branch/branch"
import React, { useEffect } from "react"
import { useInputChange } from "../../utils/customHooks/useInputChange"
import { useAppDispatch, useAppSelector } from "../../utils/generalTypes"
import { getPostsThunk } from "../../redux/middlewares/thunks"
import { useCreateBranchRTKMutation, useGetBranchesRTKQuery } from "../../redux/reducers/branchesReducer"
import { initialBranches } from "../../redux/initialStates"

//element for handling branches with todos

function BranchHolder() {

    const dispatch = useAppDispatch()
    const stateAppStatus = useAppSelector((state) => state.appStatus)

    const inputBranch = useInputChange('')

    const { data: branchesRTK, isLoading: isLoadingGet } = useGetBranchesRTKQuery()
    const [createBranchRTK, { isLoading: isLoadingCreate }] = useCreateBranchRTKMutation()


    useEffect(() => {
        dispatch(getPostsThunk())
    }, [])


    function handleSubmitCreateBranch(event: React.FormEvent) {
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
            {stateAppStatus.error && <h1 className="branch-holder__error">{'Error: ' + stateAppStatus.error + '!'}</h1>}
            {isLoadingGet && initialBranches.map((branch) => {
                return <Branch key={branch.branchCode} branch={branch} />
            })}
            {branchesRTK && branchesRTK.map((branch) => {
                return <Branch key={branch.branchCode} branch={branch} />
            })}
            {isLoadingCreate && <Branch branch={{ branchName: 'Loading...', branchCode: 'Loading' }} />}
            {!stateAppStatus.error &&
                <form className="branch-holder__form-new-branch" onSubmit={handleSubmitCreateBranch}>
                    <input className="branch-holder__input-new-branch" type='text' placeholder="New Branch..." onChange={inputBranch.onChange} value={inputBranch.value} />
                    <button className="branch-holder__button-add-branch">Add</button>
                </form>}
        </div>
    )
}

export default BranchHolder