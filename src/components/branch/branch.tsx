import React, { useState } from "react"
import { addToDoType, BranchType, TodosArr } from "../../types"
import Card from "../card/card"
import './branch.css'

interface BranchProps {
    branch: BranchType,
    todos: TodosArr,
    addToDo: addToDoType
}

function Branch(props: BranchProps) {

    const [userInput, setUserInput] = useState('')

    const filteredTodos = props.todos.filter((todo) => todo.branch == props.branch.branchCode)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUserInput(event.currentTarget.value)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (userInput.trim().length !== 0) {
            props.addToDo({
                task: userInput,
                date: (new Date()).toLocaleDateString(),
                branch: props.branch.branchCode,
                id: Math.random().toString(36).slice(2, 9)
            })
            setUserInput('')
        }
    }

    return (
        <div className="branch">
            <p className="branch_name">{props.branch.branchName}</p>
            {filteredTodos && filteredTodos.map((todo) => {
                return <Card todo={todo} key={todo.id} />
            })}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="New Task..." onChange={handleChange} value={userInput} />
                <button>Add</button>
            </form>
        </div>
    )
}

export default Branch