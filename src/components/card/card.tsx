import { DragEvent, useState } from 'react'
import { deleteTodoThunk, doneTodoThunk } from '../../redux/middlewares/thunks'
import { setDraggedTodo, setReplacedTodo } from '../../redux/reducers/appStatusReducer'
import { TodoType, useAppDispatch, useAppSelector } from '../../types'
import './card.css'

interface CardProps {
    todo: TodoType,
}

function Card(props: CardProps) {

    const dispatch = useAppDispatch()
    const replacedTodo = useAppSelector(state => state.appStatus.replacedTodo)
    const [isDraggedOver, setIsDraggedOver] = useState(false)

    function deleteHandler() {
        dispatch(deleteTodoThunk(props.todo))
    }

    function doneHandler() {
        dispatch(doneTodoThunk(props.todo.id))
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        dispatch(setDraggedTodo(todo))
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        setIsDraggedOver(false)
        e.currentTarget.style.marginBottom = "0px"
    }

    function dragEnterHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        setIsDraggedOver(true)
        dispatch(setReplacedTodo(todo))
        console.log(e)
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
            {isDraggedOver ?
                <button className='card__button-done card_pointerSwitch' onClick={doneHandler}>{props.todo.status}</button> :
                <button className='card__button-done' onClick={doneHandler}>{props.todo.status}</button>}
            {isDraggedOver ?
                <button className='card__button-delete card_pointerSwitch' onClick={deleteHandler}>Delete</button> :
                <button className='card__button-delete' onClick={deleteHandler}>Delete</button>}
        </div>
    )
}

export default Card