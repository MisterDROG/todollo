import './branch.scss'
import Card from "../card/card"
import React, { useMemo } from "react"
import { DragEvent } from 'react'
import { useInputChange } from "../../utils/customHooks/useInputChange"
import { createTodoThunk, deleteTodoThunk, reOrderTodoThunk } from "../../redux/middlewares/thunks"
import { useDeleteBranchRTKMutation } from "../../redux/reducers/branchesReducer"
import { BranchType, TodoType, TODO_UNDONE, useAppDispatch, useAppSelector } from "../../utils/generalTypes"
import { setEnteredBranch, setReplacedTodoNull } from '../../redux/reducers/appStatusReducer'

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
    const putCardToBottom = useAppSelector(state => state.appStatus.putCardToBottom)
    const enteredBranch = useAppSelector(state => state.appStatus.enteredBranch)
    const isDragging = useAppSelector(state => state.appStatus.isDragging)

    const filteredTodos = useMemo(() => {
        const filteredTodos = stateTodos.filter((todo) => todo.branch == props.branch.branchCode)
        return filteredTodos.sort((a, b) => a.order - b.order)
    }, [stateTodos])

    function handleDelete() {
        filteredTodos.forEach((todo) => dispatch(deleteTodoThunk(todo)))
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
        dispatch(setEnteredBranch(props.branch))
        if (e.target == e.currentTarget) {
            dispatch(setReplacedTodoNull(null))
        }
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault()
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, branch: BranchType): void {
        e.preventDefault()
        dispatch(reOrderTodoThunk({ replacedTodo: replacedTodo as TodoType, draggedTodo: draggedTodo as TodoType, enteredBranch: branch, putCardToBottom: putCardToBottom }))
    }

    return (
        <div className="branch"
            onDragEnter={(e) => dragEnterHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, props.branch)}>
            <div className='branch-container' style={{ backgroundColor: `${(enteredBranch == props.branch) && isDragging ? '#91a9ff' : ''}` }}>
                <div className="branch__name-container">
                    <p className="branch__name">{isLoadingDelete ? "Deleting..." : props.branch.branchName}</p>
                    <button className="branch__button-delete" onClick={handleDelete}>X</button>
                </div>
                {filteredTodos && filteredTodos.map((todo) => {
                    return <Card todo={todo} key={todo.id} />
                })}
                <form className="branch__form-new-card" onSubmit={handleSubmit}>
                    <input className="branch__input-new-card" type='text' placeholder="New Task..." onChange={inputTodo.onChange} value={inputTodo.value} />
                    <button className="branch__button-add-card">Add</button>
                </form>
            </div>
        </div>
    )
}


export default Branch