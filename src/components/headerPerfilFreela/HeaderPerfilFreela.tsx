import React from 'react';
import './HeaderPerfilFreela.css';
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

let mensagemAlert = "asdasdasda";
let tipoAlert = 0;

const HeaderPerfilFreela = ({ setMostrarAlert }: any) => {
    // ---- Const Bootstrap
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalRegistro, setModalRegistro] = useState(false);
    const pagina = useNavigate();

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

                        <li className="d-lg-none sh-navegacao-item">
                            <p className='sh-item-text' onClick={logout}>Sair</p>
                        </li>
                    </ul>
                </Offcanvas.Body>

                <ul className='d-none d-lg-flex sh-header-option-dois'>
                    <p className='sh-item-text' onClick={logout}>Sair</p>
                </ul>
            </Offcanvas>
        </section>
    )
}

export default HeaderPerfilFreela;