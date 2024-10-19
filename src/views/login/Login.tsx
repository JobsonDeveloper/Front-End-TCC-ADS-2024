import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

// Components
import logoImg from '../../assets/login/icons/logo.svg';
import imgDescricao from '../../assets/icons/descricao.svg';
import tituloPaginaImg from '../../assets/login/icons/tituloLogin.svg'
import entrarButtom from '../../assets/login/icons/entrar.svg';
import homeImg from '../../assets/login/icons/home.svg';
import imgLogin from '../../assets/icons/btn-login.svg';
import Loading from "../../components/loading/Loading";
import { Alert, Box, Button, ButtonBase, FilledInput, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, SxProps, TextField, Theme } from "@mui/material";
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";

const styledTextField = {
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontFamily: '"Nunito", sans-serif;',
        color: '#000'
    },
};

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


const Login = () => {
    const [loading, setLoading] = useState(true);
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const pagina = useNavigate();
    const [mostrarAlert, setMostrarAlert] = useState(false);

    async function login() {
        if ((cpf == '') || (senha == '')) {
            tipoAlert = 2;
            mensagemAlert = "Preencha todos os campos!"
            setMostrarAlert(true);
            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('acao', 'login');
                formData.append('cpf', `${cpf}`);
                formData.append('senha', senha);

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response.status === 202) {
                    tipoAlert = 0;
                    mensagemAlert = "Bem vindo!"
                    setMostrarAlert(true);
                    
                    setTimeout(() => {
                        setMostrarAlert(false);
                        setLoading(false);

                        sessionStorage.setItem('shUserLogId', `${response.data.id}`);
                        sessionStorage.setItem('shUserLogTipo', `${response.data.tipo}`);

                        if(response.data.tipo === '1') {
                            pagina('/home-cliente');
                        }
                        else {
                            pagina('/home-freelancer');
                        }
                    }, 4000);

                }
                else if (response.status === 400) {
                    tipoAlert = 2;
                    mensagemAlert = "Usuário ou senha incorretos!"
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        setLoading(false);
                    }, 4000);
                }
                else {
                    console.log(response.status)
                    tipoAlert = 3;
                    mensagemAlert = "Erro ao logar no site!"
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        setLoading(false);
                    }, 4000);
                }


            }
            catch (error) {
                tipoAlert = 3;
                mensagemAlert = "Erro de requisição!"
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
                console.error(error);
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <main className="sh-login">
            {loading && <Loading />}

            <section className="sh-formulario-login">
                <article className="sh-login-header">
                    <Link to="/"><img src={logoImg} alt="" className="sh-login-logoImg" /></Link>
                    <img src={tituloPaginaImg} alt="" className="sh-login-tituloPagina" />
                </article>

                <div className="sh-dados-login">
                    <div className="sh-formulario-main-content">
                        <TextField
                            id="sh_user"
                            label="CPF"
                            variant="standard"
                            className="sh-formulario-data-text"
                            sx={styledTextField}
                            onChange={((e) => { setCpf(e.target.value) })}
                            defaultValue=""
                        />
                    </div>
                    <div className="sh-formulario-main-content">
                        <TextField
                            id="sh_password"
                            label="Senha"
                            variant="standard"
                            type="password"
                            className="sh-formulario-data-text"
                            sx={styledTextField}
                            onChange={((e) => { setSenha(e.target.value) })}
                            defaultValue=""
                        />
                    </div>
                </div>

                <article className="sh-login-buttons">
                    <Link to="/" className="sh-login-button-home-link"> <img src={homeImg} alt="Butão para voltar para a home" className="sh-login-button-home" /> </Link>
                    <button type="button" className="sh-login-button" onClick={login}>
                        <img src={entrarButtom} alt="" className="sh-footer-btn-img" />
                    </button>
                </article>
            </section>

            {mostrarAlert &&
                <div className="sh-alerts">
                    <ShAlert />
                </div>
            }
        </main>
    )
}

export default Login;