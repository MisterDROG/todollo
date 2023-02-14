import { deleteTodoThunk, doneTodoThunk } from '../../redux/middlewares/thunks'
import { TodoType, useAppDispatch } from '../../types'
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

    return (
        <div className="card">
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