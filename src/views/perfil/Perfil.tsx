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
import { Alert, Autocomplete, Box, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, fabClasses, FilledInput, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Stack, SxProps, TextField, Theme, useMediaQuery, useTheme } from "@mui/material";
import { Edit, Padding, Visibility, VisibilityOff } from "@mui/icons-material";
import ServicosAdequados from "../../components/servicosAdequados/ServicosAdequados";
import fotoPerfil from '../../assets/perfil/icons/perfil.png';
import imgEstrelas from '../../assets/perfil/icons/estrela.svg';
import Servicos from "../../components/servicos/Servicos";
import Footer from "../../components/footer/Footer";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HeaderPerfilFreela from "../../components/headerPerfilFreela/HeaderPerfilFreela";

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

const styledDialogService = {
    '& .sh-servico-dialog-titulo': {
        color: '#000',
        fontSize: '1.4rem',
        fontFamily: '"Nunito", sans-serif'
    },

    '& .sh-servico-dialog-dados': {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',

        '& .sh-servico-subtitulos': {
            fontSize: '1.1rem',
            color: '#000',
        },

        '& .sh-servico-dados': {
            fontSize: '.9rem',
            color: '#494949',
            display: 'flex',
            alignItems: 'end',
            columnGap: '5px',

            '& .sh-dialog-estrelas': {
                width: '25px',
            }
        }
    },

    '& .sh-dados-atualizar': {
        fontFamily: '"Roboto", sans-serif',

        '& .sh-servico-subtitulos': {
            '& .sh-dados-fotos-input': {
                display: 'none'
            },
            '& .sh-dados-fotos-label': {
                backgroundColor: '#f6f6f692',
                boxShadow: '0 0 5px #bcbcbc',
                padding: '10px',
                borderRadius: '5px',
                width: '100%',
                textAlign: 'center'
            }
        }
    },
    '@media(min-width: 576px)': {
        '& .sh-dados-atualizar': {
            fontFamily: '"Roboto", sans-serif',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
        }
    }
}

const styledTextField = {
    '& .sh-cadastro-nome': {
        minWidth: '100%'
    },
    '& .MuiInputBase-input': {
        fontFamily: '"Roboto", sans-serif',
        fontSize: '1rem',
        minWidth: '100%'
    }
}

const styledSelectServicos = {
    '& .MuiSelect-select': {
        width: '100px',
    },

    '& .css-1umw9bq-MuiSvgIcon-root': {
        display: 'none'
    },

    '& .MuiInputBase-input': {
        color: '#494949',
        fontFamily: '"Nunito", sans-serif',
        fontSize: '1rem'
    }
}

let userNome: string | null = "";
let userSobrenome: string | null = "";
let userNascimento: string | null = "";
let userClassificacao: string | null = "";
let userEndereco: string | null = "";
let userTelefone: string | null = "";
let freelaServico: string | null = "";
let userEmail: string | null = "";
let userDataCriacao: string | null = "";
let userFotoPerfil: string | null = "";
let freelaLimit: string | null = ""

let mensagemAlert = "";
let tipoAlert = 0;
let userId: string | null = "";
let userTipo: string | null = "";
let tipoUsuario: string | null = "";

const servicosAceitos: any = [];
const servicosFinalizados: any = [];
const servicosRegistrados: any = [];

const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const pagina = useNavigate();
    const [openDelete, setOpenDelete] = useState(false);
    const [openEditPerfil, setOpenEditPerfil] = useState(false);
    const [novNome, setNovNome] = useState('');
    const [novSobrenome, setNovSobrenome] = useState('');
    const [novTelefone, setNovTelefone] = useState('');
    const [novEmail, setNovEmail] = useState('');
    const [novNascimento, setNovNascimento] = useState('');
    const [novImgPerfil, setNovImgPerfil] = useState('');
    const [novSenha, setNovSenha] = useState('');
    const [novServicos, setNovServicos] = useState('');
    const [novEndereco, setNovEndereco] = useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [imgPerfil, setImgPerfil] = useState();
    const [openNovoServico, setOpenNovoServico] = useState(false);

    const dadosServicos = [
        'Reparo de Televisor',
        'Reparo de Notebook',
        'Reparo de Computador',
        'Reparo de Ar-condicionado',
        'Reparo de Smartphone',
        'Instalação de Ar-condicionado',
        'Instalação de Câmera',
        'Reparo de Geladeira',
        'Reparo de Microondas',
        'Reparo de Console'
    ];

    const [servicoTipo, setServicoTipo] = useState('');
    const [servicoData, setServicoData] = useState('');
    const [servicoDescricao, setServicoDescricao] = useState('');
    const [servicoRemuneracao, setServicoRemuneracao] = useState('');
    const [servicoEndereco, setServicoEndereço] = useState('');
    const [servicoTipoValor, setServicoTipoValor] = useState<string | null>('Tipo');
    const capturaServicos = { options: dadosServicos.map((option) => option) };
    const [dataServico, setDataServico] = useState('');

    useEffect(() => {
        if ((!sessionStorage.getItem('shUserLogId')) || (!sessionStorage.getItem('shUserLogTipo'))) {
            tipoAlert = 3;
            mensagemAlert = "Faça login antes!";
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else {
            tipoUsuario = sessionStorage.getItem('shUserLogTipo');
            pegaDados();
        }
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

            if (response.status === 200) {
                const dadosUsuario = response.dadosUser;
                const servicosAceitosData = response.servAceitos;
                const servicosFinalizadosData = response.servConc;

                console.log(response);

                if (userTipo === "1") {
                    const servicosRegistradosData = response.servRegist;

                    if (servicosRegistrados[0] === undefined) {
                        servicosRegistradosData.map((dados: any) => {
                            servicosRegistrados.push({
                                id: dados.id,
                                tag: dados.tipo,
                                descricao: dados.descricao,
                                remuneracao: dados.remuneracao,
                            });
                        })
                    }

                    userNome = dadosUsuario.nome;
                    userSobrenome = dadosUsuario.sobrenome;
                    userNascimento = formatData(dadosUsuario.nascimento);
                    userClassificacao = dadosUsuario.classificacao;
                    userEndereco = dadosUsuario.endereco;
                    userTelefone = dadosUsuario.telefone;
                    userEmail = dadosUsuario.email;
                    userDataCriacao = formatData(dadosUsuario.data_de_criacao);
                    userFotoPerfil = dadosUsuario.imagem_perfil;

                }
                else {
                    userNome = dadosUsuario[0].nome;
                    userSobrenome = dadosUsuario[0].sobrenome;
                    userNascimento = formatData(dadosUsuario[0].nascimento);
                    userClassificacao = dadosUsuario[0].classificacao;
                    userEndereco = dadosUsuario[0].endereco;
                    userTelefone = dadosUsuario[0].telefone;
                    userEmail = dadosUsuario[0].email;
                    userDataCriacao = formatData(dadosUsuario[0].data_de_criacao);
                    userFotoPerfil = dadosUsuario[0].imagem_perfil;
                    freelaServico = dadosUsuario[0].servicos;
                    freelaLimit = dadosUsuario[0].limite;
                }

                setLoading(false);

                if (servicosAceitos[0] === undefined) {
                    servicosAceitosData.map((dados: any) => {
                        servicosAceitos.push({
                            id: dados.id,
                            clienteId: dados.cliente_id,
                            freelaId: dados.freelancer_id,
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
                            status: dados.status,
                            freelaId: dados.freelancer_id
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

    async function excluirConta(e: any) {
        e.preventDefault();
        setOpenDelete(false);

        userId = sessionStorage.getItem('shUserLogId');
        userTipo = sessionStorage.getItem('shUserLogTipo');

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('acao', 'user_exclui_conta');
            formData.append('id', `${userId}`);
            formData.append('tipo', `${userTipo}`);

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();

            if (response.status === 200) {
                pagina('/login')
                sessionStorage.clear();
                localStorage.clear();
            }
            else {
                tipoAlert = 3;
                mensagemAlert = "Usuário não excluido!"
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

    const handleClose = () => {
        setOpenDelete(false);
    };
    const handleCloseEditPerfil = () => {
        setOpenDelete(false);
    };
    const handleCloseNovoServico = () => {
        setOpenNovoServico(false);
    }

    async function editPerfil(e: any) {
        e.preventDefault();
        setOpenEditPerfil(false);

        userId = sessionStorage.getItem('shUserLogId');
        userTipo = sessionStorage.getItem('shUserLogTipo');
        let base64Img = "";

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('acao', 'editPerfil');
            formData.append('id', `${userId}`);
            formData.append('tipo', `${userTipo}`);

            formData.append('nome', `${novNome}`);
            formData.append('sobrenome', `${novSobrenome}`);
            formData.append('telefone', `${novTelefone}`);
            formData.append('email', `${novEmail}`);
            formData.append('nascimento', `${novNascimento}`);
            formData.append('imgPerfil', `${novImgPerfil}`);
            formData.append('senha', `${novSenha}`);
            formData.append('servicos', `${novServicos}`);
            formData.append('endereco', `${novEndereco}`);

            let lerImagemUm = new FileReader();
            let lerImagemDois = new FileReader();
            let lerImagemTres = new FileReader();

            lerImagemUm.onload = function (arquivo: any) {
                base64Img = arquivo.target.result;
            }

            if (imgPerfil) {
                lerImagemUm.readAsDataURL(imgPerfil[0]);
            }

            // const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
            //     method: 'POST',
            //     mode: 'cors',
            //     body: formData
            // });

            // const response = await request.json();

            // if (response.status === 200) {
            //     window.location.reload();
            // }
            // else {
            //     tipoAlert = 3;
            //     mensagemAlert = "Erro ao editar!"
            //     setMostrarAlert(true);

            //     setTimeout(() => {
            //         setMostrarAlert(false);
            //         setLoading(false);
            //     }, 4000);
            // }


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

    async function novoServico(e: any) {
        e.preventDefault();

        if ((servicoTipo != "Tipo") && (servicoDescricao != "") && (servicoRemuneracao != "")) {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('acao', 'cadserv');
                formData.append('cliente', `${userId}`);

                if (servicoData === "NaN/NaN/NaN") {
                    formData.append('data', '');
                } else {
                    formData.append('data', `${dataServico}`);
                }

                if (servicoEndereco === "") {
                    formData.append('local', `${userEndereco}`);
                }
                else {
                    formData.append('local', `${servicoEndereco}`);
                }

                formData.append('desc', `${servicoDescricao}`);
                formData.append('grana', `${servicoRemuneracao}`);
                formData.append('tipo', `${servicoTipoValor}`);

                // console.log(data);

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response.status === 201) {
                    window.location.reload();
                    setLoading(false);
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


        } else {
            tipoAlert = 3;
            mensagemAlert = "Preencha todos os campos!"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
    }

    const pegaImgRgFrente = (documento: any) => {
        let imgFrenteRg = documento.target.files;
        let tipoImgFrenteRg = imgFrenteRg[0].type;

        if (imgFrenteRg < 1) {
            tipoAlert = 2;
            mensagemAlert = "A imagem não foi fornecida!"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else if (
            (tipoImgFrenteRg != 'image/png')
            && (tipoImgFrenteRg != 'image/jpeg')
        ) {
            tipoAlert = 2;
            mensagemAlert = "Formatos aceitos: PNG ou JPEG"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else {
            setImgPerfil(imgFrenteRg);
        }
    }

    return (
        <main className="sh-perfil">
            {loading && <Loading />}

            <HeaderPerfilFreela
                setMostrarAlert={setMostrarAlert}
                tipoUsuario={userTipo}
            />

            {/* <header className="sh-perfil-header">
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
                                userFotoPerfil &&
                                <img src={`${userFotoPerfil}`} alt="" />
                            }
                            {
                                !userFotoPerfil &&
                                <img src={fotoPerfil} alt="" />
                            }
                        </div>
                        <div className="sh-dados-headerDois">
                            <p className="sh-dados-item-text">{userNome} {userSobrenome}</p>
                            <div className="sh-dados-adicionais">
                                <div className="sh-dadosBase-item">
                                    <img src={imgEstrelas} />
                                    <p className="sh-dados-item-text">{userClassificacao}</p>
                                </div>
                                {userTipo === '0' &&
                                    <div className="sh-dadosBase-item">
                                        <HandymanIcon />
                                        <p className="sh-dados-item-text">{freelaLimit}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </li>
                    <li className="sh-dados-item sh-nascimento">
                        <h6 className="sh-dados-item-titulo">Data de nascimento:</h6>
                        <p className="sh-dados-item-text">{userNascimento}</p>
                    </li>
                    <li className="sh-dados-item sh-endereco">
                        <h6 className="sh-dados-item-titulo">Endereço:</h6>
                        <p className="sh-dados-item-text">{userEndereco}</p>
                    </li>
                    <li className="sh-dados-item sh-telefone">
                        <h6 className="sh-dados-item-titulo">Telefone:</h6>
                        <p className="sh-dados-item-text">{userTelefone}</p>
                    </li>
                    {userTipo === "0" &&
                        <li className="sh-dados-item sh-servicos">
                            <h6 className="sh-dados-item-titulo">Servicos:</h6>
                            <p className="sh-dados-item-text">{freelaServico}</p>
                        </li>
                    }
                    <li className="sh-dados-item sh-email">
                        <h6 className="sh-dados-item-titulo">Email:</h6>
                        <p className="sh-dados-item-text">{userEmail}</p>
                    </li>
                    <li className="sh-dados-item sh-criacao">
                        <h6 className="sh-dados-item-titulo">Data de criação da conta:</h6>
                        <p className="sh-dados-item-text">{userDataCriacao}</p>
                    </li>
                    <li className="sh-perfil-buttons sh-buttons">
                        <button type="button" onClick={(() => { setOpenEditPerfil(true) })} className="sh-perfil-button">Editar perfil</button>
                        <button type="button" onClick={(() => { setOpenDelete(true) })} className="sh-perfil-button button-excluir">Excluir conta</button>
                    </li>
                </ul>

                {
                    userTipo === "1" &&
                    <div className="sh-servicos-aceitos">
                        <h2 className="sh-servicos-titulo">Servicos cadastrados</h2>
                        <article className="sh-perfil-servicos-aceitos">
                            <ServicosAdequados data={servicosRegistrados} />
                        </article>
                    </div>
                }
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
                    // servicosFinalizados[0] &&
                    <div className="sh-servicos-aceitos">
                        <h2 className="sh-servicos-titulo">Servicos concluidos</h2>
                        <article className="sh-perfil-servicos-aceitos">
                            <ServicosAdequados data={servicosFinalizados} />
                        </article>
                    </div>
                }

                {userTipo === "1" &&
                    <div className="sh-adicionar-servico">
                        <button onClick={(() => { setOpenNovoServico(true) })}>Novo serviço</button>
                    </div>
                }
            </main>

            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-avaliacao-title"
                sx={styledDialogService}
            >
                <DialogContent className='sh-servico-dialog-dados'>
                    <DialogContentText className="sh-servico-subtitulos">
                        Realmente deseja excluir a conta?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={(() => { setOpenDelete(false) })}>
                        Voltar
                    </Button>
                    <Button onClick={((e) => { excluirConta(e) })}>
                        Confirmar
                    </Button>

                </DialogActions>
            </Dialog>

            <Dialog
                open={openEditPerfil}
                onClose={handleCloseEditPerfil}
                fullScreen={fullScreen}
                aria-labelledby="responsive-dialog-avaliacao-title"
                sx={styledDialogService}
            >
                <form onSubmit={editPerfil}>
                    <DialogTitle id="responsive-dialog-title" className='sh-servico-dialog-titulo'>
                        Atualizar perfil
                    </DialogTitle>
                    <DialogContent className='sh-servico-dialog-dados sh-dados-atualizar'>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Nome"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={userNome}
                                onChange={(e) => setNovNome(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Sobrenome"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={userSobrenome}
                                onChange={(e) => setNovSobrenome(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="E-mail"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={userEmail}
                                onChange={(e) => setNovEmail(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Telefone"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={userTelefone}
                                onChange={(e) => setNovTelefone(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Nascimento"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={userNascimento}
                                onChange={(e) => setNovNascimento(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Emdereço"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={userEndereco}
                                onChange={(e) => setNovEndereco(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Senha"
                                variant="standard"
                                type="password"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                onChange={(e) => setNovSenha(e.target.value)}
                            />
                        </DialogContentText>

                        <DialogContentText className="sh-servico-subtitulos">
                            <label htmlFor="ftPerfil" className='sh-dados-fotos-label'>Foto de perfil</label>
                            <input type="file" id='ftPerfil' className='sh-dados-fotos-input' onChange={pegaImgRgFrente} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={(() => { setOpenEditPerfil(false) })}>
                            Voltar
                        </Button>
                        <Button type="submit">
                            Salvar
                        </Button>

                    </DialogActions>
                </form>
            </Dialog>

            <Dialog
                open={openNovoServico}
                onClose={handleCloseNovoServico}
                // fullScreen={fullScreen}
                aria-labelledby="responsive-dialog-avaliacao-title"
                sx={styledDialogService}
            >
                <form onSubmit={novoServico}>
                    <DialogTitle id="responsive-dialog-title" className='sh-servico-dialog-titulo'>
                        Adicionar novo serviço
                    </DialogTitle>
                    <DialogContent className='sh-servico-dialog-dados sh-dados-atualizar'>
                        <DialogContentText className="sh-servico-subtitulos">
                            <Stack spacing={1} sx={styledSelectServicos}>
                                <Autocomplete
                                    {...capturaServicos}
                                    disableClearable
                                    value={`${servicoTipoValor}`}
                                    onChange={(event: any, newValue: string | null) => {
                                        setServicoTipoValor(newValue);
                                        // pegarDadosForm(event)
                                    }}
                                    renderInput={(parametros) => (
                                        <TextField {...parametros}
                                            label=""
                                            variant="standard" />
                                    )}
                                />
                            </ Stack>
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DateField
                                    label="Data (Opcional)"
                                    variant="standard"
                                    format="DD/MM/YYYY"
                                    sx={styledTextField}
                                    onChange={(e: any) => setDataServico(e)}
                                />
                            </LocalizationProvider>
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Descrição"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={servicoDescricao}
                                onChange={(e) => setServicoDescricao(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Remuneração"
                                variant="standard"
                                type="number"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={servicoRemuneracao}
                                onChange={(e) => setServicoRemuneracao(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText className="sh-servico-subtitulos">
                            <TextField
                                label="Endereço (Opcional)"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                className="sh-cadastro-nome"
                                defaultValue={servicoEndereco}
                                onChange={(e) => setServicoEndereço(e.target.value)}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={(() => { setOpenNovoServico(false) })}>
                            Voltar
                        </Button>
                        <Button type="submit">
                            Registrar
                        </Button>

                    </DialogActions>
                </form>
            </Dialog>

            <footer className="sh-perfil-footer">
                <div className="sh-footer">
                    <Footer />
                </div>
            </footer> */}

            {mostrarAlert &&
                <div className="sh-alerts">
                    <ShAlert />
                </div>
            }
        </main>
    )
}

export default Perfil;