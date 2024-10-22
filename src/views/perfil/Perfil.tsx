import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Perfil.css';

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


const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [mostrarAlert, setMostrarAlert] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <main className="sh-perfil">
            {loading && <Loading />}

            <article className="sh-dados-perfil">
                Perfil
            </article>

            {mostrarAlert &&
                <div className="sh-alerts">
                    <ShAlert />
                </div>
            }
        </main>
    )
}

export default Perfil;