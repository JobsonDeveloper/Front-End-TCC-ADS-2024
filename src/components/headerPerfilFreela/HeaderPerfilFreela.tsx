import React from 'react';
import './HeaderPerfilFreela.css';
import Logo from '../../assets/index/backgrounds/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

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

const HeaderPerfilFreela = ({ setMostrarAlert, tipoUsuario, setPaginaPerfil }: any) => {
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

                <li className="sh-options-itens">
                    <Link to='/home-freelancer' className='sh-homeIcon'>
                        <HomeRoundedIcon />
                    </Link>
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
                        Opções do perfil
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body className='sh-header-offcanvas-body'>
                    <ul className="mb-0 sh-header-navegacao">
                        <li className="sh-navegacao-item d-lg-none">
                            <PersonRoundedIcon />

                            <p
                                className='sh-item-text'
                                onClick={() => {
                                    setPaginaPerfil(1);
                                    handleClose();
                                }}>
                                Perfil
                            </p>
                        </li>

                        <li className="sh-navegacao-item">
                            {tipoUsuario === '0' &&
                                <>
                                    <ChecklistRoundedIcon />

                                    <p
                                        className='sh-item-text'
                                        onClick={() => {
                                            setPaginaPerfil(2);
                                            handleClose();
                                        }}>
                                        Serviços aceitos
                                    </p>
                                </>
                            }
                            {tipoUsuario === '1' &&
                                <>
                                    <FormatListNumberedRoundedIcon />

                                    <p 
                                    className='sh-item-text' 
                                    onClick={() => {
                                        setPaginaPerfil(3);
                                        handleClose();
                                    }}>
                                        Serviços solicitados
                                    </p>
                                </>
                            }
                        </li>

                        <li className="sh-navegacao-item">
                            <InventoryRoundedIcon />

                            <p 
                            className='sh-item-text' 
                            onClick={() => {
                                setPaginaPerfil(4);
                                handleClose();
                            }}>
                                Serviços concluídos
                            </p>
                        </li>

                        <li className="sh-navegacao-item">
                            <LogoutRoundedIcon />

                            <p className='sh-item-text' onClick={logout}>
                                Sair
                            </p>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </section>
    )
}

export default HeaderPerfilFreela;