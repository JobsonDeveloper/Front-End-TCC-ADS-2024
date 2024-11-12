import React, { MouseEvent, useEffect, useState } from "react";
import './ListaServicos.css';
import imgTeste from '../../assets/index/backgrounds/teste.png';
import imgPadrao from '../../assets/index/icons/icon-perfil.png';
import imgPerfilDefault from '../../assets/index/icons/profissional.png';
import imgClassificacaoEstrela from '../../assets/icons/estrela.svg';
import background from '../../assets/index/backgrounds/background-servicos.svg';
import { Link, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, duration, useMediaQuery } from "@mui/material";
import { display, fontSize, fontWeight, useTheme, width } from "@mui/system";
import estrelaImg from '../../assets/FreelaHome/icons/estrela.svg';
import 'aos/dist/aos.css';
import Aos from 'aos';

let dadosServico = {
    servico_id: '',
    servico_tipo: '',
    servico_foto: '',
    servico_descricao: '',
    servico_remuneracao: '',
    servico_local: '',
    cliente_id: '',
    cliente_foto: '',
    cliente_nome: '',
    cliente_sobrenome: '',
    cliente_classificacao: ''
};

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
            paddingBottom: '8px',

            '& .sh-dialog-imagem-cliente': {
                width: '35px'
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

const ListaServicos = ({ setLoading, setMostraAlert, tituloDaSessao, servicos }: any) => {
    const id_usuario = sessionStorage.getItem('shUserLogId');
    const tipo_usuario = sessionStorage.getItem('shUserLogTipo');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const pagina = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        Aos.init({ duration: 500 })
    }, []);

    function redirectLogin() {
        pagina('/login');
    }

    function formatData(data: string) {
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

    async function detalhesServico(e: MouseEvent, servicoId: number) {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('acao', 'dados_servico_aberto');
            formData.append('servicoId', `${servicoId}`);

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();

            if (response) {
                const dados = response.data;

                dadosServico = {
                    servico_id: dados.id,
                    servico_tipo: dados.tipo,
                    servico_foto: dados.servico_foto,
                    servico_descricao: dados.descricao,
                    servico_remuneracao: dados.remuneracao,
                    servico_local: dados.local_servico,
                    cliente_id: dados.cliente_id,
                    cliente_foto: dados.imagem_perfil,
                    cliente_nome: dados.nome,
                    cliente_sobrenome: dados.sobrenome,
                    cliente_classificacao: dados.classificacao
                };
            }
            else {
                console.log('Erro de requisição!');
            }
        } catch (error) {
            console.log(error)
        }

        setOpen(true);
    }

    const montaServicos = servicos.map((servico: any) =>
        <>
            {servico.servico_status === 'aberto' && !tipo_usuario &&
                <li className="sh-servicosItem" key={servico.id} onClick={redirectLogin} data-aos='flip-left'>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
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
                                <p className="sh-servicosLista-classificacaoNumero">{servico.cliente_classificacao}</p>
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

            {/* Serviços adequados */}
            {servico.servico_status === 'aberto' && tipo_usuario === '0' &&
                <li className="sh-servicosItem" key={servico.id} onClick={(e) => detalhesServico(e, servico.id)} data-aos='flip-left'>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
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
                                <p className="sh-servicosLista-classificacaoNumero">{servico.cliente_classificacao}</p>
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
        </>
    );

    async function aceitaServico(e: MouseEvent, servicoId: string) {
        e.preventDefault();
        setOpen(false);

        if (sessionStorage.getItem('shFreelaLimite') != "0") {
            try {
                let limiteSession: any = sessionStorage.getItem('shFreelaLimite');
                let limite: any = parseInt(limiteSession) - 1;
                let freelaId = sessionStorage.getItem('shUserLogId');

                const formData = new FormData();
                formData.append('acao', 'freelaAceitaServico');
                formData.append('idServico', `${servicoId}`);
                formData.append('idFreela', `${freelaId}`);
                formData.append('limiteFreela', `${limite}`);

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response) {
                    sessionStorage.setItem('shFreelaLimite', response.data);
                    localStorage.setItem('ServicoAceito', 'true');

                    setTimeout(() => {
                        pagina('/perfil');
                    }, 500);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            window.location.reload();
        }

    }

    return (
        <article className="sh-servicos">
            <h2 className="sh-servicos-titulo">{tituloDaSessao}</h2>
            <ul className="sh-servicosLista">
                {montaServicos}

                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    sx={servicosAdequadosStyle}
                >
                    {/* <DialogTitle id="responsive-dialog-title" className='sh-servico-dialog-titulo'>
                        {dadosServico.servico_tipo}
                    </DialogTitle> */}
                    <DialogContent className='sh-servico-dialog-dados'>

                        <DialogContentText className="sh-servico-subtitulos sh-dialog-imagem">
                            <img src={dadosServico.servico_foto} alt="Foto do serviço" className="sh-dialog-imagem-servico" />

                            <ul className="sh-dialog-dados">
                                <li className="sh-dialog-dados-tipo-servico">{dadosServico.servico_tipo}</li>
                                <li className="sh-dialog-dados-titulo">Local do serviço</li>
                                <li className="sh-dialog-dados-texto">{dadosServico.servico_local}</li>
                                <li className="sh-dialog-dados-titulo">Remuneração</li>
                                <li className="sh-dialog-dados-texto">R${dadosServico.servico_remuneracao},00 reais</li>
                            </ul>
                        </DialogContentText>

                        <DialogContentText className="sh-servico-dados-cliente">
                            <div className="sh-dialog-imagem-cliente">
                                {dadosServico.cliente_foto &&
                                    <img src={dadosServico.cliente_foto} alt="" />
                                }

                                {!dadosServico.cliente_foto &&
                                    <img src={imgPerfilDefault} alt="" />
                                }
                            </div>
                            <div className="sh-dialog-nome-cliente">{dadosServico.cliente_nome} {dadosServico.cliente_sobrenome}</div>
                            <div className="sh-dialog-classificacao-cliente">
                                <img src={estrelaImg} alt="" className="sh-dialog-classificacao-img" />
                                <div className="sh-dialog-classificacao-numero">
                                    {dadosServico.cliente_classificacao}
                                </div>
                            </div>
                        </DialogContentText>

                        <DialogContentText className="sh-servico-subtitulo">
                            Descrição do serviço
                        </DialogContentText>

                        <DialogContentText className="sh-servico-textos">
                            {dadosServico.servico_descricao}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpen(false) }}>
                            Voltar
                        </Button>

                        <Button autoFocus onClick={((e) => { aceitaServico(e, dadosServico.servico_id) })}>
                            Aceitar
                        </Button>
                    </DialogActions>
                </Dialog>
            </ul>
        </article>
    )
}

export default ListaServicos;