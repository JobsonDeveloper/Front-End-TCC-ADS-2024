import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Geral
import Inicial from './App';
import Login from './views/login/Login';
import SobreNos from './views/sobreNos/SobreNos';
import Duvidas from './views/duvidas/Duvidas';

// Rotas de clientes
import CadastroCliente from './views/cadastroCliente/CadastroCliente';
import HomeCliente from './views/homeCliente/HomeCliente';

// Rotas Freelancers
import CadastroFreelancer from './views/cadastroFreelamcer/CadastroFreelancer';
import HomeFreelancer from './views/homeFreelancer/HomeFreelancer';

const router = createBrowserRouter([
  // Geral
  { path: '/', element: <Inicial /> },
  { path: '/login', element: <Login /> },
  { path: '/sobrenos', element: <SobreNos /> },
  { path: '/duvidas', element: <Duvidas /> },

  // Rotas de clientes
  { path: 'cadastro-cliente', element: <CadastroCliente /> },
  { path: '/home-cliente', element: <HomeCliente /> },

  // Rotas de Freelancers
  { path: 'cadastro-freelancer', element: <CadastroFreelancer /> },
  { path: '/home-freelancer', element: < HomeFreelancer/> },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Adicionar isso para ficar 'valendo' as rotas criadas */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
