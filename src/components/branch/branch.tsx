import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import React, { useMemo } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useInputChange } from "../../redux/customHooks/useInputChange"
import { createTodoThunk, deleteBranchThunk, getPostsThunk } from "../../redux/middlewares/thunks"
import { todoSlice } from "../../redux/reducers/todosReducer"
import { useAppDispatch } from "../../redux/store"
import { BranchType, RootState, TODO_UNDONE } from "../../types"
import Card from "../card/card"
import './branch.css'

interface BranchProps extends PropsFromRedux {
    branch: BranchType,
}


function Branch(props: BranchProps) {
    const inputTodo = useInputChange('')
    const dispatch = useAppDispatch()

    const filteredTodos = useMemo(() => {
        return props.todos.filter((todo) => todo.branch == props.branch.branchCode)
    }, [props.todos])

    function handleDelete() {
        filteredTodos.forEach((todo) => props.deleteTodo(todo.id))
        dispatch(deleteBranchThunk(props.branch.branchCode))
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (inputTodo.value.trim().length !== 0) {
            dispatch(createTodoThunk({
                task: inputTodo.value,
                date: (new Date()).toLocaleDateString(),
                branch: props.branch.branchCode,
                id: Math.random().toString(36).slice(2, 9),
                status: TODO_UNDONE
            }))
            inputTodo.setValue('')
        }
    }

    return (
        <div className="branch">
            <p className="branch_name">{props.branch.branchName}</p>
            <button onClick={handleDelete}>Delete</button>
            {filteredTodos && filteredTodos.map((todo) => {
                return <Card todo={todo} key={todo.id} />
            })}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="New Task..." onChange={inputTodo.onChange} value={inputTodo.value} />
                <button>Add</button>
            </form>
            <button onClick={() => dispatch(getPostsThunk())}>GetPosts</button>
        </div>
    )
}

const mapDispatchToProps = {
    createTodo: todoSlice.actions.createTodo,
    deleteTodo: todoSlice.actions.deleteTodo,
    doneTodo: todoSlice.actions.doneTodo
}

const mapStateToProps = (state: RootState) => {
    return {
        todos: state.todos
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Branch)