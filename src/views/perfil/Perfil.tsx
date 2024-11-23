import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Perfil.css';

// Components
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import logoImg from '../../assets/login/icons/logo.svg';
import Loading from "../../components/loading/Loading";
import { Alert } from "@mui/material";
import Footer from "../../components/footer/Footer";
import HeaderPerfilFreela from "../../components/headerPerfilFreela/HeaderPerfilFreela";
import DadosUsuario from "../../components/dadosUsuario/DadosUsuario";
let userTipo: string | null = "";

const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const pagina = useNavigate();
    const [openDelete, setOpenDelete] = useState(false);
    const [tipoAlert, setTipoAlert] = useState<number>();
    const [mensagemAlert, setMensagemAlert] = useState<string>();
    const [paginaPerfil, setPaginaPerfil] = useState<number>(1);

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

    useEffect(() => {
        if ((!sessionStorage.getItem('shUserLogId')) || (!sessionStorage.getItem('shUserLogTipo'))) {
            setTipoAlert(3);
            setMensagemAlert("Faça login antes!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else {
            setLoading(false);
            userTipo = sessionStorage.getItem('shUserLogTipo');
        }
    }, []);

    const logout = () => {
        setTipoAlert(0);
        setMensagemAlert("Volte sempre!");
        setMostrarAlert(true);

        setTimeout(() => {
            setMostrarAlert(true);
            sessionStorage.clear();
            pagina('/login');
        }, 4000);
    };

    const handleClose = () => {
        setOpenDelete(false);
    };

    return (
        <main className="sh-perfil">
            {loading && <Loading />}

            <div className="sh-perfil-header-lg d-lg-none">
                <HeaderPerfilFreela
                    setMostrarAlert={setMostrarAlert}
                    tipoUsuario={userTipo}
                    setPaginaPerfil={setPaginaPerfil}
                />
            </div>

            <div className="sh-perfil-dados">
                <article className="sh-sideBar d-none d-lg-flex">
                    <div className="sh-sideBar-logo">
                        <img src={logoImg} alt="" className="sh-sideBar-logo-img" />
                    </div>

                    <ul className="mb-0 sh-sideBar-navegacao">
                        <li className="sh-sideBar-item">
                            <PersonRoundedIcon />

                            <p
                                className='sh-item-text'
                                onClick={() => {
                                    handleClose();
                                }}>
                                Perfil
                            </p>
                        </li>

                        {userTipo === '1' &&
                            <li
                                className="sh-sideBar-item"
                                onClick={() => {
                                    pagina('/servicos-registrados')
                                }}
                            >
                                <>
                                    <FormatListNumberedRoundedIcon />

                                    <p className='sh-item-text'>
                                        Serviços registrados
                                    </p>
                                </>
                            </li>
                        }

                        <li
                            className="sh-sideBar-item"
                            onClick={() => {
                                pagina('/servicos-aceitos')
                            }}
                        >
                            <>
                                <ChecklistRoundedIcon />

                                <p
                                    className='sh-item-text'
                                >
                                    Serviços aceitos
                                </p>
                            </>
                        </li>

                        <li
                            className="sh-sideBar-item"
                            onClick={() => {
                                pagina('/servicos-concluidos')
                            }}
                        >

                            <InventoryRoundedIcon />

                            <p className='sh-item-text'>
                                Serviços concluídos
                            </p>
                        </li>

                        <li
                            className="sh-sideBar-item"
                            onClick={logout}
                        >
                            <LogoutRoundedIcon />

                            <p className='sh-item-text'>
                                Sair
                            </p>
                        </li>
                    </ul>
                </article>

                <div className="sh-main">
                    <Link to='/home-freelancer' className="sh-header-desktop d-none d-lg-flex">
                        <p className="sh-perfil-titulo">
                            Perfil
                        </p>

                        <HomeRoundedIcon />
                    </Link>

                    <DadosUsuario
                        setMostrarAlert={setMostrarAlert}
                        setTipoAlert={setTipoAlert}
                        setMensagemAlert={setMensagemAlert}
                        setLoading={setLoading}
                    />
                </div>
            </div>

            <footer className="sh-perfil-footer">
                <div className="sh-footer">
                    <Footer />
                </div>
            </footer>

            {mostrarAlert &&
                <div className="sh-alerts">
                    <ShAlert />
                </div>
            }
        </main>
    )
}

export default Perfil;