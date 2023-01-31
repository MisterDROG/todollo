import { connect, ConnectedProps } from "react-redux"
import React from "react"
import Branch from "../branch/branch"
import './branchHolder.css'

import { useInputChange } from "../../redux/customHooks/useInputChange"
import { branchSlice } from "../../redux/reducers/branchesReducer"
import { RootState } from "../../types"

interface BranchHolderProps extends PropsFromRedux {
}

function BranchHolder(props: BranchHolderProps) {
    const inputBranch = useInputChange('')

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (inputBranch.value.trim().length !== 0) {
            props.createBranch({
                branchName: inputBranch.value,
                branchCode: Math.random().toString(36).slice(2, 9)
            })
            inputBranch.setValue('')
        }
    }

    return (
        <div className="branchHolder">
            {props.branches.map((branch) => {
                return <Branch key={branch.branchCode} branch={branch} deleteBranch={props.deleteBranch} />
            })}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="New Branch" onChange={inputBranch.onChange} value={inputBranch.value} />
                <button>Add</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createBranch: branchSlice.actions.createBranch,
    deleteBranch: branchSlice.actions.deleteBranch
}

const mapStateToProps = (state: RootState) => {
    return {
        branches: state.branches
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BranchHolder)