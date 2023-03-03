import React, { useMemo } from "react"
import { useInputChange } from "../../redux/customHooks/useInputChange"
import { createTodoThunk, deleteTodoThunk, getPostsThunk } from "../../redux/middlewares/thunks"
import { useDeleteBranchRTKMutation } from "../../redux/reducers/branchesReducer"
import { BranchType, TODO_UNDONE, useAppDispatch, useAppSelector } from "../../types"
import Card from "../card/card"
import './branch.css'

interface BranchProps {
    branch: BranchType,
}

function Branch(props: BranchProps) {
    const inputTodo = useInputChange('')
    const stateTodos = useAppSelector((state) => state.todos)
    const dispatch = useAppDispatch()
    const [deleteBranchRTK, { isError: isErrorDelete, isLoading: isLoadingDelete }] = useDeleteBranchRTKMutation()

    const filteredTodos = useMemo(() => {
        return stateTodos.filter((todo) => todo.branch == props.branch.branchCode)
    }, [stateTodos])

    function handleDelete() {
        filteredTodos.forEach((todo) => dispatch(deleteTodoThunk(todo.id)))
        deleteBranchRTK(props.branch.branchCode)
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


export default Branch