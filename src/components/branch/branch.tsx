import React, { useMemo } from "react"
import { connect } from "react-redux"
import { createTodo, deleteTodo, doneTodo } from "../../redux/actions/actionsToDo"
import { useInputChange } from "../../redux/customHooks/useInputChange"
import { BranchType, TodosArr, TODO_UNDONE } from "../../types"
import Card from "../card/card"
import './branch.css'

interface BranchProps {
    branch: BranchType,
    todos: TodosArr,
    // addToDo: addToDoType
}


function Branch(props: any) {
    const inputTodo = useInputChange('')

    const filteredTodos = useMemo(() => {
        return props.todos.filter((todo: any) => todo.branch == props.branch.branchCode)
    }, [props.todos])

    function handleDelete() {
        filteredTodos.forEach((todo: any) => props.deleteTodo(todo.id))
        props.deleteBranch(props.branch.branchCode)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (inputTodo.value.trim().length !== 0) {
            props.createTodo({
                task: inputTodo.value,
                date: (new Date()).toLocaleDateString(),
                branch: props.branch.branchCode,
                id: Math.random().toString(36).slice(2, 9),
                status: TODO_UNDONE
            })
            inputTodo.setValue('')
        }
    }

    return (
        <div className="branch">
            <p className="branch_name">{props.branch.branchName}</p>
            <button onClick={handleDelete}>Delete</button>
            {filteredTodos && filteredTodos.map((todo: any) => {
                return <Card todo={todo} key={todo.id} deleteTodo={props.deleteTodo} doneTodo={props.doneTodo} />
            })}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="New Task..." onChange={inputTodo.onChange} value={inputTodo.value} />
                <button>Add</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createTodo: createTodo,
    deleteTodo: deleteTodo,
    doneTodo: doneTodo
}

const mapStateToProps = (state: any) => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Branch)
// export default Branch