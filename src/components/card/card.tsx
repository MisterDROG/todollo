import './card.scss'
import clockDate from '../../images/clockDateImage.png';
import { DragEvent, useState } from 'react'
import { deleteTodoThunk, doneTodoThunk } from '../../redux/middlewares/thunks'
import { setDraggedTodo, setIsDragging, setPutCardToBottom, setReplacedTodo } from '../../redux/reducers/appStatusReducer'
import { TodoType, useAppDispatch, useAppSelector } from '../../utils/generalTypes'

interface CardProps {
    todo: TodoType,
}

function Card(props: CardProps) {

    const dispatch = useAppDispatch()
    const replacedTodo = useAppSelector(state => state.appStatus.replacedTodo)
    const isDragging = useAppSelector(state => state.appStatus.isDragging)
    const putCardToBottom = useAppSelector(state => state.appStatus.putCardToBottom)
    const [isDraggedOver, setIsDraggedOver] = useState(false)

    function deleteHandler() {
        dispatch(deleteTodoThunk(props.todo))
    }

    function doneHandler() {
        dispatch(doneTodoThunk(props.todo.id))
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        dispatch(setIsDragging(true))
        dispatch(setDraggedTodo(todo))
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        setIsDraggedOver(false)
    }

    function dragEnterHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        dispatch(setReplacedTodo(todo))
        setIsDraggedOver(true)
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        const heightCurrentTarget = e.currentTarget.getBoundingClientRect().height
        const topCurrentTarget = e.currentTarget.getBoundingClientRect().top
        const pageY = e.pageY
        const positionCurrentTarget = pageY - topCurrentTarget - heightCurrentTarget / 2
        if (positionCurrentTarget > 0) {
            dispatch(setPutCardToBottom(true))
            e.currentTarget.style.marginBottom = "50px"
            e.currentTarget.style.marginTop = "10px"
        } else {
            dispatch(setPutCardToBottom(false))
            e.currentTarget.style.marginTop = "50px"
            e.currentTarget.style.marginBottom = "10px"
        }
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
    }

    return (
        <div className='card' style={((replacedTodo != props.todo) || (isDragging == false)) ? { marginTop: '10px', marginBottom: '10px' } : {}}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, props.todo)}
            onDragEnter={(e) => dragEnterHandler(e, props.todo)}
            onDragLeave={(e) => dragLeaveHandler(e, props.todo)}
            onDragOver={(e) => dragOverHandler(e, props.todo)}
            onDrop={(e) => dropHandler(e, props.todo)}
        >
            <div className={'card__header' + ((isDraggedOver && isDragging) ? ' card_pointer-switch' : '')}>
                <p className='card__text'>{props.todo.task}</p>
                <button className={'card__button-delete' + ((isDraggedOver && isDragging) ? ' card_pointer-switch' : '')} onClick={deleteHandler}>X</button>
            </div>
            {/* <p className='card__order'>{props.todo.order}</p> */}
            <div className={'card__info' + ((isDraggedOver && isDragging) ? ' card_pointer-switch' : '')}>
                <img className='card__logo-img' src={clockDate} alt='clockDate image'></img>
                <p className='card__date'>{props.todo.date}</p>
            </div>
            <button className={(props.todo.status == 'Done' ? 'card__button-status_done' : 'card__button-status_undone') + ((isDraggedOver && isDragging) ? ' card_pointer-switch' : '')}
                onClick={doneHandler}>{props.todo.status}</button>
            {(replacedTodo == props.todo) && (isDragging == true) && <div className='card__label' style={putCardToBottom ? { top: '125px' } : { top: '-33px' }}>→ HERE ←</div>}
        </div>
    )
}

export default Card

function Card(props: CardProps) {

    const dispatch = useAppDispatch()
    const replacedTodo = useAppSelector(state => state.appStatus.replacedTodo)
    const isDragging = useAppSelector(state => state.appStatus.isDragging)
    const putCardToBottom = useAppSelector(state => state.appStatus.putCardToBottom)
    const [isDraggedOver, setIsDraggedOver] = useState(false)

    function deleteHandler() {
        dispatch(deleteTodoThunk(props.todo))
    }

    function doneHandler() {
        dispatch(doneTodoThunk(props.todo.id))
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        dispatch(setIsDragging(true))
        dispatch(setDraggedTodo(todo))
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        setIsDraggedOver(false)
    }

    function dragEnterHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        dispatch(setReplacedTodo(todo))
        setIsDraggedOver(true)
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        const heightCurrentTarget = e.currentTarget.getBoundingClientRect().height
        const topCurrentTarget = e.currentTarget.getBoundingClientRect().top
        const pageY = e.pageY
        const positionCurrentTarget = pageY - topCurrentTarget - heightCurrentTarget / 2
        if (positionCurrentTarget > 0) {
            dispatch(setPutCardToBottom(true))
            e.currentTarget.style.marginBottom = "50px"
            e.currentTarget.style.marginTop = "10px"
        } else {
            dispatch(setPutCardToBottom(false))
            e.currentTarget.style.marginTop = "50px"
            e.currentTarget.style.marginBottom = "10px"
        }
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
    }

    return (
        <div className='card' style={((replacedTodo != props.todo) || (isDragging == false)) ? { marginTop: '10px', marginBottom: '10px' } : {}}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, props.todo)}
            onDragEnter={(e) => dragEnterHandler(e, props.todo)}
            onDragLeave={(e) => dragLeaveHandler(e, props.todo)}
            onDragOver={(e) => dragOverHandler(e, props.todo)}
            onDrop={(e) => dropHandler(e, props.todo)}
        >
            <div className={'card__header' + ((isDraggedOver && isDragging) ? ' card_pointer-switch' : '')}>
                <p className='card__text'>{props.todo.task}</p>
                <button className={'card__button-delete' + ((isDraggedOver && isDragging) ? ' card_pointer-switch' : '')} onClick={deleteHandler}>X</button>
            </div>
            {/* <p className='card__order'>{props.todo.order}</p> */}
            <div className={'card__info' + ((isDraggedOver && isDragging) ? ' card_pointer-switch' : '')}>
                <img className='card__logo-img' src={clockDate} alt='clockDate image'></img>
                <p className='card__date'>{props.todo.date}</p>
            </div>
            <button className={(props.todo.status == 'Done' ? 'card__button-status_done' : 'card__button-status_undone') + ((isDraggedOver && isDragging) ? ' card_pointer-switch' : '')}
                onClick={doneHandler}>{props.todo.status}</button>
            {(replacedTodo == props.todo) && (isDragging == true) && <div className='card__label' style={putCardToBottom ? { top: '125px' } : { top: '-33px' }}>→ HERE ←</div>}
        </div>
    )
}