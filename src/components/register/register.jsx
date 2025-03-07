import { useState } from "react"
import { useNavigate } from "react-router";
import './register.css'

function Register() {

    const [newName, setNewName] = useState('');
    const [newRut, setNewRut] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newBirth, setNewBirth] = useState('');
    const [newPosition, setNewPosition] = useState('Trabajador');
    const [newPhone, setNewPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const createUser = async (e) => {
        e.preventDefault();

        const newUser = {
            name: newName,
            rut: newRut,
            birth: newBirth,
            position: newPosition,
            email: newEmail,
            phone: newPhone,
            password: newPassword
        };

        try {
            if(newPassword !== newPasswordConfirm){
                alert('Las contraseñas no coinciden');
            } else {
                const response = await fetch('http://localhost:5000/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                })

                if(response.ok) {
                    navigate('/login');
                }
            }
            
        } catch (error) {
            console.error('Error al crear el usuario en el registro: ', error);
        }
    }

    return (
        <div className="background">
            <form className="register" onSubmit={createUser}>
                <div className="title">
                    <h1>Registro Usuario</h1>
                </div>
                <div className="name">
                    <h2>Nombre Completo</h2>
                    <input required type="text" placeholder="Ingresa tus Nombres y Apellidos" onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div className="rut">
                    <h2>RUT</h2>
                    <input required type="text" placeholder="Ingresa tu RUT" onChange={(e) => setNewRut(e.target.value)} />
                </div>
                <div className="email">
                    <h2>Correo Electrónico</h2>
                    <input required type="email" placeholder="Ingresa tu Email" onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <div className="birth">
                    <h2>Fecha Nacimiento</h2>
                    <input required type="date" placeholder="Ingresa tu Contraseña" onChange={(e) => setNewBirth(e.target.value)} />
                </div>
                <div className="phone">
                    <h2>Telefono</h2>
                    <input required type="text" placeholder="Ingresa tu Telefono" onChange={(e) => setNewPhone(e.target.value)} />
                </div>

                <div className="password">
                    <h2>Contraseña</h2>
                    <input required type="password" placeholder="Ingresa tu Contraseña" onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="password-repeat">
                    <h2>Confirmar Contraseña</h2>
                    <input required type="password" placeholder="Repite tu Contraseña" onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                </div>
                <div className="button">
                    <button type="submit">Registrarse</button>
                </div>
            </form>
            <div className="has-account-register">
                <p>Ya tienes una cuenta?</p>
                <a href="/login">Ingresa aquí</a>
            </div>
        </div>
    )
}

export default Register;