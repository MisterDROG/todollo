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
    const replacedTodo = useAppSelector(state => state.appStatus.replacedTodo)

    function deleteHandler() {
        dispatch(deleteTodoThunk(props.todo.id))
    }

    function doneHandler() {
        dispatch(doneTodoThunk(props.todo.id))
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        dispatch(setDraggedTodo(todo))
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.currentTarget.style.marginBottom = "0px"
    }

    function dragEnterHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        dispatch(setReplacedTodo(todo))
        console.log("!enter", e.currentTarget)

    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
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