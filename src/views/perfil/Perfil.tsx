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
        // try {
        //     freelaId = sessionStorage.getItem('shFreelaId');
        //     freelaNome = sessionStorage.getItem('shFreelaNome');
        //     freelaSobrenome = sessionStorage.getItem('shFreelaSobrenome');
        //     freelaNascimento = sessionStorage.getItem('shFreelaNascimento');
        //     freelaEndereco = sessionStorage.getItem('shFreelaEndereco');
        //     freelaTelefone = sessionStorage.getItem('shFreelaTelefone');
        //     freelaServico = sessionStorage.getItem('shFreelaServicos');
        //     freelaEmail = sessionStorage.getItem('shFreelaEmail');
        //     freelaClassificacao = sessionStorage.getItem('shFreelaClassificacao');
        //     freelaDataCriacao = sessionStorage.getItem('shFreelaDataCriacao');
        //     freelaPefil = sessionStorage.getItem('shFreelaPerfil');
        //     freelaTipo = sessionStorage.getItem('shFreelaTipo');
        //     freelaLimit = sessionStorage.getItem('shFreelaLimite');

        // } catch (error) {
        //     tipoAlert = 4;
        //     mensagemAlert = "Dados não encontrados"
        //     console.log(error);
        // }

        userId = sessionStorage.getItem('shUserLogId');
        userTipo = sessionStorage.getItem('shUserLogTipo');

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('acao', 'dados_perfil');

            if (userTipo === "0") {
                formData.append('idfre', `${userId}`);
                console.log('freelancer');
                console.log(formData.get('idfre'));
            }
            else {
                formData.append('idcliente', `${userId}`);
                console.log('cliente');
            }

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();
            const dadosUsuario = response.dadosUser;
            const servicosAceitosData = response.servAceitos;


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
            }
            else {
                console.log(response.status)
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
                        <h5 className="sh-dadis-item-titulo">Data de nasciment0</h5>
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

                {
                    servicosAceitos[0] && <article className="sh-perfil-servicos-aceitos">
                        <ServicosAdequados data={servicosAceitos} />
                    </article>
                }

                <div>
                    <h1>dddd</h1>
                    <h1>dddd</h1>
                    <h1>dddd</h1>
                    <h1>dddd</h1>
                    <h1>dddd</h1>
                    <h1>dddd</h1>
                    <h1>dddd</h1>
                </div>
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