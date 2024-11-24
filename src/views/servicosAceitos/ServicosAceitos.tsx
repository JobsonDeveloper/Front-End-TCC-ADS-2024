import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './ServicosAceitos.css';
import './ServicosAceitos.css';
import imgPerfilDefault from '../../assets/icons/perfil.png';
import imgClassificacaoEstrela from '../../assets/icons/estrela.svg';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import imgEstrelas from '../../assets/icons/estrela.svg';

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

let userId: string | null = '';
let userTipo: string | null = '';
let servicosAceitos: Array<object> = [];

let idServico: number;
let freelaId: number;
let clienteId: number;

const servicosAdequadosStyle = {
    '& .sh-servico-dialog-dados': {

        '& .sh-dialog-imagem': {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',

            '& .sh-dialog-imagem-servico': {
                width: '260px'
            },

            '& .sh-dialog-dados': {
                display: 'flex',
                flexDirection: 'column',
                listStyleType: 'none',
                padding: '0',

                '& .sh-dialog-dados-tipo-servico': {
                    fontSize: '1.2rem',
                    marginBottom: '15px',
                    fontWeight: '600'
                },

                '& .sh-dialog-dados-titulo': {
                    fontSize: '1.1rem',
                    fontWeight: '500'
                },

                '& .sh-dialog-dados-texto': {
                    fontSize: '.9rem',
                    fontWeight: '400',
                    marginBottom: '20px'
                }
            }
        },

        '& .sh-servico-dados-cliente': {
            display: 'flex',
            gap: '20px',
            marginBottom: '20px',
            // borderBottom: '1px solid #bdbdbd',
            paddingTop: '8px',

            '& .sh-dialog-imagem-cliente': {

                '& .sh-servico-dados-cliente-foto': {
                    width: '35px',
                    height: '35px',
                    borderRadius: '100%'
                }
            },

            '& .sh-dialog-nome-cliente': {
                display: 'flex',
                alignItems: 'center'
            },

            '& .sh-dialog-classificacao-cliente': {
                display: 'flex',
                gap: '5px',

                '& .sh-dialog-classificacao-img': {
                    width: '20px'
                },

                '& .sh-dialog-classificacao-numero': {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '.9rem',
                }
            }
        },

        '& .sh-servico-subtitulo': {
            fontSize: '1.1rem',
            fontWeight: '500'
        }
    },

    '@media (min-width: 992px)': {
        '& .sh-servico-dialog-dados': {

            '& .sh-dialog-imagem': {
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',

                '& .sh-dialog-dados': {
                    display: 'flex',
                    flexDirection: 'column',
                    listStyleType: 'none',
                    padding: '0',

                    '& .sh-dialog-dados-titulo': {
                        fontSize: '1.1rem',
                        fontWeight: '500'
                    },

                    '& .sh-dialog-dados-texto': {
                        fontSize: '.9rem',
                        fontWeight: '400'
                    },
                }
            }
        }
    }
}

const stylesDialogAvaliacao = {
    '& .sh-avaliacao-conteudo': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '15px',

        '& .sh-avaliacao-titulo': {
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#000'
        }
    }
}

const ServicosAceitos = () => {
    const [loading, setLoading] = useState(true);
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const pagina = useNavigate();
    const [openDelete, setOpenDelete] = useState(false);
    const [tipoAlert, setTipoAlert] = useState<number>();
    const [mensagemAlert, setMensagemAlert] = useState<string>();
    const [paginaPerfil, setPaginaPerfil] = useState<number>(1);
    const [open, setOpen] = useState(false);
    const [openAvaliacao, setOpenAvaliacao] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [dadosDoServico, setDadosDoServico] = useState<any>([])
    const [avaliacao, setAvaliacao] = useState<number | null>(0);

    const closeDialogServico = () => {
        setOpen(false);
    };
    const closeDialogAvaliacao = () => {
        setOpenAvaliacao(false);
    };

    async function pegaDados() {
        userId = sessionStorage.getItem('shUserLogId');
        userTipo = sessionStorage.getItem('shUserLogTipo');

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('acao', 'servicos_aceitos');

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
                const servicosAceitosData = response.servAceitos;
                if (servicosAceitos[0] === undefined) {

                    // Freelancer
                    if (userTipo === '0') {
                        servicosAceitosData.map((servAceitos: any) => {
                            servicosAceitos.push({
                                id: servAceitos.id,
                                clienteId: servAceitos.cliente_id,
                                freelaId: servAceitos.freelancer_id,
                                tag: servAceitos.tipo,
                                data: servAceitos.data_servico,
                                endereco: servAceitos.local_servico,
                                descricao: servAceitos.descricao,
                                remuneracao: servAceitos.remuneracao,
                                fotoServico: servAceitos.servico_foto,

                                clienteNome: servAceitos.nome,
                                clienteSobrenome: servAceitos.sobrenome,
                                clienteTelefone: servAceitos.telefone,
                                clienteEmail: servAceitos.email,
                                clienteClassificacao: servAceitos.classificacao,
                                clienteFotoPerfil: servAceitos.imagem_perfil,
                            });
                        });
                    }

                    // Cliente
                    else {
                        servicosAceitosData.map((servAceitos: any) => {
                            servicosAceitos.push({
                                id: servAceitos.id,
                                clienteId: servAceitos.cliente_id,
                                freelaId: servAceitos.freelancer_id,
                                tag: servAceitos.tipo,
                                data: servAceitos.data_servico,
                                endereco: servAceitos.local_servico,
                                descricao: servAceitos.descricao,
                                remuneracao: servAceitos.remuneracao,
                                fotoServico: servAceitos.servico_foto,

                                freelancerNome: servAceitos.nome,
                                freelancerSobrenome: servAceitos.sobrenome,
                                freelancerTelefone: servAceitos.telefone,
                                freelancerEmail: servAceitos.email,
                                freelancerClassificacao: servAceitos.classificacao,
                                freelancerFotoPerfil: servAceitos.imagem_perfil,
                            });
                        });
                    }

                }
            }

            setLoading(false);
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
            pegaDados();
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

    function selecionaServico(servico: object) {
        setDadosDoServico(servico);
        setOpen(true);
    }

    const listaServicos = servicosAceitos.map((servico: any, index: any) =>
        <>
            {userTipo === "0" &&
                <li
                    className="sh-servicosItem"
                    key={servico.id}
                    onClick={() => {
                        selecionaServico(servico)
                    }}
                >
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                            <img src={servico.fotoServico} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilDefault} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                <p className="sh-servicosLista-nomeCliente">{servico.cliente_nome} {servico.cliente_sobrenome}</p>
                            </div>
                            <div className="sh-servicosLista-classificacao">
                                <img src={imgClassificacaoEstrela} alt="" className="sh-servicosLista-classificacaoImg" />
                                <p className="sh-servicosLista-classificacaoNumero">{servico.clienteClassificacao}</p>
                            </div>
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-main">
                            <p className="sh-servicosLista-tipoServico">{servico.tag}</p>
                            <p className="sh-servicosLista-descricaoServico">{servico.descricao}</p>
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-footer">
                            <p className="sh-servicosLista-remuneracao">R${servico.remuneracao},00 reais</p>
                        </li>
                    </ul>
                </li>
            }
            {userTipo === "1" &&
                <li
                    className="sh-servicosItem"
                    key={servico.id}
                    onClick={() => {
                        selecionaServico(servico)
                    }}
                >
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                            <img src={servico.fotoServico} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                        </li>
                        {/* <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilDefault} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                <p className="sh-servicosLista-nomeCliente">{servico.cliente_nome} {servico.cliente_sobrenome}</p>
                            </div>
                            <div className="sh-servicosLista-classificacao">
                                <img src={imgClassificacaoEstrela} alt="" className="sh-servicosLista-classificacaoImg" />
                                <p className="sh-servicosLista-classificacaoNumero">{servico.clienteClassificacao}</p>
                            </div>
                        </li> */}
                        <li className="sh-servicosLista-item sh-servicosLista-main">
                            <p className="sh-servicosLista-tipoServico">{servico.tag}</p>
                            <p className="sh-servicosLista-descricaoServico">{servico.descricao}</p>
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-footer">
                            <p className="sh-servicosLista-remuneracao">R${servico.remuneracao},00 reais</p>
                        </li>
                    </ul>
                </li>
            }
        </>

    );

    async function concluirServico() {
        setLoading(true);

        if (userTipo === "0") {
            try {
                const formData = new FormData();
                formData.append('acao', 'conclui_servico');
                formData.append('avaliacaoFreela', `${avaliacao}`);
                formData.append('idServico', `${idServico}`);
                formData.append('colaboradorId', `${clienteId}`);

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response) {
                    window.location.reload();
                }
            }
            catch (error) {
                console.error(error);
                closeDialogServico();
                closeDialogAvaliacao();
            }
        }
        else {
            try {
                const formData = new FormData();
                formData.append('acao', 'conclui_servico');
                formData.append('avaliacaoCliente', `${avaliacao}`);
                formData.append('idServico', `${idServico}`);
                formData.append('colaboradorId', `${freelaId}`);

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response) {
                    window.location.reload();
                }
            }
            catch (error) {
                console.error(error);
                closeDialogServico();
                closeDialogAvaliacao();
            }
        }

    }

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
                        <li
                            className="sh-sideBar-item"
                            onClick={() => {
                                pagina('/perfil')
                            }}
                        >
                            <PersonRoundedIcon />

                            <p className='sh-item-text'>Perfil</p>
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

                                    <p className='sh-item-text'>Servicos registrados</p>
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

                                <p className='sh-item-text'>Serviços aceitos</p>
                            </>
                        </li>

                        <li
                            className="sh-sideBar-item"
                            onClick={() => {
                                pagina('/servicos-concluidos')
                            }}
                        >
                            <InventoryRoundedIcon />

                            <p className='sh-item-text'>Servicos concluídos</p>
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
                            Serviços Aceitos
                        </p>

                        <HomeRoundedIcon />
                    </Link>

                    <article className="sh-servicosAceitos">
                        {servicosAceitos.length === 0 &&
                            <h2 className="sh-servicosAceitos-semServicos">
                                Nenhum serviço aceito
                            </h2>
                        }
                        {servicosAceitos.length > 0 &&
                            <ul className="sh-servicosLista">
                                {listaServicos}

                                {dadosDoServico &&
                                    <Dialog
                                        fullScreen={fullScreen}
                                        open={open}
                                        onClose={closeDialogServico}
                                        aria-labelledby="responsive-dialog-title"
                                        sx={servicosAdequadosStyle}
                                    >
                                        <DialogContent className='sh-servico-dialog-dados'>

                                            <DialogContentText className="sh-servico-subtitulos sh-dialog-imagem">
                                                <img src={dadosDoServico.fotoServico} alt="Foto do serviço" className="sh-dialog-imagem-servico" />

                                                {userTipo === "0" &&
                                                    <ul className="sh-dialog-dados">
                                                        <li className="sh-dialog-dados-tipo-servico">{dadosDoServico.tag}</li>
                                                        <li className="sh-dialog-dados-texto">
                                                            <strong>Endereço:</strong> {dadosDoServico.endereco}
                                                        </li>
                                                        <li className="sh-dialog-dados-texto">
                                                            <strong>Telefone:</strong> {dadosDoServico.clienteTelefone} <br />
                                                        </li>
                                                        <li className="sh-dialog-dados-texto">
                                                            <strong>E-mail:</strong> {dadosDoServico.clienteEmail}
                                                        </li>
                                                        <li className="sh-dialog-dados-texto">
                                                            <strong>Remuneração:</strong> R${dadosDoServico.remuneracao},00 reais
                                                        </li>
                                                    </ul>
                                                }

                                                {userTipo === "1" &&
                                                    <ul className="sh-dialog-dados">
                                                        <li className="sh-dialog-dados-tipo-servico">{dadosDoServico.tag}</li>
                                                        <li className="sh-dialog-dados-texto">
                                                            <strong>Telefone do Freelancer:</strong> {dadosDoServico.freelancerTelefone} <br />
                                                        </li>
                                                        <li className="sh-dialog-dados-texto">
                                                            <strong>E-mail  do Freelancer:</strong> {dadosDoServico.freelancerEmail}
                                                        </li>
                                                        <li className="sh-dialog-dados-texto">
                                                            <strong>Remuneração:</strong> R${dadosDoServico.remuneracao},00 reais
                                                        </li>
                                                    </ul>
                                                }
                                            </DialogContentText>

                                            {userTipo === "0" &&
                                                <DialogContentText className="sh-servico-dados-cliente">
                                                    <div className="sh-dialog-imagem-cliente">
                                                        {dadosDoServico.clienteFotoPerfil &&
                                                            <img src={dadosDoServico.clienteFotoPerfil} alt="" className="sh-servico-dados-cliente-foto" />
                                                        }

                                                        {!dadosDoServico.clienteFotoPerfil &&
                                                            <img src={imgPerfilDefault} alt="" className="sh-servico-dados-cliente-foto" />
                                                        }
                                                    </div>
                                                    <div className="sh-dialog-nome-cliente">{dadosDoServico.clienteNome} {dadosDoServico.clienteSobrenome}</div>
                                                    <div className="sh-dialog-classificacao-cliente">
                                                        <img src={imgEstrelas} alt="" className="sh-dialog-classificacao-img" />
                                                        <div className="sh-dialog-classificacao-numero">
                                                            {dadosDoServico.clienteClassificacao}
                                                        </div>
                                                    </div>
                                                </DialogContentText>
                                            }
                                            {userTipo === "1" &&
                                                <DialogContentText className="sh-servico-dados-cliente">
                                                    <div className="sh-dialog-imagem-cliente">
                                                        {dadosDoServico.freelancerFotoPerfil &&
                                                            <img src={dadosDoServico.freelancerFotoPerfil} alt="" className="sh-servico-dados-cliente-foto" />
                                                        }

                                                        {!dadosDoServico.freelancerFotoPerfil &&
                                                            <img src={imgPerfilDefault} alt="" className="sh-servico-dados-cliente-foto" />
                                                        }
                                                    </div>
                                                    <div className="sh-dialog-nome-cliente">{dadosDoServico.freelancerNome} {dadosDoServico.freelancerSobrenome}</div>
                                                    <div className="sh-dialog-classificacao-cliente">
                                                        <img src={imgEstrelas} alt="" className="sh-dialog-classificacao-img" />
                                                        <div className="sh-dialog-classificacao-numero">
                                                            {dadosDoServico.freelancerClassificacao}
                                                        </div>
                                                    </div>
                                                </DialogContentText>
                                            }

                                            <DialogContentText className="sh-servico-subtitulo">
                                                Descrição do serviço
                                            </DialogContentText>

                                            <DialogContentText className="sh-servico-textos">
                                                {dadosDoServico.descricao}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { setOpen(false) }}>
                                                Voltar
                                            </Button>

                                            <Button autoFocus onClick={() => setOpenAvaliacao(true)}>
                                                Concluído
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                }

                                <Dialog
                                    fullScreen={fullScreen}
                                    open={openAvaliacao}
                                    onClose={closeDialogAvaliacao}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogContent sx={stylesDialogAvaliacao}>
                                        <DialogContentText className="sh-avaliacao-conteudo">
                                            {userTipo === '0' &&
                                                <Typography component="legend" className="sh-avaliacao-titulo">Avalie o Cliente</Typography>
                                            }
                                            {userTipo === '1' &&
                                                <Typography component="legend" className="sh-avaliacao-titulo">Avalie o Freelancer</Typography>
                                            }
                                            <Rating
                                                name="no-value"
                                                value={avaliacao}
                                                onChange={(event, newValue) => {
                                                    setAvaliacao(newValue);
                                                }}
                                            />
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={closeDialogAvaliacao}>
                                            Voltar
                                        </Button>

                                        <Button
                                            autoFocus
                                            onClick={() => {
                                                idServico = dadosDoServico.id;
                                                freelaId = dadosDoServico.freelaId;
                                                clienteId = dadosDoServico.clienteId;
                                                concluirServico();
                                            }}
                                        >
                                            Avaliar
                                        </Button>

                                    </DialogActions>
                                </Dialog>
                            </ul>
                        }
                    </article>
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

export default ServicosAceitos;