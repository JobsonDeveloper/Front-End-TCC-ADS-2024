import { Alert, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Stack, TextField } from "@mui/material";
import React, { SetStateAction, useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import './DadosUsuario.css';
import imgPerfilPadrao from '../../assets/icons/perfil.svg';
import imgEstrelas from '../../assets/icons/estrela.svg';
import { TransitionProps } from "@mui/material/transitions";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

let userId: string | null = ''
let userTipo: string | null = ''

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

const styledTextField = {
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontFamily: '"Nunito", sans-serif;',
        color: '#000'
    },
};

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

const styledDialogEditaPerfil = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px'
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

function formatDataBanco(data: any) {
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

    return (`${ano}-${mes}-${dia}`);
}

const DadosUsuario = ({ setMostrarAlert, setTipoAlert, setMensagemAlert, setOpenConfirm }: any) => {
    const [loading, setLoading] = useState(true);
    // const [mostrarAlert, setMostrarAlert] = useState(false);
    const pagina = useNavigate();

    // Dados do usuario
    const [userNome, setUserNome] = useState<string>();
    const [userSobrenome, setUserSobrenome] = useState<string>();
    const [userNascimento, setUserNascimento] = useState<string>();
    const [userEndereco, setUserEndereco] = useState<string>();
    const [userTelefone, setUserTelefone] = useState<string>();
    const [userEmail, setUserEmail] = useState<string>();
    const [userDataCriacao, setUserDataCriacao] = useState<string>();
    const [userImgPerfil, setUserImgPerfil] = useState<string>();
    const [userClassificacao, setUserClassificacao] = useState<string>();
    const [userServicos, setUserServicos] = useState<string>();
    const [userApresentacao, setUserApresentacao] = useState<string>();
    const [userLimite, setUserLimite] = useState<string>();
    const [open, setOpen] = React.useState(false);
    const [openDialogConfirmExcluiConta, setOpenDialogConfirmExcluiConta] = React.useState(false);
    const [openDialogEditarPerfil, setOpenDialogEditarPerfil] = React.useState(false);
    const [novoNome, setNovoNome] = useState<string>();
    const [novoSobrenome, setNovoSobrenome] = useState<string>();
    const [novaDataNascimento, setNovaDataNascimento] = useState<string>();
    const [novoEndereco, setNovoEndereco] = useState<string>();
    const [novoTelefone, setNovoTelefone] = useState<string>();
    const [novoServicoUm, setNovoServicoUm] = useState<string>();
    const [novoServicoDois, setNovoServicoDois] = useState<string>();
    const [novoServicoTres, setNovoServicoTres] = useState<string>();
    const [novoEmail, setNovoEmail] = useState<string>();
    const [novaSenha, setNovaSenha] = useState<string>();
    const [novaApresentacao, setNovaApresentacao] = useState<string>();
    const capturaServicos = { options: dadosServicos.map((option) => option) };

    const abreDialogConfirmExcluiImgPerfil = () => {
        setOpen(true);
    };

    const fecharDialogConfirmExcliImgPerfil = () => {
        setOpen(false);
    };

    const abreDialogConfirmExcluiPerfil = () => {
        setOpenDialogConfirmExcluiConta(true);
    };

    const fecharDialogConfirmExcluiPerfil = () => {
        setOpenDialogConfirmExcluiConta(false);
    };

    const abreDialogEditaPerfil = () => {
        setOpenDialogEditarPerfil(true);
    };

    const fechaDialogEditarPerfil = () => {
        setOpenDialogEditarPerfil(false);
    };

    async function leituraDeImagem(arquivo: FileList | null) {
        if (arquivo) {
            let tipoArquivo = arquivo[0].type;

            if (arquivo.length < 1) {
                setTipoAlert(3);
                setMensagemAlert("A imagem não foi fornecida!");
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                }, 4000);
            }
            else if ((tipoArquivo !== 'image/png') && (tipoArquivo !== 'image/jpeg')) {
                setTipoAlert(3);
                setMensagemAlert("Formatos aceitos: PNG ou JPEG");
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                }, 4000);
            }
            else {
                if (arquivo[0].size > 60000) {
                    setTipoAlert(3);
                    setMensagemAlert("A imagem é muito pesada!");
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                    }, 4000);
                }
                else {
                    if (arquivo[0] !== null) {
                        let lerImagem = new FileReader();

                        lerImagem.onload = function (imagem) {
                            if (imagem.target) {
                                mudaFotoPerfil(imagem.target.result);
                            }
                        }

                        lerImagem.readAsDataURL(arquivo[0]);
                    }
                }
            }
        }
    }

    async function mudaFotoPerfil(base64: string | ArrayBuffer | null) {
        if (typeof base64 === 'string') {
            try {
                const formData = new FormData();
                formData.append('acao', 'muda_foto_perfil');
                formData.append('imagem', `${base64}`);

                if (userTipo === "0") {
                    formData.append('idFree', `${userId}`);
                }
                else {
                    formData.append('idCliente', `${userId}`);
                }

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response.status === 201) {
                    window.location.reload();
                }
                else {
                    setTipoAlert(3);
                    setMensagemAlert("Foto não modificada!");
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        setLoading(false);
                    }, 4000);
                }
            }
            catch (error) {
                setTipoAlert(3);
                setMensagemAlert("Erro de requisição!");
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
                console.error(error);
            }
        }
        else {
            setTipoAlert(4);
            setMensagemAlert("Tente novamente!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                setLoading(false);
            }, 4000);
        }
    }

    async function pegaDados() {
        try {
            setLoading(true);

            const formData = new FormData();

            if (sessionStorage.getItem('shUserLogTipo') === "0") {
                formData.append('acao', 'dados_freelancer');
                formData.append('idfre', `${sessionStorage.getItem('shUserLogId')}`);
            }
            else {
                formData.append('acao', 'dados_cliente');
                formData.append('idcliente', `${sessionStorage.getItem('shUserLogId')}`);
            }

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();

            if (response.status === 200) {
                const dadosUsuario = response.dadosUser;

                setUserNome(dadosUsuario[0].nome);
                setUserSobrenome(dadosUsuario[0].sobrenome);
                setUserNascimento(formatData(dadosUsuario[0].nascimento));
                setUserEndereco(dadosUsuario[0].endereco);
                setUserTelefone(dadosUsuario[0].telefone);
                setUserEmail(dadosUsuario[0].email);
                setUserApresentacao(dadosUsuario[0].apresentacao);
                setUserDataCriacao(formatData(dadosUsuario[0].data_de_criacao));
                setUserImgPerfil(dadosUsuario[0].imagem_perfil);

                if (userTipo == '0') {
                    setUserServicos(dadosUsuario[0].servicos);
                    setUserLimite(dadosUsuario[0].limite);
                }
                console.log(userTipo);

                setUserClassificacao(dadosUsuario[0].classificacao);

            }
            else {
                setTipoAlert(3);
                setMensagemAlert("Dados não retornados!");
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
            }
        }
        catch (error) {
            setTipoAlert(3);
            setMensagemAlert("Erro de requisição!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                setLoading(false);
            }, 4000);
            console.error(error);
        }
    }

    async function removeFotoPerfil() {
        alert('removida');
        fecharDialogConfirmExcliImgPerfil();
    }

    async function editarDadosPerfil(e: MouseEvent) {
        e.preventDefault();
        const formData = new FormData();

        formData.append('acao', 'editPerfil');

        // Nome
        if (novoNome) {
            formData.append('nome', `${novoNome}`);
        }
        else {
            formData.append('nome', `${userNome}`);
        }

        // Sobrenome
        if (novoSobrenome) {
            formData.append('sobrenome', `${novoSobrenome}`);
        }
        else {
            formData.append('sobrenome', `${userSobrenome}`);
        }

        // Data de nascimento
        if (novaDataNascimento) {
            formData.append('nascimento', `${formatDataBanco(novaDataNascimento)}`);
        }
        else {
            formData.append('nascimento', `${formatDataBanco(userNascimento)}`);
        }

        // Endereço
        if (novoEndereco) {
            formData.append('endereco', `${novoEndereco}`);
        }
        else {
            formData.append('endereco', `${userEndereco}`);
        }

        // Telefone
        if (novoTelefone) {
            formData.append('telefone', `${novoTelefone}`);
        }
        else {
            formData.append('telefone', `${userTelefone}`);
        }

        // E-mail
        if (novoEmail) {
            formData.append('email', `${novoEmail}`);
        }
        else {
            formData.append('email', `${userEmail}`);
        }

        // Senha
        if (novaSenha) {
            formData.append('senha', `${novaSenha}`);
        }

        if (userTipo == '0') {
            formData.append('idFree', `${userId}`);

            // Sertviços
            if (novoServicoUm || novoServicoDois || novoServicoTres) {
                let servicos = '';

                if (novoServicoUm) {
                    servicos = novoServicoUm;
                }

                if (novoServicoUm && novoServicoDois) {
                    servicos += `, ${novoServicoDois}`;
                }
                else if (!novoServicoUm && novoServicoDois) {
                    servicos = novoServicoDois;
                }

                if ((novoServicoUm || novoServicoDois) && novoServicoTres) {
                    servicos += `, ${novoServicoTres}`;
                }
                else if (novoServicoTres) {
                    servicos += novoServicoTres;
                }

                formData.append('servicos', servicos);
            }
            else {
                formData.append('servicos', `${userServicos}`);
            }

            // Apresentação
            if (novaApresentacao) {
                formData.append('apresentacao', `${novaApresentacao}`);
            }
            else {
                formData.append('apresentacao', `${userApresentacao}`);
            }
        }
        else {
            formData.append('idCli', `${userId}`);
        }
        try {

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();

            if (response.status === 201) {
                window.location.reload();
            }
            else {
                setTipoAlert(3);
                setMensagemAlert("Erro ao editar perfil!");
                setMostrarAlert(true);
                setOpenDialogEditarPerfil(false);

                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
            }
        } catch (error) {
            setTipoAlert(3);
            setMensagemAlert("Erro de requisição!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                setLoading(false);
            }, 4000);

            console.error();
        }
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
            userId = sessionStorage.getItem('shUserLogId');
            userTipo = sessionStorage.getItem('shUserLogTipo');
            pegaDados();
        }
    }, []);

    return (
        <>
            {/* Remover foto de Perfil */}
            <Dialog
                open={open}
                onClose={fecharDialogConfirmExcliImgPerfil}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja remover a foto de perfil?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={fecharDialogConfirmExcliImgPerfil} autoFocus>Voltar</Button>
                    <Button onClick={removeFotoPerfil}>Excluir</Button>
                </DialogActions>
            </Dialog>

            {/* Excluir Perfil */}
            <Dialog
                open={openDialogConfirmExcluiConta}
                onClose={fecharDialogConfirmExcluiPerfil}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja excluir o perfil?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={fecharDialogConfirmExcluiPerfil} autoFocus>Voltar</Button>
                    <Button onClick={removeFotoPerfil}>Excluir</Button>
                </DialogActions>
            </Dialog>

            {/* Editar Perfil */}
            <Dialog
                open={openDialogEditarPerfil}
                onClose={fechaDialogEditarPerfil}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Editar perfil"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={styledDialogEditaPerfil}>
                        <TextField
                            label="Nome"
                            variant="standard"
                            type="text"
                            sx={styledTextField}
                            onChange={(e: any) => setNovoNome(e.target.value)}
                            defaultValue={userNome}
                        />

                        <TextField
                            label="Sobrenome"
                            variant="standard"
                            type="text"
                            sx={styledTextField}
                            onChange={(e: any) => setNovoSobrenome(e.target.value)}
                            defaultValue={userSobrenome}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                label="Nascimento"
                                variant="standard"
                                format="DD/MM/YYYY"
                                sx={styledTextField}
                                onChange={(e: any) => setNovaDataNascimento(e)}
                                defaultValue={dayjs(userNascimento)}
                            />
                        </LocalizationProvider>

                        <TextField
                            label="Endereço"
                            variant="standard"
                            type="text"
                            sx={styledTextField}
                            onChange={(e: any) => setNovoEndereco(e.target.value)}
                            defaultValue={userEndereco}
                        />

                        <TextField
                            label="Telefone"
                            variant="standard"
                            type="tel"
                            sx={styledTextField}
                            onChange={(e: any) => setNovoTelefone(e.target.value)}
                            defaultValue={userTelefone}
                        />

                        <TextField
                            label="E-mail"
                            variant="standard"
                            type="text"
                            sx={styledTextField}
                            onChange={(e: any) => setNovoEmail(e.target.value)}
                            defaultValue={userEmail}
                        />

                        <TextField
                            label="Senha"
                            variant="standard"
                            type="text"
                            sx={styledTextField}
                            onChange={(e: any) => setNovaSenha(e.target.value)}
                        />

                        {userTipo === '0' &&
                            <>
                                <Stack spacing={1} sx={styledSelectServicos}>
                                    <Autocomplete
                                        {...capturaServicos}
                                        disableClearable
                                        defaultValue={'Serviço um'}
                                        onChange={(event: any, newValue: string) => {
                                            setNovoServicoUm(newValue);
                                        }}
                                        renderInput={(parametros) => (
                                            <TextField {...parametros}
                                                label=""
                                                variant="standard" />
                                        )}
                                    />
                                </ Stack>

                                <Stack spacing={1} sx={styledSelectServicos}>
                                    <Autocomplete
                                        {...capturaServicos}
                                        disableClearable
                                        defaultValue={'Serviço dois'}
                                        onChange={(event: any, newValue: string) => {
                                            setNovoServicoDois(newValue);
                                        }}
                                        renderInput={(parametros) => (
                                            <TextField {...parametros}
                                                label=""
                                                variant="standard" />
                                        )}
                                    />
                                </ Stack>

                                <Stack spacing={1} sx={styledSelectServicos}>
                                    <Autocomplete
                                        {...capturaServicos}
                                        disableClearable
                                        defaultValue={'Serviço três'}
                                        onChange={(event: any, newValue: string) => {
                                            setNovoServicoTres(newValue);
                                        }}
                                        renderInput={(parametros) => (
                                            <TextField {...parametros}
                                                label=""
                                                variant="standard" />
                                        )}
                                    />
                                </ Stack>

                                <TextField
                                    id="filled-multiline-static"
                                    label="Apresentação"
                                    multiline
                                    maxRows={6}
                                    defaultValue={userApresentacao}
                                />
                            </>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={fechaDialogEditarPerfil} autoFocus>Voltar</Button>
                    <Button onClick={(e) => editarDadosPerfil(e.nativeEvent)}>Editar</Button>
                </DialogActions>
            </Dialog>

            <ul className="sh-dadosPerfil">
                <li className="sh-dadosPerfil-header">
                    <div className="sh-opcoesFotoPerfil">
                        <div className="sh-perfil-foto">
                            {userImgPerfil &&
                                <img src={userImgPerfil} alt="" className="sh-perfil-img" />
                            }
                            {!userImgPerfil &&
                                <img src={imgPerfilPadrao} alt="" className="sh-perfil-img" />
                            }
                        </div>

                        <div className="sh-perfil-classificacao">
                            <img src={imgEstrelas} alt="Estrelas de classificação" className="sh-icon-classificacao" />
                            <p className="sh-numero-classificacao">{userClassificacao}</p>
                        </div>
                    </div>

                    <div className="sh-fotoPerfil-buttons">
                        <label htmlFor="sh_input_file_perfil" className="sh-button-imgPerfil sh-button-mudarFoto">
                            Mudar foto
                        </label>
                        <input
                            type="file"
                            id="sh_input_file_perfil"
                            className="sh-fotoPerfil-input"
                            onChange={((e) => {
                                leituraDeImagem(e.target.files);
                            })}
                        />
                        <button
                            className="sh-button-imgPerfil sh-button-removerFoto"
                            onClick={abreDialogConfirmExcluiImgPerfil}
                        >
                            Remover foto
                        </button>
                    </div>
                </li>

                <li className="sh-dadosPerfil-main">
                    <ul className="sh-dadosPerfil-informacoes">
                        <li className="sh-dadosPerfil-main-titulos">Dados básicos</li>

                        <li className="sh-dadosPerfil-main-subtitulos">Nome</li>
                        <li className="sh-dadosPerfil-main-textos">{userNome}</li>

                        <li className="sh-dadosPerfil-main-subtitulos">Sobrenome</li>
                        <li className="sh-dadosPerfil-main-textos">{userSobrenome}</li>

                        <li className="sh-dadosPerfil-main-subtitulos">Data de nascimento</li>
                        <li className="sh-dadosPerfil-main-textos">{userNascimento}</li>

                        <li className="sh-dadosPerfil-main-subtitulos">Endereço</li>
                        <li className="sh-dadosPerfil-main-textos">{userEndereco}</li>

                        <li className="sh-dadosPerfil-main-subtitulos">Limite atual de serviços</li>
                        <li className="sh-dadosPerfil-main-textos">{userLimite}</li>
                    </ul>

                    <ul className="sh-dadosPerfil-informacoes">
                        <li className="sh-dadosPerfil-main-titulos">Informações adicionais</li>

                        <li className="sh-dadosPerfil-main-subtitulos">Serviços fornecidos</li>
                        <li className="sh-dadosPerfil-main-textos">{userServicos}</li>

                        <li className="sh-dadosPerfil-main-subtitulos">Telefone</li>
                        <li className="sh-dadosPerfil-main-textos">{userTelefone}</li>

                        <li className="sh-dadosPerfil-main-subtitulos">E-mail</li>
                        <li className="sh-dadosPerfil-main-textos">{userEmail}</li>

                        <li className="sh-dadosPerfil-main-subtitulos">Data de criação da conta</li>
                        <li className="sh-dadosPerfil-main-textos">{userDataCriacao}</li>
                    </ul>

                    <div className="sh-dadosPerfil-opcoes">
                        <button className="sh-dadosPerfil-opcoes-buttons sh-options-button-editar" onClick={abreDialogEditaPerfil}>Editar perfil</button>
                        <button className="sh-dadosPerfil-opcoes-buttons sh-options-button-excluir" onClick={abreDialogConfirmExcluiPerfil}>Excluir perfil</button>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default DadosUsuario;