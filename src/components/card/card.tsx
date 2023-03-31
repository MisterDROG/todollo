import { DragEvent, useState } from 'react'
import { deleteTodoThunk, doneTodoThunk } from '../../redux/middlewares/thunks'
import { setDraggedTodo, setReplacedTodo } from '../../redux/reducers/appStatusReducer'
import { TodoType, useAppDispatch, useAppSelector } from '../../types'
import './card.scss'
import clockDate from '../../images/clock_date.png';

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
        console.log('targetLeave', e.target)
        e.currentTarget.style.marginBottom = "10px"
    }

    function dragEnterHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        dispatch(setReplacedTodo(todo))
        setIsDraggedOver(true)
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        e.currentTarget.style.marginBottom = "30px"
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        e.currentTarget.style.marginBottom = "10px"
        setIsDraggedOver(false)
    }

    return (
        <div className='card' draggable={true}
            onDragStart={(e) => dragStartHandler(e, props.todo)}
            onDragEnter={(e) => dragEnterHandler(e, props.todo)}
            onDragLeave={(e) => dragLeaveHandler(e, props.todo)}
            onDragOver={(e) => dragOverHandler(e, props.todo)}
            onDrop={(e) => dropHandler(e, props.todo)}
        >
            <div className={'card__header' + (isDraggedOver ? ' card_pointer-switch' : '')}>
                <p className='card__text'>{props.todo.task}</p>
                <button className={'card__button-delete' + (isDraggedOver ? ' card_pointer-switch' : '')} onClick={deleteHandler}>X</button>
            </div>

            {/* <p className='card__order'>{props.todo.order}</p> */}
            <div className={'card__info' + (isDraggedOver ? ' card_pointer-switch' : '')}>
                <img className='card__logo-img' src={clockDate} alt='clockDate image'></img>
                <p className='card__date'>{props.todo.date}</p>
            </div>
            <button className={(props.todo.status == 'Done' ? 'card__button-status_done' : 'card__button-status_undone') + (isDraggedOver ? ' card_pointer-switch' : '')}
                onClick={doneHandler}>{props.todo.status}</button>
        </div>
    )
}

export default Card