import { useState } from "react"
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLoggedUser } from '../../store/users.ts'
import './login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // Tambien guardamos el usuario en el storage para recuperarlo en toda la app despues, para evitar que se pierda el usuario al recargar
                dispatch(setLoggedUser(data.user)) // Establecemos el usuario en redux con el data que llega desde la api
                navigate('/dashboard');
            } else {
                alert('Error al autentificar usuario.')
            }
    
        } catch (error) {
            console.log('Error al autentificarse: ', error)
        }
    }

    return (
        <div className="background">
            <form className="login" onSubmit={login}>
                <div className="title">
                    <h1>Iniciar Sesión</h1>
                </div>
                <div className="email">
                    <h2>Correo Electrónico</h2>
                    <input required type="email" placeholder="Ingresa tu Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="password">
                    <h2>Contraseña</h2>
                    <input required type="password" placeholder="Ingresa tu Contraseña" onChange={(e) => setPassword(e.target.value)} />
                    <a href="">Olvidé mi Contraseña</a>
                </div>
                <div className="button">
                    <button type="submit">Ingresar</button>
                </div>
            </form>
            <div className="has-account-login">
                <p>No tienes una cuenta?</p>
                <a href="/register">Registrate aquí</a>
            </div>
        </div>
    )
}

export default Login;