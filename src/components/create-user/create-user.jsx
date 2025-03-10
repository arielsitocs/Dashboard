import { useState } from 'react';
import './create.css';

import CloseModal from '../../images/close-modal.png'

function Create({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [newName, setNewName] = useState('');
    const [newRut, setNewRut] = useState('');
    const [newBirth, setNewBirth] = useState('');
    const [newPosition, setNewPosition] = useState('Trabajador');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const createUser = async (e) => {
        e.preventDefault();

        const newUser = {
            name: newName,
            rut: newRut,
            birth: newBirth,
            position: newPosition,
            email: newEmail,
            phone: newPhone,
        };

        try {
            await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })

            onClose();
        } catch (error) {
            console.error('Error al crear el usuario: ', error);
        }
    }

    return (
        <div className="create-modal">
            <form onSubmit={createUser}>
                <div className='close-create'>
                    <img src={CloseModal} id='close-create-modal' onClick={onClose} alt="" />
                </div>
                <div className="user-name">
                    <h2>Nombre</h2>
                    <input
                        type="text"
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder='-'
                        required
                    />
                </div>
                <div className="user-rut">
                    <h2>RUT</h2>
                    <input
                        type="text"
                        onChange={(e) => setNewRut(e.target.value)}
                        placeholder='-'
                        required
                    />
                </div>
                <div className="user-birth-date">
                    <h2>Fecha Nacimiento</h2>
                    <input
                        type="date"
                        onChange={(e) => setNewBirth(e.target.value)}
                        placeholder='-'
                        required
                    />
                </div>
                <div className="user-position">
                    <h2>Cargo</h2>
                    <select onChange={(e) => setNewPosition(e.target.value)}>
                        <option value="Trabajador">Trabajador</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
                <div className="user-email">
                    <h2>Correo Electrónico</h2>
                    <input
                        type="email"
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder='-'
                        required
                    />
                </div>
                <div className="user-phone">
                    <h2>Teléfono</h2>
                    <input
                        type="text"
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder='-'
                        required
                    />
                </div>
                <div className='button'>
                    <button className='create-user' type='submit'>Crear Usuario</button>
                </div>
            </form>
        </div>
    )
}

export default Create;