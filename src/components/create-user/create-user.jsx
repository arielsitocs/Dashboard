import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './create.css';

import CloseModal from '../../images/close-modal.png'

function Create({ isOpen, onClose }) {
    if (!isOpen) return null;

    // Creación de variables para acceder a las funciones del dispatch y selector de Redux //
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    const [newName, setNewName] = useState('');
    const [newRut, setNewRut] = useState('');
    const [newBirth, setNewBirth] = useState('');
    const [newPosition, setNewPosition] = useState('Trabajador');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const generateId = () => {
       if(users.length === 0){
        return 1;
       }
       const lastUser = users[users.length - 1]
       return lastUser.id + 1;
    }

    const createUser = (e) => {
        e.preventDefault();

        const newId = generateId();

        const newUser = {
            id: newId,
            name: newName,
            rut: newRut,
            birth: newBirth,
            position: newPosition,
            email: newEmail,
            phone: newPhone,
        };

        console.log(newUser)

        // Usamos el dispatch para realizar la acción de añadir un usuario a la Store //
        dispatch({type: 'addUser', user: newUser});
        
        // console.log(users);  

        onClose();
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