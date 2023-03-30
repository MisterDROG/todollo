import todolloLogo from '../../images/TodolloDark.png';
import './header.scss'

function Header() {


    return (
        <div className="header">
            <div className="header__logo-container">
                <img className="header__logo-img" src={todolloLogo} alt='ToDollo Logo'></img>
                <p className="header__logo-text">ToDollo board</p>
            </div>
        </div>
    )
}

export default Header