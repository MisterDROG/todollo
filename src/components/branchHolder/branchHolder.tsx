import { connect } from "react-redux"
import React, { useState } from "react"
import Branch from "../branch/branch"
import './branchHolder.css'
import { createBranch, deleteBranch } from "../../redux/actions/actionBranches"
import { useInputChange } from "../../redux/customHooks/useInputChange"
import { branchSlice } from "../../redux/reducers/branchesReducer"

interface BranchHolderProps {
}

function BranchHolder(props: any) {
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
            {props.branches.map((branch: any) => {
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

const mapStateToProps = (state: any) => {
    return {
        branches: state.branches
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchHolder)