import React, { useState } from "react"
import { addBranchType, addToDoType, BranchArr, TodosArr } from "../../types"
import Branch from "../branch/branch"
import './branchHolder.css'

interface BranchHolderProps {
    todos: TodosArr,
    branches: BranchArr,
    addToDo: addToDoType,
    addBranch: addBranchType
}

function BranchHolder(props: BranchHolderProps) {
    const [userInput, setInput] = useState('')

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.currentTarget.value)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (userInput.trim().length !== 0) {
            props.addBranch({
                branchName: userInput,
                branchCode: Math.random().toString(36).slice(2, 9)
            })
            setInput('')
        }
    }

    return (
        <div className="branchHolder">
            {props.branches.map((branch) => {
                return <Branch key={branch.branchCode} branch={branch} todos={props.todos} addToDo={props.addToDo} />
            })}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="New Branch" onChange={handleChange} value={userInput} />
                <button>Add</button>
            </form>
        </div>
    )
}

export default BranchHolder