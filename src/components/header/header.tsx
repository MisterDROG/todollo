import './header.scss'
import todolloLogo from '../../images/TodolloDarkLogo.png';

function Header() {
    return (
        <div className="header">
            <div className="header__logo-container">
                <img className="header__logo-img" src={todolloLogo} alt='ToDollo Logo' />
                <p className="header__logo-text">ToDollo board</p>
            </div>
        </div>
    )
}

export default Header