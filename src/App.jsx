import React from 'react';
import { useState } from 'react';
import User from './components/user/user.jsx';
import Create from './components/create-user/create-user.jsx';
import Update from './components/update-user/update-user.jsx';
import { useSelector } from 'react-redux';
import './App.css';

import headerUser from './images/header-user.png';
import headerAdd from './images/header-add.png';
import headerSearch from './images/header-search.png';

function App() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({}); // Hook creado para guardar el usuario que se debe actualizar, este usuario se encuentra en la funcion userFilter()

  // Llamamos al array de usuarios del Store para obtener todos los usuarios guardados ahí //
  const users = useSelector((state) => state.users);

  // Función para encontrar al usuario que se quiere modificar filtrandolo por su id en el array de usuarios
  const userFilter = (id) => { 
    const user = users.find((user) => user.id === id);

    if(user) {
      setUserToUpdate(user);
    }
  }

  const openCreateModal = () => {
    setCreateModalOpen(true);
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  }

  const openUpdateModal = (id) => {
    setUpdateModalOpen(true);
    userFilter(id);
  }

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  }

  return (
    <div className="App">
      <div className='dashboard'>
        <div className='header'>
          <div className='header-left'>
            <img className='header-user' src={headerUser} alt=''></img>
            <h1 className='header-title'>Usuarios</h1>
          </div>
          <div className='header-center'>
            <input type='text' placeholder='Buscar...' className='header-search'></input>
            <img src={headerSearch} alt=''></img>
          </div>
          <div className='header-right'>
            <img className='header-add' src={headerAdd} onClick={openCreateModal} alt='' ></img>
          </div>
        </div>

        <div className='users'>
          {
            users.length == 0 ?
              <div className="no-users"> 
                <h2>No existe ningún usuario.</h2> 
              </div>
              :
              users.map((user) => ( // Si operador terniario es false
                <User key={user.id} id={user.id} name={user.name} rut={user.rut} birth={user.birth} position={user.position} email={user.email} phone={user.phone} onOpenUpdate={() => openUpdateModal(user.id)}></User>
              ))
          }
        </div> 
      </div>

      <Create isOpen={isCreateModalOpen} onClose={closeCreateModal}></Create>
      <Update id={userToUpdate.id} name={userToUpdate.name} rut={userToUpdate.rut} birth={userToUpdate.birth} position={userToUpdate.position} email={userToUpdate.email} phone={userToUpdate.phone} isOpen={isUpdateModalOpen} onClose={closeUpdateModal}></Update>
    </div>
  );
}

export default App;