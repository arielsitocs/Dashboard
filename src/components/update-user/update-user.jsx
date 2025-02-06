import { useState } from 'react';
import './update.css';

import CloseModal from '../../images/close-modal.png';

function Update({ isOpen, onClose, name, rut, birth, position, email, phone }) {
    if (!isOpen) return null;

    const [currentName, setName] = useState(name);
    const [currentRut, setRut] = useState(rut);
    const [currentBirth, setBirth] = useState(birth);
    const [currentPosition, setPosition] = useState(position);
    const [currentEmail, setEmail] = useState(email);
    const [currentPhone, setPhone] = useState(phone);

    return (
        <div className="update-modal">
            <form action="post">
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
                        type="text"
                        value={currentBirth}
                        onChange={(e) => setBirth(e.target.value)}
                        required
                    />
                </div>
                <div className="user-position">
                    <h2>Cargo</h2>
                    <input
                        type="text"
                        value={currentPosition}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div className="user-email">
                    <h2>Correo Electrónico</h2>
                    <input
                        type="text"
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