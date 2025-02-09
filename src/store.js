import { createStore } from 'redux';

// *TODO: Estudiar y comprender mejor redux, sobretodo la creación de un store y como funcionan sus funciones (lo de abajo) */

//// Desarrollar funcion para eliminar usuario en la store 

//// Desarrollar función para modificar el usuario en la store 

// Estado inicial con una lista de usuarios vacía
const initialUsersState = { users: [] };

// Reducer: función que actualiza la lista de usuarios
const userReducer = (state = initialUsersState, action) => {
    if (action.type === 'addUser') {
        return { users: [...state.users, action.user] };
    } else if (action.type === 'deleteUser') {
        return { users: state.users.filter((user) => user.id !== action.identifier) };
    } else if (action.type === 'updateUser') {
        return {
            users: state.users.map((user) =>
                user.id === action.updatedUser.id ? { ...user, ...action.updatedUser } : user
            ),
        };
    }
    return state;
};

// Crear el store con Redux
export default createStore(userReducer);

