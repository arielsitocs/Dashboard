import React from 'react';
import { useState } from 'react';
import User from './components/user.jsx';
import Create from './components/create-user.jsx'
import Update from './components/update-user.jsx'
import './App.css';

import headerUser from './images/header-user.png'
import headerAdd from './images/header-add.png'
import headerSearch from './images/header-search.png'

function App() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  }

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
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
          <User name={'Ariel Escobar'} rut={'21.293.773-8'} birth={'09/05/2003'} position={'Administrador'} email={'arielescobar531@gmail.com'} phone={'+56946705707'} onOpenUpdate={openUpdateModal}></User>
          <User name={'Ariel Escobar'} rut={'21.293.773-8'} birth={'09/05/2003'} position={'Administrador'} email={'arielescobar531@gmail.com'} phone={'+56946705707'}></User>
          <User name={'Ariel Escobar'} rut={'21.293.773-8'} birth={'09/05/2003'} position={'Administrador'} email={'arielescobar531@gmail.com'} phone={'+56946705707'}></User>
          <User name={'Ariel Escobar'} rut={'21.293.773-8'} birth={'09/05/2003'} position={'Administrador'} email={'arielescobar531@gmail.com'} phone={'+56946705707'}></User>
          <User name={'Ariel Escobar'} rut={'21.293.773-8'} birth={'09/05/2003'} position={'Administrador'} email={'arielescobar531@gmail.com'} phone={'+56946705707'}></User>
        </div>
      </div>

      <Create isOpen={isCreateModalOpen} onClose={closeCreateModal}></Create>
      <Update name={'Ariel Escobar'} rut={'21.293.773-8'} birth={'09/05/2003'} position={'Administrador'} email={'arielescobar531@gmail.com'} phone={'+56946705707'} isOpen={isUpdateModalOpen} onClose={closeUpdateModal}></Update>
    </div>
  );
}

export default App;