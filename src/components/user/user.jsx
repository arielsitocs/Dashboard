import { useDispatch } from 'react-redux';
import './user.css'

import Delete from '../../images/user-delete.png';
import Update from '../../images/user-update.png';

function User({ OpenAlert, onOpenUpdate, id, name, rut, birth, position, email, phone }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        OpenAlert(() => deleteUser(id)); 
      };

    const deleteUser = (id) => {
        dispatch({ type: 'deleteUser', identifier: id }); // Despacha la acción con el id
      };

    return (
        <div className="user">
            <div className="user-name">
                <h2>Nombre</h2>
                <p>{name}</p>
            </div>
            <div className="user-rut">
                <h2>RUT</h2>
                <p>{rut}</p>
            </div>
            <div className="user-birth-date">
                <h2>Fecha Nacimiento</h2>
                <p>{birth}</p>
            </div>
            <div className="user-position">
                <h2>Cargo</h2>
                <p>{position}</p>
            </div>
            <div className="user-email">
                <h2>Correo Electrónico</h2>
                <p>{email}</p>
            </div>
            <div className="user-phone">
                <h2>Teléfono</h2>
                <p>{phone}</p>
            </div>
            <div className="user-functions">
                <img src={Delete} onClick={handleDelete} alt="" />
                <img src={Update} onClick={onOpenUpdate} alt="" />
            </div>
        </div>
    )
}

export default User;