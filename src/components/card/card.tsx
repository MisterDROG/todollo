import { TodoType } from '../../types'
import './card.css'

interface CardProps {
    todo: TodoType
}

function Card(props: CardProps) {

    return (
        <div className="card">
            <p className="card_text">{props.todo.task}</p>
            <div className='card_info'>
                <p className='card_info_date'>{props.todo.date}</p>
            </div>
        </div>
    )
}

export default Card