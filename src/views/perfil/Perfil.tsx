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
import ServicosAdequados from "../../components/servicosAdequados/ServicosAdequados";
import fotoPerfil from '../../assets/perfil/icons/perfil.png';
import imgEstrelas from '../../assets/perfil/icons/estrela.svg';

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
let freelaLimit: string | null = ""

let mensagemAlert = "";
let tipoAlert = 0;
let userId: string | null = "";
let userTipo: string | null = "";

const servicosAceitos: any = [];
const servicosFinalizados: any = [];


const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const pagina = useNavigate();

    useEffect(() => {
        pegaDados();
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

    function formatData(data: any) {
        let dataFormatUm = new Date(data);
        let dia = `${dataFormatUm.getDate()}`;
        let mes = `${dataFormatUm.getMonth() + 1}`;
        let ano = dataFormatUm.getFullYear();

        if (dia.length < 2) {
            dia = `0${dia}`;
        }

        if (mes.length < 2) {
            mes = `0${mes}`;
        }

        return (`${dia}/${mes}/${ano}`);
    }

    async function pegaDados() {
        userId = sessionStorage.getItem('shUserLogId');
        userTipo = sessionStorage.getItem('shUserLogTipo');

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('acao', 'dados_perfil');

            if (userTipo === "0") {
                formData.append('idfre', `${userId}`);
            }
            else {
                formData.append('idcliente', `${userId}`);
            }

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();
            const dadosUsuario = response.dadosUser;
            const servicosAceitosData = response.servAceitos;
            const servicosFinalizadosData = response.servConc;
            console.log(response);

            if (response.status === 200) {
                // console.log(response);

                freelaNome = dadosUsuario[0].nome;
                freelaSobrenome = dadosUsuario[0].sobrenome;
                freelaNascimento = formatData(dadosUsuario[0].nascimento);
                freelaClassificacao = dadosUsuario[0].classificacao;
                freelaEndereco = dadosUsuario[0].endereco;
                freelaTelefone = dadosUsuario[0].telefone;
                freelaServico = dadosUsuario[0].servicos;
                freelaEmail = dadosUsuario[0].email;
                freelaDataCriacao = formatData(dadosUsuario[0].data_de_criacao);
                freelaPefil = dadosUsuario[0].imagem_perfil;
                freelaLimit = dadosUsuario[0].limite;
                setLoading(false);

                if (servicosAceitos[0] === undefined) {
                    servicosAceitosData.map((dados: any) => {
                        servicosAceitos.push({
                            id: dados.id,
                            clienteId: dados.cliente_id,
                            tag: dados.tipo,
                            data: dados.data_servico,
                            endereco: dados.local_servico,
                            descricao: dados.descricao,
                            remuneracao: dados.remuneracao,
                            status: dados.status
                        });
                    })
                }

                if (servicosFinalizados[0] === undefined) {
                    servicosFinalizadosData.map((dados: any) => {
                        servicosFinalizados.push({
                            id: dados.id,
                            clienteId: dados.cliente_id,
                            tag: dados.tipo,
                            data: dados.data_servico,
                            endereco: dados.local_servico,
                            descricao: dados.descricao,
                            remuneracao: dados.remuneracao,
                            // status: dados.status
                        });
                    })
                }
            }
            else {
                tipoAlert = 3;
                mensagemAlert = "Dados não retornados!"
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
                    <li className="sh-dados-item perfil-foto-nome">
                        <div className="sh-dados-perfil-img">
                            {
                                freelaPefil &&
                                <img src={`${freelaPefil}`} alt="" />
                            }
                            {
                                !freelaPefil &&
                                <img src={fotoPerfil} alt="" />
                            }
                        </div>
                        <div>
                            <p className="sh-dados-item-text">{freelaNome} {freelaSobrenome}</p>
                        </div>
                    </li>
                    <li className="sh-dados-item sh-dados-dadosBase">
                        <div className="sh-dadosBase-item">
                            <img src={imgEstrelas} />
                            <p className="sh-dados-item-text">{freelaClassificacao}</p>
                        </div>
                        <div className="sh-dadosBase-item">
                            <HandymanIcon />
                            <p className="sh-dados-item-text">{freelaLimit}</p>
                        </div>
                    </li>
                    <li className="sh-dados-item sh-nascimento">
                        <h6 className="sh-dados-item-titulo">Data de nascimento</h6>
                        <p className="sh-dados-item-text">{freelaNascimento}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h6 className="sh-dados-item-titulo">Endereço</h6>
                        <p className="sh-dados-item-text">{freelaEndereco}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h6 className="sh-dados-item-titulo">Telefone</h6>
                        <p className="sh-dados-item-text">{freelaTelefone}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h6 className="sh-dados-item-titulo">Servicos</h6>
                        <p className="sh-dados-item-text">{freelaServico}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h6 className="sh-dados-item-titulo">Email</h6>
                        <p className="sh-dados-item-text">{freelaEmail}</p>
                    </li>
                    <li className="sh-dados-item">
                        <h6 className="sh-dados-item-titulo">Data de criação da conta</h6>
                        <p className="sh-dados-item-text">{freelaDataCriacao}</p>
                    </li>
                    {/* <li className="sh-dados-item">
                        <HandymanIcon />
                        <p className="sh-dados-item-text">{freelaLimit}</p>
                    </li> */}
                </ul>

                {
                    servicosAceitos[0] && 
                    <div className="sh-servicos-aceitos">
                        <h2 className="sh-servicos-titulo">Servicos aceitos</h2>
                        <article className="sh-perfil-servicos-aceitos">
                            <ServicosAdequados data={servicosAceitos} />
                        </article>
                    </div>
                }
                {
                    servicosAceitos[0] && 
                    <div className="sh-servicos-aceitos">
                        <h2 className="sh-servicos-titulo">Servicos realizados</h2>
                        <article className="sh-perfil-servicos-aceitos">
                            <ServicosAdequados data={servicosFinalizados} />
                        </article>
                    </div>
                }
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