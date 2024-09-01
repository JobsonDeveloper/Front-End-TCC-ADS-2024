import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Inicial from './App'
import Cadastro from './cadastroCliente/CadastroCliente'
import Login from './login/Login'
import Home from './home/Home'

// ------
const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicial />
  },
  {
    path: 'sejaCliente',
    element: <Cadastro />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  }
])
// ------

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Adicionar isso para ficar 'valendo' as rotas criadas */}
    <RouterProvider router={router}/> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
