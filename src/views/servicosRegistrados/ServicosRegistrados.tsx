import './ServicosRegistrados.css';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgPerfilDefault from '../../assets/icons/perfil.png';
import imgClassificacaoEstrela from '../../assets/icons/estrela.svg';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import imgEstrelas from '../../assets/icons/estrela.svg';

// Components
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';

let userId: string | null = '';
let userTipo: string | null = '';
let servicosRegistrados: Array<object> = [];
let idServicoExcluir: number = 0;

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

const styledTextField = {
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontFamily: '"Nunito", sans-serif;',
        color: '#000'
    },
};

const styledDialogEditaPerfil = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',

    '& .sh-label-imgServico': {
        cursor: 'pointer',
        width: '250px',
        height: 'max-content',

        '& .sh-label-imgServico-texto': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '15px',
            backgroundColor: '#eaeaea',
            margin: '0',
            fontSize: '1rem'
        },

        '& .sh-label-imgServico-imagem': {
            width: '250px'
        }
    },

    '& .sh-fotoServico-input': {
        display: 'none'
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

const ServicosRegistrados = () => {
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
    const [openExcluirServico, setOpenExcluirServico] = useState(false);
    const [openDialogAddServico, setOpenDialogAddServico] = useState(false);

    // Registrar servicos
    const [dataServico, setDataServico] = useState('');
    const [localServico, setLocalServico] = useState('');
    const [descricaoServico, setDescricaoServico] = useState('');
    const [remuneracaoServico, setRemuneracaoServico] = useState('');
    const [fotoServico, setFotoServico] = useState('');
    const [tipoServico, setTipoServico] = useState('');
    const capturaServicos = { options: dadosServicos.map((option) => option) };

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

                    console.log('aqui');
                }
                else {
                    if (arquivo[0] !== null) {
                        let lerImagem = new FileReader();

                        lerImagem.onload = function (imagem) {
                            if (imagem.target) {
                                setFotoServico(`${imagem.target.result}`);
                                console.log(imagem.target.result);
                            }
                        }

                        lerImagem.readAsDataURL(arquivo[0]);
                    }
                }
            }
        }
    }

    const closeDialogExcluirServico = () => {
        setOpenExcluirServico(false);
    };

    const closeDialogAddServico = () => {
        setOpenDialogAddServico(false);
    };

    async function pegaDados() {
        userId = sessionStorage.getItem('shUserLogId');
        userTipo = sessionStorage.getItem('shUserLogTipo');

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('acao', 'servicos_registrados');

            formData.append('idCliente', `${userId}`);

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();

            if (response.status === 201) {
                const servicosConcluidosData = response.servRegistrados;

                if (servicosRegistrados[0] === undefined) {
                    servicosConcluidosData.map((servAceitos: any) => {
                        servicosRegistrados.push({
                            id: servAceitos.id,
                            clienteId: servAceitos.cliente_id,
                            freelaId: servAceitos.freelancer_id,
                            tag: servAceitos.tipo,
                            data: servAceitos.data_servico,
                            endereco: servAceitos.local_servico,
                            descricao: servAceitos.descricao,
                            remuneracao: servAceitos.remuneracao,
                            fotoServico: servAceitos.servico_foto,
                        });
                    });
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

    async function excluirServico(idServico: number) {

    }

    async function registrarServico() {
        try {

            if (!fotoServico || !tipoServico || !descricaoServico || !remuneracaoServico) {
                setTipoAlert(3);
                setMensagemAlert("Preencha os campos obrigatórios!");
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
            }
            else {
                setLoading(true);
                const formData = new FormData();
                formData.append('acao', 'cadserv');

                if (dataServico) {
                    formData.append('data', `${formatDataBanco(dataServico)}`);
                }
                if (localServico) {
                    formData.append('local', `${localServico}`);
                }

                formData.append('idCliente', `${userId}`);
                formData.append('foto_servico', `${fotoServico}`);
                formData.append('tipo', `${tipoServico}`);
                formData.append('descricao', `${descricaoServico}`);
                formData.append('remuneracao', `${remuneracaoServico}`);

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response.status === 201) {
                    closeDialogAddServico();
                    window.location.reload();
                }
                else {
                    setTipoAlert(3);
                    setMensagemAlert("Erro ao registrar!");
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        setLoading(false);
                    }, 4000);
                }
            }

        }
        catch (error) {
            setTipoAlert(3);
            setMensagemAlert("Erro de requisição!");
            setMostrarAlert(true);
            closeDialogAddServico();

            setTimeout(() => {
                setMostrarAlert(false);
                setLoading(false);
            }, 4000);
            console.error(error);
        }
    }

    const listaServicos = servicosRegistrados.map((servico: any, index: any) =>
        <li
            className="sh-servicosItem"
            key={servico.id}
            onClick={() => {
                idServicoExcluir = servico.id;
                setOpenExcluirServico(true);
            }}
        >
            <ul className="sh-servicosItem-lista">
                <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                    <img src={servico.fotoServico} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
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
    );

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

                        <li
                            className="sh-sideBar-item"
                            onClick={() => {
                                pagina('/servicos-registrados')
                            }}
                        >
                            <FormatListNumberedRoundedIcon />
                            <p className='sh-item-text'>Servicos registrados</p>
                        </li>

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
                            Serviços Registrados
                        </p>

                        <HomeRoundedIcon />
                    </Link>

                    <article className="sh-servicosConcluidos">
                        {servicosRegistrados.length === 0 &&
                            <h2 className="sh-servicosConcluidos-semServicos">
                                Nenhum serviço registrado
                            </h2>
                        }
                        {servicosRegistrados.length > 0 &&
                            <ul className="sh-servicosLista">
                                {listaServicos}

                            </ul>
                        }

                        <div
                            className="sh-servicosConcluidos-adicionarServico"
                            onClick={() => {
                                setOpenDialogAddServico(true)
                            }}
                        >
                            <AddIcon className='sh-icon-add' />
                        </div>
                    </article>
                </div>

                <Dialog
                    fullScreen={fullScreen}
                    open={openExcluirServico}
                    onClose={closeDialogExcluirServico}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent sx={stylesDialogAvaliacao}>
                        <DialogContentText className="sh-avaliacao-conteudo">
                            Deseja excluir a solicitação do serviço?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialogExcluirServico}>
                            Voltar
                        </Button>

                        <Button
                            onClick={() => {
                                excluirServico(idServicoExcluir);
                            }}
                        >
                            excluir
                        </Button>

                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openDialogAddServico}
                    onClose={closeDialogAddServico}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Registrar novo serviço"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={styledDialogEditaPerfil}>
                            <label
                                htmlFor="sh_input_file_perfil"
                                className="sh-label-imgServico sh-button-mudarFoto">
                                {!fotoServico &&
                                    <p className='sh-label-imgServico-texto'>Foto do Servico</p>
                                }

                                {fotoServico &&
                                    <img
                                        src={fotoServico}
                                        alt="Foto do serviço"
                                        className='sh-label-imgServico-imagem'
                                    />
                                }
                            </label>

                            <input
                                type="file"
                                id="sh_input_file_perfil"
                                className="sh-fotoServico-input"
                                onChange={((e) => {
                                    leituraDeImagem(e.target.files);
                                })}
                            />

                            <Stack spacing={1} sx={styledSelectServicos}>
                                <Autocomplete
                                    {...capturaServicos}
                                    disableClearable
                                    defaultValue={'Tipo de serviço'}
                                    onChange={(event: any, newValue: string) => {
                                        setTipoServico(newValue);
                                    }}
                                    renderInput={(parametros) => (
                                        <TextField {...parametros}
                                            label=""
                                            variant="standard" />
                                    )}
                                />
                            </ Stack>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField
                                    label="Data (Não é obrigatório)"
                                    variant="standard"
                                    format="DD/MM/YYYY"
                                    sx={styledTextField}
                                    onChange={(e: any) => setDataServico(e)}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Local (Não é obrigatório)"
                                variant="standard"
                                type="text"
                                sx={styledTextField}
                                onChange={(e: any) => setLocalServico(e.target.value)}
                            />

                            <TextField
                                label="Remuneração"
                                variant="standard"
                                type="number"
                                sx={styledTextField}
                                onChange={(e: any) => setRemuneracaoServico(e.target.value)}
                            />

                            <TextField
                                id="filled-multiline-static"
                                label="Descrição"
                                multiline
                                maxRows={6}
                                onChange={(e) => {
                                    setDescricaoServico(e.target.value);
                                }}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialogAddServico}>Voltar</Button>
                        <Button onClick={(e) => registrarServico()}>Registrar</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <footer className="sh-perfil-footer">
                <div className="sh-footer">
                    <Footer />
                </div>
            </footer>

            {
                mostrarAlert &&
                <div className="sh-alerts">
                    <ShAlert />
                </div>
            }
        </main >
    )
}

export default ServicosRegistrados;