import { createStore } from 'redux';

// *TODO: Estudiar y comprender mejor redux, sobretodo la creación de un store y como funcionan sus funciones (lo de abajo) */

// *TODO: Desarrollar funcion para eliminar usuario de la store */

// Estado inicial con una lista de usuarios vacía
const initialUsersState = { users: [] };

// Reducer: función que actualiza la lista de usuarios
const userReducer = (state = initialUsersState, action) => {
    if (action.type === 'addUser') {
        return { users: [...state.users, action.payload] }; // Agregar usuario
    } else if (action.type === 'deleteUser') {
        return { users: state.users.filter((user) => user.id !== action.identifier) }; // Eliminar usuario
    }
    return state; // Si no hay cambios, devuelve el mismo estado
};

// Crear el store con Redux
export default createStore(userReducer);

