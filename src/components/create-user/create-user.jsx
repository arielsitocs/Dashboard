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
    const [newPosition, setNewPosition] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const createUser = (e) => {
        e.preventDefault();

        const newUser = {
            id: users.length + 1,
            name: newName,
            rut: newRut,
            birth: newBirth,
            position: newPosition,
            email: newEmail,
            phone: newPhone,
        };

        console.log(newUser)

        // Usamos el dispatch para realizar la acción de añadir un usuario a la Store //
        dispatch({type: 'addUser', payload: newUser});
        
        console.log(users);

        onClose();
    }

    // useEffect(() => {
    //     console.log("Usuarios: "+users)
    // }, [users]);

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
                        type="text"
                        onChange={(e) => setNewBirth(e.target.value)}
                        placeholder='-'
                        required
                    />
                </div>
                <div className="user-position">
                    <h2>Cargo</h2>
                    <input
                        type="text"
                        onChange={(e) => setNewPosition(e.target.value)}
                        placeholder='-'
                        required
                    />
                </div>
                <div className="user-email">
                    <h2>Correo Electrónico</h2>
                    <input
                        type="text"
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