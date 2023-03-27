import { DragEvent } from 'react'
import React, { useMemo } from "react"
import { useInputChange } from "../../redux/customHooks/useInputChange"
import { createTodoThunk, deleteTodoThunk, getPostsThunk, reOrderTodoThunk } from "../../redux/middlewares/thunks"
import { useDeleteBranchRTKMutation } from "../../redux/reducers/branchesReducer"
import { BranchType, TodoType, TODO_UNDONE, useAppDispatch, useAppSelector } from "../../types"
import Card from "../card/card"
import './branch.css'
import { setReplacedTodoNull } from '../../redux/reducers/appStatusReducer'

interface BranchProps {
    branch: BranchType,
}

function Branch(props: BranchProps) {
    const inputTodo = useInputChange('')
    const stateTodos = useAppSelector((state) => state.todos)
    const dispatch = useAppDispatch()
    const [deleteBranchRTK, { isError: isErrorDelete, isLoading: isLoadingDelete }] = useDeleteBranchRTKMutation()

    const draggedTodo = useAppSelector(state => state.appStatus.draggedTodo)
    const replacedTodo = useAppSelector(state => state.appStatus.replacedTodo)

    const filteredTodos = useMemo(() => {
        const filteredTodos = stateTodos.filter((todo) => todo.branch == props.branch.branchCode)
        return filteredTodos.sort((a, b) => a.order - b.order)
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
                status: TODO_UNDONE,
                order: filteredTodos.length + 1
            }))
            inputTodo.setValue('')
        }
    }
    function dragEnterHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        // dispatch(setReplacedTodoNull(null))
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
        e.currentTarget.style.backgroundColor = "white"
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        e.currentTarget.style.backgroundColor = "grey"
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, branch: BranchType): void {
        e.preventDefault()
        e.currentTarget.style.backgroundColor = "white"
        dispatch(reOrderTodoThunk({ replacedTodo: replacedTodo as TodoType, draggedTodo: draggedTodo as TodoType, enteredBranch: branch }))
    }

    return (
        <div className="branch"
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnter={(e) => dragEnterHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, props.branch)}>
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