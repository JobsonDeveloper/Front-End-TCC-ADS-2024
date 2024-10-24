import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Perfil.css';

// Components
import HandymanIcon from '@mui/icons-material/Handyman';
import logoImg from '../../assets/login/icons/logo.svg';
import imgDescricao from '../../assets/icons/descricao.svg';
import tituloPaginaImg from '../../assets/login/icons/tituloLogin.svg'
import entrarButtom from '../../assets/login/icons/entrar.svg';
import homeImg from '../../assets/login/icons/home.svg';
import imgLogin from '../../assets/icons/btn-login.svg';
import Loading from "../../components/loading/Loading";
import { Alert, Box, Button, ButtonBase, FilledInput, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, SxProps, TextField, Theme } from "@mui/material";
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";


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

let mensagemAlert = "";
let tipoAlert = 0;
let freelaId: string | null = "";
let freelaNome: string | null = "";
let freelaSobrenome: string | null = "";
let freelaNascimento: string | null = "";
let freelaClassificacao: string | null = "";
let freelaEndereco: string | null = "";
let freelaTelefone: string | null = "";
let freelaServico: string | null = "";
let freelaEmail: string | null = "";
let freelaDataCriacao: string | null = "";
let freelaPefil: string | null = "";
let freelaTipo: string | null = "";
let freelaLimit: string | null = ""


const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const pagina = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            pegaDados();
            setLoading(false);
        }, 2000);
    }, []);

    const logout = () => {
        tipoAlert = 0;
        mensagemAlert = "Volte sempre!"
        setMostrarAlert(true);
    
        setTimeout(() => {
          setMostrarAlert(true);
          sessionStorage.clear();
          pagina('/login');
        }, 4000);
      }

    async function pegaDados() {
        try {
            freelaId = sessionStorage.getItem('shFreelaId');
            freelaNome = sessionStorage.getItem('shFreelaNome');
            freelaSobrenome = sessionStorage.getItem('shFreelaSobrenome');
            freelaNascimento = sessionStorage.getItem('shFreelaNascimento');
            freelaEndereco = sessionStorage.getItem('shFreelaEndereco');
            freelaTelefone = sessionStorage.getItem('shFreelaTelefone');
            freelaServico = sessionStorage.getItem('shFreelaServicos');
            freelaEmail = sessionStorage.getItem('shFreelaEmail');
            freelaClassificacao = sessionStorage.getItem('shFreelaClassificacao');
            freelaDataCriacao = sessionStorage.getItem('shFreelaDataCriacao');
            freelaPefil = sessionStorage.getItem('shFreelaPerfil');
            freelaTipo = sessionStorage.getItem('shFreelaTipo');
            freelaLimit = sessionStorage.getItem('shFreelaLimite');

        } catch (error) {
            tipoAlert = 4;
            mensagemAlert = "Dados não encontrados"
            console.log(error);
        }
    }

    return (
        <main className="sh-perfil">
            {loading && <Loading />}

            <header className="sh-perfil-header">
                <div className="sh-perfil-header-logo">
                    <img src={logoImg} alt="" />
                </div>

                <ul className="sh-perfil-header-options">
                    <li className="sh-header-options-item">
                        <Link to="/home-freelancer" className="sh-header-item-text">Home</Link>
                    </li>
                    <li className="sh-header-options-item" onClick={logout}>
                        <p className="sh-header-item-text">Sair</p>
                    </li>
                </ul>
            </header>
            <main className="sh-perfil-main">
                <ul className="sh-dados-lista">
                    <li className="sh-dados-item">
                        img perfil
                    </li>
                    <li className="sh-dados-item">
                        <h5 className="sh-dadis-item-titulo">Nome</h5>
                        <p className="sh-dados-item-text">{freelaNome} {freelaSobrenome}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h5 className="sh-dadis-item-titulo">Classificação</h5>
                        <p className="sh-dados-item-text">{freelaClassificacao}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h5 className="sh-dadis-item-titulo">Data de nascimentp</h5>
                        <p className="sh-dados-item-text">{freelaNascimento}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h5 className="sh-dadis-item-titulo">Endereço</h5>
                        <p className="sh-dados-item-text">{freelaEndereco}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h5 className="sh-dadis-item-titulo">Telefone</h5>
                        <p className="sh-dados-item-text">{freelaTelefone}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h5 className="sh-dadis-item-titulo">Servicos</h5>
                        <p className="sh-dados-item-text">{freelaServico}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h5 className="sh-dadis-item-titulo">Email</h5>
                        <p className="sh-dados-item-text">{freelaEmail}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h5 className="sh-dadis-item-titulo">Data de criação da conta</h5>
                        <p className="sh-dados-item-text">{freelaDataCriacao}</p>
                    </li>
                    <li className="sh-dados-item">
                        <HandymanIcon />
                        <p className="sh-dados-item-text">{freelaLimit}</p>
                    </li>
                </ul>
            </main>

            {mostrarAlert &&
                <div className="sh-alerts">
                    <ShAlert />
                </div>
            }
        </main>
    )
}

export default Perfil;