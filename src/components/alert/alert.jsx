import './alert.css';
import AlertImg from '../../images/alert.png';

function Alert({ isOpen, onClose, action, title }) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        action();
        onClose();
    }

return (
    <div className="alert">
        <div className="alert-top">
            <h1>{title}</h1>
            <img src={AlertImg} alt="" />
        </div>
        <div className="alert-buttons">
            <button className='confirm' onClick={handleConfirm}>Confirmar</button>
            <button className='cancel' onClick={onClose}>Cancelar</button>
        </div>
    </div>
)
}

export default Alert;