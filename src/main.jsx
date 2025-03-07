import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import App from './App.jsx';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />\
          <Route path="login" element={<Login />} />\
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<App />} />\
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
