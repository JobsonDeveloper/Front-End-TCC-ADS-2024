import './ServicosDisponiveis.css';
import Aos from 'aos';
import React, { MouseEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fotoPadrao from '../../assets/FreelaHome/icons/icon-perfil.png';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, useMediaQuery, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Padding } from '@mui/icons-material';
import Loading from '../loading/Loading';
import imgEstrelas from '../../assets/icons/estrela.svg';
import { ArrayBindingElement } from 'typescript';
import 'aos/dist/aos.css';

const styledTextField = {
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontFamily: '"Nunito", sans-serif;',
        color: '#000'
    },
};

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
            marginTop: '10px',

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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let idServico = "";
let tipo = "";
let diaServico = "";
let descricao = "";
let remuneracao = "";
let tipoRemuneracao = "";
let local = "";
let clienteId = "";
let clienteClassificacao = "";
let clienteDataCriacao = "";

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
    }

}

const ServicosDisponiveis = ({ data }: any) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const usuario = sessionStorage.getItem('shUserLogTipo');
    const [busca, setBusca] = useState('');
    const pagina = useNavigate();
    let dadosFiltrados: Array<object> = [];

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

    async function aceitaServico(e:MouseEvent, servicoId:string) {
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

    const handleClose = () => {
        setOpen(false);
    };

    dadosFiltrados = data.filter((info: any) => info.tag.toLowerCase().includes(busca.toLowerCase()));

    useEffect(() => {
        Aos.init({ duration: 500 });
    })

    return (
        <>

            <span className='sh-span-servicos-filtro'>
                <div className="sh-servicosAdequados-filtro">
                    <TextField
                        id="sh_user"
                        label="Tipo de serviço"
                        variant="standard"
                        className="sh-formulario-data-text"
                        sx={styledTextField}
                        onChange={((e) => { setBusca(e.target.value) })}
                        value={busca}
                    />
                </div>

                <ul className="sh-show sh-servicosFreela-lista">

                    {dadosFiltrados.map((dado: any) =>
                        <>
                            <li className="sh-todosServicosItem" key={`${dado.tag} ${dado.id}`} onClick={((e) => { detalhesServico(e, dado.id) })} data-aos='flip-left'>
                                <ul className="sh-todosServicosItem-lista">
                                    <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                                        {dado.servico_foto &&
                                            <img src={dado.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                                        }
                                    </li>
                                    <li className="sh-servicosLista-item sh-servicosLista-header">
                                        <div className="sh-servicosLista-fotoNome">
                                            {dado.cliente_foto &&
                                                <img src={dado.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                            }
                                            {!dado.cliente_foto &&
                                                <img src={fotoPadrao} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                            }
                                            <p className="sh-servicosLista-nomeCliente">{dado.cliente_nome} {dado.cliente_sobrenome}</p>
                                        </div>
                                        <div className="sh-servicosLista-classificacao">
                                            <img src={imgEstrelas} alt="" className="sh-servicosLista-classificacaoImg" />
                                            <p className="sh-servicosLista-classificacaoNumero">{dado.cliente_classificacao}</p>
                                        </div>
                                    </li>
                                    <li className="sh-servicosLista-item sh-servicosLista-main">
                                        <p className="sh-servicosLista-tipoServico">{dado.tag}</p>
                                        <p className="sh-servicosLista-descricaoServico">{dado.descricao}</p>
                                    </li>
                                    <li className="sh-servicosLista-item sh-servicosLista-footer">
                                        <p className="sh-servicosLista-remuneracao">R${dado.remuneracao},00 reais</p>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

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
                                        <img src={fotoPadrao} alt="" />
                                    }
                                </div>
                                <div className="sh-dialog-nome-cliente">{dadosServico.cliente_nome} {dadosServico.cliente_sobrenome}</div>
                                <div className="sh-dialog-classificacao-cliente">
                                    <img src={imgEstrelas} alt="" className="sh-dialog-classificacao-img" />
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
            </span>
        </>
    )
}

export default ServicosDisponiveis;