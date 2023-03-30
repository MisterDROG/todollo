import todolloLogo from '../../images/TodolloDark.png';
import './header.scss'

function Header() {


    return (
        <div className="header">
            <div className="header__logoContainer">
                <img className="header__logoImg" src={todolloLogo} alt='todollo Logo'></img>
                <p className="header__logoText">ToDollo</p>
            </div>
        </div>
    )
}

export default Header