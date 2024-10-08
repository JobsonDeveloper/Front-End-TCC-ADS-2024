import React from 'react';
import './header.css'
import Logo from '../../assets/index/backgrounds/logo.svg';
import { Link } from 'react-router-dom';

// ---- Bootstrap
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

import Options from '../../assets/index/icons/icon-options.png'
import { Modal } from 'react-bootstrap';

const Header = () => {
  // ---- Const Bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalRegistro, setModalRegistro] = useState(false);

  function ModalTipoDeCadastro(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Qual tipo de cadastro você deseja realizar?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to='/cadastro-freelancer' className='sh-item-text'>Tornar-se um Freelancer</Link>
          <Link to='/cadastro-cliente' className='sh-item-text'>Tornar-se um Cliente</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
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

        <li className="sh-options-itens">
          <Link to='/login' className='sh-options-login'>Login</Link>
        </li>
      </ul>

      <Offcanvas show={show} onHide={handleClose} responsive="lg" className='sh-header-offcanvas'>
        <div className="d-none d-lg-block sh-desktop-logo">
          <Link to='/'>
            <img src={Logo} alt="Logo da SkillHub" className='sh-logo-img' />
          </Link>
        </div>

        <Offcanvas.Header closeButton className='sh-offcanvas-element'>
          <Offcanvas.Title className='sh-lg-header-title'>
            {/* <img src={Logo} alt="Logo da SkillHub" className='sh-logo-img' /> */}
            Navegue pelo nosso site
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='sh-header-offcanvas-body'>
          <ul className="mb-0 sh-header-navegacao">

            <li className="sh-navegacao-item">
              <a href='#sh_planos' className='sh-item-text'>Planos</a>
            </li>

            <li className="sh-navegacao-item">
              <a href='#sh_profissionais_emDestaque' className='sh-item-text'>Profissionais em destaque</a>
            </li>

            <li className="sh-navegacao-item">
              <a href='#sh_comecar' className='sh-item-text'>Como começar</a>
            </li>

            <li className="sh-navegacao-item">
              <Link to='/cadastro-freelancer' className='sh-item-text'>Sobre nós</Link>
            </li>

            <li className="sh-navegacao-item">
              <Link to='#sh_duvidas' className='sh-item-text'>Dúvidas</Link>
            </li>
          </ul>
        </Offcanvas.Body>

        <ul className='d-none d-lg-flex sh-header-option-dois'>
          <li className="sh-navegacao-item">
            {/* <Link to='/duvidas' className='sh-item-text'>Registre-se</Link> */}
            <button className='sh-item-text' onClick={() => setModalRegistro(true)}>Registre-se</button>
          </li>
          <li className="sh-navegacao-item">
            <Link to='/duvidas' className='sh-item-text'>Login</Link>
          </li>
        </ul>

        <ModalTipoDeCadastro show={modalRegistro} onHide={() => setModalRegistro(false)} />
      </Offcanvas>
    </section>
  )
}

export default Header;

// ----------------------------------------

