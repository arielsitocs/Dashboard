import './create.css';

import CloseModal from '../images/close-modal.png'

function Create({ isOpen, onClose }) {
    if(!isOpen) return null;

    return (
        <div className="create-modal">
            <form action="post">
                <div className='close-create'>
                    <img src={CloseModal} id='close-create-modal' onClick={onClose} alt=""  />
                </div>
                <div className="user-name">
                    <h2>Nombre</h2>
                    <input type="text" placeholder='-' required />
                </div>
                <div className="user-rut">
                    <h2>RUT</h2>
                    <input type="text" placeholder='-' required />
                </div>
                <div className="user-birth-date">
                    <h2>Fecha Nacimiento</h2>
                    <input type="text" placeholder='-' required />
                </div>
                <div className="user-position">
                    <h2>Cargo</h2>
                    <input type="text" placeholder='-' required />
                </div>
                <div className="user-email">
                    <h2>Correo Electrónico</h2>
                    <input type="text" placeholder='-' required />
                </div>
                <div className="user-phone">
                    <h2>Teléfono</h2>
                    <input type="text" placeholder='-' required />
                </div>
                <div className='button'>
                    <button className='create-user'>Crear Usuario</button>
                </div>
            </form>
        </div>
    )
}

export default Create;