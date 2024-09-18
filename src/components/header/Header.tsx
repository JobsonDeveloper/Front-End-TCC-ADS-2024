import React from 'react';
import './header.css'
import Logo from '../../assets/icons/logo.svg';
import { Link } from 'react-router-dom';

// ---- Bootstrap
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

import Options from '../../assets/icons/options.png'

const Header = () => {
    // ---- Const Bootstrap
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <section className="sh-header">
            <div className="d-lg-none sh-header-options">
                <div className="sh-options-itens">
                    <img src={Options} alt="Opções de navegação" className='sh-options-img' onClick={handleShow} />
                </div>
                <div className="sh-options-itens">
                    <img src={Logo} alt="Logo da SkillHub" className='sh-logo-img' />
                </div>
            </div>

            <div className="d-none d-lg-block sh-desktop-logo">
                <Link to='/'>
                    <img src={Logo} alt="Logo da SkillHub" className='sh-logo-img' />
                </Link>
            </div>

            <Offcanvas show={show} onHide={handleClose} responsive="lg" className='sh-header-offcanvas'>
                <Offcanvas.Header closeButton className='sh-offcanvas-element'>
                    <Offcanvas.Title className='sh-lg-header-logo'>
                        {/* <img src={Logo} alt="Logo da SkillHub" className='sh-logo-img' /> */}
                        Opções
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="mb-0 sh-header-navigation">
                        <li className="sh-navigation-item">
                            <a href='#sh_planos' className='sh-item-text'>Planos</a>
                        </li>
                        <li className="sh-navigation-item">
                            <a href='#sh_vantagens' className='sh-item-text'>Vantágens</a>
                        </li>
                        <li className="sh-navigation-item">
                            <a href='#sh_comecar' className='sh-item-text'>Como começar</a>
                        </li>
                        <li className="sh-navigation-item">
                            <Link to='/sobrenos' className='sh-item-text'>Sobre nós</Link>
                        </li>
                        <li className="sh-navigation-item">
                            <Link to='/duvidas' className='sh-item-text'>Dúvidas</Link>
                        </li>
                        <li className="sh-navigation-item">
                            <Link to='/login' className='sh-item-text'>Login</Link>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </section>
    )
}

export default Header;

// ----------------------------------------

