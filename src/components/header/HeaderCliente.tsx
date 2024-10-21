import React from 'react';
import './HeaderCliente.css'
import Logo from '../../assets/index/backgrounds/logo.svg';
import { Link } from 'react-router-dom';

// ---- Bootstrap
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

import serFreelancerImg from '../../assets/index/backgrounds/serFreelancer.png';
import serClienteImg from '../../assets/index/backgrounds/serCliente.png';
import Options from '../../assets/index/icons/icon-options.png'
import { Modal } from 'react-bootstrap';

const HeaderCliente = () => {
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
          <li className="sh-navegacao-item d-lg-none">
              <a href='#sh_home_header' className='sh-item-text'>Home</a>
            </li>

            <li className="sh-navegacao-item">
              <a href='#sh_planos' className='sh-item-text'>Planos</a>
            </li>

            <li className="sh-navegacao-item">
              <a href='#sh_profissionais_emDestaque' className='sh-item-text'>Profissionais em destaque</a>
            </li>

            <li className="sh-navegacao-item d-lg-none">
              <a href='#sh_clientes_emDestaque' className='sh-item-text'>Clientes em destaque</a>
            </li>

            <li className="sh-navegacao-item d-lg-none">
              <a href='#sh_vantagens' className='sh-item-text'>Vantagens de ser nosso cliente</a>
            </li>

            <li className="sh-navegacao-item d-lg-none">
              <a href='#sh_ultimas_postagens' className='sh-item-text'>Últimos servicos postados</a>
            </li>

            <li className="sh-navegacao-item">
              <a href='#sh_comecar' className='sh-item-text'>Como começar</a>
            </li>

            <li className="sh-navegacao-item d-lg-none">
              <a href="#sh_sobre_a_skillhub" className='sh-item-text'>Oque é a Skillhub</a>
            </li>

            <li className="sh-navegacao-item">
              <a href='#sh_duvidas' className='sh-item-text'>Dúvidas Frequentes</a>
            </li>

            <li className="sh-navegacao-item d-lg-none">
              <Link to='/login' className='sh-item-text'>Login</Link>
            </li>

            <li className="d-lg-none sh-navegacao-item">
              <Link to='/cadastro-cliente' className='sh-item-text'>Torne-se um cliente</Link>
            </li>

            <li className="d-lg-none sh-navegacao-item">
              <Link to='/cadastro-freelancer' className='sh-item-text'>Torne-se um Freelancer</Link>
            </li>
          </ul>
        </Offcanvas.Body>

        <ul className='d-none d-lg-flex sh-header-option-dois'>
          <li className="sh-navegacao-item">
            {/* <Link to='/duvidas' className='sh-item-text'>Registre-se</Link> */}
            <button className='sh-item-text' onClick={() => setModalRegistro(true)}>Registre-se</button>
          </li>
          <li className="sh-navegacao-item">
            <Link to='/login' className='sh-item-text'>Login</Link>
          </li>
        </ul>

        <ModalTipoDeCadastro show={modalRegistro} onHide={() => setModalRegistro(false)} />
      </Offcanvas>
    </section>
  )
}

export default HeaderCliente;

// ----------------------------------------

