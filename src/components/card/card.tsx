import { DragEvent, useState } from 'react'
import { deleteTodoThunk, doneTodoThunk, reOrderTodoThunk } from '../../redux/middlewares/thunks'
import { setDraggedTodo } from '../../redux/reducers/appStatusReducer'
import { BranchType, TodoType, useAppDispatch, useAppSelector } from '../../types'
import './card.css'

interface CardProps {
    todo: TodoType,
}

function Card(props: CardProps) {

    const dispatch = useAppDispatch()
    const draggedTodo = useAppSelector(state => state.appStatus.draggedTodo)

    function deleteHandler() {
        dispatch(deleteTodoThunk(props.todo.id))
    }

    function doneHandler() {
        dispatch(doneTodoThunk(props.todo.id))
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        console.log('!todoDragStart', todo)
        console.log('todoDragged1', draggedTodo)
        dispatch(setDraggedTodo(todo))
        console.log('todoDragged2', draggedTodo)
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
        console.log('!todoLeave', e.currentTarget.textContent)
    }

    function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
        console.log('!todoEnd', e.currentTarget.textContent)
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        console.log('!todoOver', e.currentTarget.textContent)
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, todo: TodoType): void {
        e.preventDefault()
        console.log('!todoDrop', todo)
        console.log('todoReplaced', todo, 'todoDragged', draggedTodo)
        dispatch(reOrderTodoThunk({ todoReplaced: todo, todoDragged: draggedTodo as TodoType }))
    }

    return (
        <div className="card" draggable={true}
            onDragStart={(e) => dragStartHandler(e, props.todo)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, props.todo)}
        >
            <p className="card_text">{props.todo.task}</p>
            <div className='card_info'>
                <p className='card_info_date'>{props.todo.date}</p>
            </div>
            <button onClick={doneHandler}>{props.todo.status}</button>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}

export default Card