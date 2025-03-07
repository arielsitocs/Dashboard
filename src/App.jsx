import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLoggedUser } from './store/users.ts';
import { useDispatch } from 'react-redux';
import NavBar from './components/nav-bar/navBar.jsx';
import User from './components/user/user.jsx';
import Create from './components/create-user/create-user.jsx';
import Update from './components/update-user/update-user.jsx';
import Alert from './components/alert/alert.jsx';
import './App.css';

import headerUser from './images/header-user.png';
import headerAdd from './images/header-add.png'; 

function App() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAlertModalOpen, setAlertModalOpen] = useState(false);
  const [deleteUserFunction, setDeleteUserFunction] = useState(null);
  const [userToUpdate, setUserToUpdate] = useState({}); // Hook creado para guardar el usuario que se debe actualizar, este usuario se encuentra en la funcion userFilter()
  const [searchUser, setSearchUser] = useState(''); // Hook que toma el valor de la barra de búsqueda para usarlo en funciones
  const [users, setUsers] = useState([]); // Hook para traer los usuarios de la BD y poder renderizar la pagina cuando hayan cambios en la BD

  const dispatch = useDispatch();

  // Trae todos los usuarios y los guarda en el array de usuarios, ademas de detectar cada vez que el array cambia para volver a renderizar el componente
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error al cargar los usuarios: ', error))
}, [users])

// Vuelve a establecer el usuario en el store ya que al recargar la pagina se pierde el estado, pero lo rescatamos del storage que ya lo tiene guardado
useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
      dispatch(setLoggedUser(JSON.parse(storedUser)));
  }
}, []);

  // Función para mostrar los usuarios que coinciden con los buscados en la barra de búsqueda
  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchUser.toLowerCase());
  })

  // Verificar si existe un usuario con el nombre
  const userExists = users.some(user => user.name.toLowerCase().includes(searchUser.toLowerCase()));

  // Función para encontrar al usuario que se quiere modificar filtrandolo por su id en el array de usuarios
  const userFilter = (id) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      setUserToUpdate(user);
    }
  }

  const openCreateModal = () => {
    setCreateModalOpen(true);
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  }

  // Se abre el modal pero ademas al hacerlo se ejecuta el userFilter para encontrar al usuario que se quiere actualizar, se establece el usuario a actualizar con el usuario encontrado
  const openUpdateModal = (id) => {
    setUpdateModalOpen(true);
    userFilter(id);
  }

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  }

  // Recibimos la funcion de delete user que viene del componente user, y se al asignamos al hook DeleteUserFunction para usarla en el alert y asignarle una accion
  const openAlertModal = (deleteUserFunction) => {
    setAlertModalOpen(true);
    setDeleteUserFunction(() => deleteUserFunction);
  }

  const closeAlertModal = () => {
    setAlertModalOpen(false);
  }

  return (
    <div className="App">
      <NavBar/>
      <div className='dashboard'>
        <div className='header'>
          <div className='header-left'>
            <img className='header-user' src={headerUser} alt=''></img>
            <h1 className='header-title'>Usuarios</h1>
          </div>
          <div className='header-center'>
            <input type='text' placeholder='Buscar por nombre...' className='header-search' onChange={(e) => setSearchUser(e.target.value)}></input>
          </div>
          <div className='header-right'>
            <img className='header-add' src={headerAdd} onClick={openCreateModal} alt='' ></img>
          </div>
        </div> 

        <div className='users'>
          {
            !userExists && searchUser !== '' ? // Comprueba que el usuario no exista y que se haya escrito algo en la barra de busqueda
              <div className="no-users">
                <h2>No existe el usuario {searchUser}.</h2>
              </div>
              :
              users.length == 0 ? // Comprueba si el array de users está vacio con un operador ternario
                <div className="no-users">
                  <h2>Aún no hay usuarios creados.</h2>
                </div>
                :
                filteredUsers.map((user) => ( // Si operador terniario es false
                  <User key={user.id} id={user.id} name={user.name} rut={user.rut} birth={user.birth} position={user.position} email={user.email} phone={user.phone} onOpenUpdate={() => openUpdateModal(user.id)} OpenAlert={openAlertModal}></User>
                )) 
          }
        </div>
      </div>

      <Create isOpen={isCreateModalOpen} onClose={closeCreateModal}></Create>
      <Update id={userToUpdate.id} name={userToUpdate.name} rut={userToUpdate.rut} birth={userToUpdate.birth} position={userToUpdate.position} email={userToUpdate.email} phone={userToUpdate.phone} isOpen={isUpdateModalOpen} onClose={closeUpdateModal}></Update>
      <Alert isOpen={isAlertModalOpen} onClose={closeAlertModal} action={deleteUserFunction} title="Quieres eliminar el usuario?"></Alert> 
    </div>
  );
}

export default App;