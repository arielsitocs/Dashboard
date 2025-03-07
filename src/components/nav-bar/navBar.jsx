import logOut from '../../images/log-out.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logOutUser } from '../../store/users.ts'
import './navBar.css';

function NavBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedUser = useSelector((state) => state.users.user) // Rescatamos el usuario completo de redux

    const handleLogOut = () => {
        if (dispatch(logOutUser())){
            localStorage.removeItem('user');
            navigate('/login');
        }
    }

// MOSTRAR EL NOMBRE DEL USUARIO LOGUEADO EN EL NAVBAR //

    return (
        <div className="nav-bar">
            <p>Bienvenido, {loggedUser.name}!</p>
            <img src={logOut} onClick={handleLogOut} />
        </div>
    )
}

export default NavBar;