import React from 'react';
import './header.css'
import Logo from '../../assets/index/backgrounds/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

// ---- Bootstrap
import { useState } from 'react';
// import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

import serFreelancerImg from '../../assets/index/backgrounds/serFreelancer.png';
import serClienteImg from '../../assets/index/backgrounds/serCliente.png';
import Options from '../../assets/index/icons/icon-options.png'
import { Modal } from 'react-bootstrap';
import PersonIcon from '@mui/icons-material/Person';
import { Alert } from '@mui/material';


const ShAlert = () => {
  return (
    <>
      {tipoAlert === 0 &&
        <Alert severity="success">
          {mensagemAlert}
        </Alert>
      }

      {tipoAlert === 1 &&
        <Alert severity="info">
          {mensagemAlert}
        </Alert>
      }

      {tipoAlert === 2 &&
        <Alert severity="warning">
          {mensagemAlert}
        </Alert>
      }

      {tipoAlert === 3 &&
        <Alert severity="error">
          {mensagemAlert}
        </Alert>
      }
    </>
  )
}

let mensagemAlert = "asdasdasda";
let tipoAlert = 0;

const Header = ({ usuario }: any) => {
  // ---- Const Bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalRegistro, setModalRegistro] = useState(false);
  const pagina = useNavigate();
  const [mostrarAlert, setMostrarAlert] = useState(false);


  const logout = () => {
    tipoAlert = 0;
    mensagemAlert = "Volte sempre!"
    handleClose();
    setMostrarAlert(true);

    setTimeout(() => {
      setMostrarAlert(true);
      sessionStorage.clear();
      pagina('/login');
    }, 4000);
  }

  function ModalTipoDeCadastro(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='sh-modal-register'
      >
        <Modal.Header closeButton className='sh-modal-header-register'>
          <Modal.Title id="contained-modal-title-vcenter" className='sh-modal-header-text'>
            Qual tipo de cadastro você deseja realizar?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='sh-modal-body-register'>
          <Link to='/cadastro-freelancer' className='sh-modal-body-link'>
            {/* <img src={serFreelancerImg} alt="Botão para ser Freelance" className='sh-modal-body-img' /> */}
            Tornar-se um Freelancer
          </Link>

          <Link to='/cadastro-cliente' className='sh-modal-body-link'>
            {/* <img src={serClienteImg} alt="Botão para ser Freelance" className='sh-modal-body-img' /> */}
            Tornar-se um Cliente
          </Link>
        </Modal.Body>
        <Modal.Footer className='sh-modal-footer'>
          <Button onClick={props.onHide} className='sh-modal-footer-button'>Voltar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <section className="sh-header">

      {/* Para portateis */}
      <ul className="d-lg-none sh-header-options">
        <li className="sh-options-itens">
          <img src={Options} alt="Opções de navegação" className='sh-options-img' onClick={handleShow} />
        </li>

        <li className="sh-options-itens">
          <img src={Logo} alt="Logo da SkillHub" className='sh-lg-logo-img' />
        </li>

        {usuario === 0 && <li className="sh-options-itens">
          <Link to='/login' className='sh-options-login'>Login</Link>
        </li>}

        {usuario != 0 && <li className="sh-options-itens">
          <Link to='/perfil' className='sh-options-login'>
            <PersonIcon />
          </Link>
        </li>}

      </ul>

      <Offcanvas show={show} onHide={handleClose} responsive="lg" className='sh-header-offcanvas'>
        <div className="d-none d-lg-block sh-desktop-logo">
          <Link to='/'>
            <img src={Logo} alt="Logo da SkillHub" className='sh-logo-img' />
          </Link>
        </div>

        <Offcanvas.Header closeButton className='sh-offcanvas-element'>
          <Offcanvas.Title className='sh-lg-header-title'>
            Navegue pelo nosso site
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='sh-header-offcanvas-body'>
          <ul className="mb-0 sh-header-navegacao">
            <li className="sh-navegacao-item d-lg-none">
              <a href='#sh_home_header' className='sh-item-text'>Home</a>
            </li>

            {usuario === 0 && <li className="sh-navegacao-item">
              <a href='#sh_planos' className='sh-item-text'>Planos</a>
            </li>}

            <li className="sh-navegacao-item">
              <a href='#sh_profissionais_emDestaque' className='sh-item-text'>Profissionais em destaque</a>
            </li>

            <li className="sh-navegacao-item">
              <a href='#sh_clientes_emDestaque' className='sh-item-text'>Clientes em destaque</a>
            </li>

            {usuario === 0 && <li className="sh-navegacao-item d-lg-none">
              <a href='#sh_vantagens' className='sh-item-text'>Vantagens de ser nosso cliente</a>
            </li>}

            {usuario != 1 && <li className="sh-navegacao-item d-lg-none">
              <a href='#sh_ultimas_postagens' className='sh-item-text'>Últimos servicos postados</a>
            </li>}

            {usuario === 2 && <li className="sh-navegacao-item">
              <a href='#' className='sh-item-text'>Serviços</a>
            </li>}

            {usuario === 0 && <li className="sh-navegacao-item">
              <a href='#sh_comecar' className='sh-item-text'>Como começar</a>
            </li>}

            {usuario === 0 && <li className="sh-navegacao-item d-lg-none">
              <a href="#sh_sobre_a_skillhub" className='sh-item-text'>Oque é a Skillhub</a>
            </li>}

            <li className="sh-navegacao-item">
              <a href='#sh_duvidas' className='sh-item-text'>Dúvidas Frequentes</a>
            </li>

            {usuario != 0 && <li className="sh-navegacao-item">
              <a href='#' className='sh-item-text'>Fale conosco</a>
            </li>}

            {usuario === 0 && <li className="sh-navegacao-item d-lg-none">
              <Link to='/login' className='sh-item-text'>Login</Link>
            </li>}

            {usuario === 0 && <li className="d-lg-none sh-navegacao-item">
              <Link to='/cadastro-cliente' className='sh-item-text'>Torne-se um cliente</Link>
            </li>}

            {usuario === 0 && <li className="d-lg-none sh-navegacao-item">
              <Link to='/cadastro-freelancer' className='sh-item-text'>Torne-se um Freelancer</Link>
            </li>}


            {usuario != 0 && <li className="d-lg-none sh-navegacao-item">
              <p className='sh-item-text' onClick={logout}>Sair</p>
            </li>}
          </ul>
        </Offcanvas.Body>

        <ul className='d-none d-lg-flex sh-header-option-dois'>
          {usuario === 0 &&
            <li className="sh-navegacao-item">
              <button className='sh-item-text' onClick={() => setModalRegistro(true)}>Registre-se</button>
            </li>
          }
          {usuario === 0 &&
            <li className="sh-navegacao-item">
              <Link to='/login' className='sh-item-text'>Login</Link>
            </li>
          }

          {usuario != 0 &&
            <p className='sh-item-text' onClick={logout}>Sair</p>
          }

          {usuario != 0 &&
            <Link to='/perfil' className='sh-options-login'>
              <PersonIcon className='sh-perfil-icon'/>
            </Link>
          }

        </ul>

        <ModalTipoDeCadastro show={modalRegistro} onHide={() => setModalRegistro(false)} />
      </Offcanvas>

      {mostrarAlert &&
        <div className="sh-alerts">
          <ShAlert />
        </div>
      }
    </section>
  )
}

export default Header;

// ----------------------------------------

