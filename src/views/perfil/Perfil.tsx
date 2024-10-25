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
import { Alert, Box, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, fabClasses, FilledInput, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, SxProps, TextField, Theme, useMediaQuery, useTheme } from "@mui/material";
import { Edit, Padding, Visibility, VisibilityOff } from "@mui/icons-material";
import ServicosAdequados from "../../components/servicosAdequados/ServicosAdequados";
import fotoPerfil from '../../assets/perfil/icons/perfil.png';
import imgEstrelas from '../../assets/perfil/icons/estrela.svg';
import Servicos from "../../components/servicos/Servicos";
import Footer from "../../components/footer/Footer";

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

            if (response.status === 200) {

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
                            status: dados.status
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
                setTimeout(() => {
                    console.log(base64Img);
                }, 1000);
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
                        <div className="sh-dados-headerDois">
                            <p className="sh-dados-item-text">{freelaNome} {freelaSobrenome}</p>
                            <div className="sh-dados-adicionais">
                                <div className="sh-dadosBase-item">
                                    <img src={imgEstrelas} />
                                    <p className="sh-dados-item-text">{freelaClassificacao}</p>
                                </div>
                                <div className="sh-dadosBase-item">
                                    <HandymanIcon />
                                    <p className="sh-dados-item-text">{freelaLimit}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="sh-dados-item sh-nascimento">
                        <h6 className="sh-dados-item-titulo">Data de nascimento</h6>
                        <p className="sh-dados-item-text">{freelaNascimento}</p>
                    </li>
                    <li className="sh-dados-item sh-endereco">
                        <h6 className="sh-dados-item-titulo">Endereço</h6>
                        <p className="sh-dados-item-text">{freelaEndereco}</p>
                    </li>
                    <li className="sh-dados-item sh-telefone">
                        <h6 className="sh-dados-item-titulo">Telefone</h6>
                        <p className="sh-dados-item-text">{freelaTelefone}</p>
                    </li>
                    <li className="sh-dados-item sh-servicos">
                        <h6 className="sh-dados-item-titulo">Servicos</h6>
                        <p className="sh-dados-item-text">{freelaServico}</p>
                    </li>
                    <li className="sh-dados-item sh-email">
                        <h6 className="sh-dados-item-titulo">Email</h6>
                        <p className="sh-dados-item-text">{freelaEmail}</p>
                    </li>
                    <li className="sh-dados-item sh-criacao">
                        <h6 className="sh-dados-item-titulo">Data de criação da conta</h6>
                        <p className="sh-dados-item-text">{freelaDataCriacao}</p>
                    </li>
                    <li className="sh-perfil-buttons sh-buttons">
                        <button type="button" onClick={(() => { setOpenEditPerfil(true) })} className="sh-perfil-button">Editar perfil</button>
                        <button type="button" onClick={(() => { setOpenDelete(true) })} className="sh-perfil-button button-excluir">Excluir conta</button>
                    </li>
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
                                defaultValue={freelaNome}
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
                                defaultValue={freelaSobrenome}
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
                                defaultValue={freelaEmail}
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
                                defaultValue={freelaTelefone}
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
                                defaultValue={freelaNascimento}
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
                                defaultValue={freelaEndereco}
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