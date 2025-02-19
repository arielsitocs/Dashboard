import { useState } from 'react';
import './update.css';

import CloseModal from '../../images/close-modal.png';

function Update({ isOpen, onClose, id, name, rut, birth, position, email, phone }) {
    if (!isOpen) return null;
    
    const [currentName, setName] = useState(name);
    const [currentRut, setRut] = useState(rut);
    const [currentBirth, setBirth] = useState(birth);
    const [currentPosition, setPosition] = useState(position);
    const [currentEmail, setEmail] = useState(email);
    const [currentPhone, setPhone] = useState(phone);
    const [users, setUsers] = useState([]);

    // Fetch para llenar el array de usuarios con los usuarios de la BD y ocuparlo en el resto del codigo
    fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error al cargar los usuarios: ', error))

    const updateUser = async (e, id) => {
        e.preventDefault();

        const user = users.find((user) => user.id === id); 
        if (user) {
            const updatedUser = {
                name: currentName,
                rut: currentRut,
                birth: currentBirth,
                position: currentPosition,
                email: currentEmail,
                phone: currentPhone,
            };

            try {
                await fetch(`http://localhost:5000/api/users/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedUser)
                })

                onClose();
            } catch (error) {   
                console.error('Error al actualizar el usuario: ', error);
            }
        }
    }

    return (
        <div className="update-modal">
            <form action="submit" onSubmit={(e) => { updateUser(e, id) }}>
                <div className='close-update'>
                    <img src={CloseModal} id='close-update-modal' onClick={onClose} alt="" />
                </div>
                <div className="user-name">
                    <h2>Nombre</h2>
                    <input
                        type="text"
                        value={currentName}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="user-rut">
                    <h2>RUT</h2>
                    <input
                        type="text"
                        value={currentRut}
                        onChange={(e) => setRut(e.target.value)}
                        required 
                    />
                </div>
                <div className="user-birth-date">
                    <h2>Fecha Nacimiento</h2>
                    <input
                        type="date"
                        value={currentBirth}
                        onChange={(e) => setBirth(e.target.value)}
                        required
                    />
                </div>
                <div className="user-position">
                    <h2>Cargo</h2>
                    <select value={currentPosition} onChange={(e) => setPosition(e.target.value)}>
                        <option value="Trabajador">Trabajador</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
                <div className="user-email">
                    <h2>Correo Electrónico</h2>
                    <input
                        type="email"
                        value={currentEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="user-phone">
                    <h2>Teléfono</h2>
                    <input
                        type="text"
                        value={currentPhone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className='button'>
                    <button className='update-user' type='submit'>Actualizar Usuario</button>
                </div>
            </form>
        </div>
    )
}

export default Update;