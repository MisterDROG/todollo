import { current } from '@reduxjs/toolkit'
import { DragEvent } from 'react'
import { deleteTodoThunk, doneTodoThunk } from '../../redux/middlewares/thunks'
import { setDraggedTodo, setReplacedTodo, setReplacedTodoNull } from '../../redux/reducers/appStatusReducer'
import { BranchType, TodoType, useAppDispatch, useAppSelector } from '../../types'
import './card.css'

interface CardProps {
    todo: TodoType,
}

function Card(props: CardProps) {

    const dispatch = useAppDispatch()

    function deleteHandler() {
        dispatch(deleteTodoThunk(props.todo.id))
    }

    function doneHandler() {
        dispatch(doneTodoThunk(props.todo.id))
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        // e.stopPropagation()
        dispatch(setDraggedTodo(todo))
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        console.log("!leave")
        e.currentTarget.style.marginBottom = "0px"
        dispatch(setReplacedTodoNull(null))
        // console.log('!leaveTodo', todo)
    }

    function dragEnterHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        console.log("!enter")
        dispatch(setReplacedTodo(todo))
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        // e.stopPropagation()
        e.preventDefault()
        // console.log('target', e.target)
        e.currentTarget.style.marginBottom = "30px"
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        e.currentTarget.style.marginBottom = "0px"
    }

    return (
        <div className="card" draggable={true}
            onDragStart={(e) => dragStartHandler(e, props.todo)}
            onDragEnter={(e) => dragEnterHandler(e, props.todo)}
            onDragLeave={(e) => dragLeaveHandler(e, props.todo)}
            onDragOver={(e) => dragOverHandler(e, props.todo)}
            onDrop={(e) => dropHandler(e, props.todo)}
        >
            <p className="card__text">{props.todo.task}</p>
            <p className='card__order'>{props.todo.order}</p>
            <div className='card__info'>
                <p className='card__date'>{props.todo.date}</p>
            </div>
            <button className='card__button-done' onClick={doneHandler}>{props.todo.status}</button>
            <button className='card__button-delete' onClick={deleteHandler}>Delete</button>
        </div>
    )
}

export default Card