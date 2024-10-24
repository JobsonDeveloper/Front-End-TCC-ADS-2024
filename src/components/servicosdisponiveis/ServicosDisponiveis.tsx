import './ServicosDisponiveis.css';
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fotoPadrao from '../../assets/FreelaHome/icons/icon-perfil.png';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, useMediaQuery, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Padding } from '@mui/icons-material';
import Loading from '../loading/Loading';
import imgEstrelas from '../../assets/icons/estrela.svg';


const styledTextField = {
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontFamily: '"Nunito", sans-serif;',
        color: '#000'
    },
};

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

const ServicosDisponiveis = ({ data }: any, { tipolista }: any) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const usuario = sessionStorage.getItem('shUserLogTipo');
    const [busca, setBusca] = useState('');
    const pagina = useNavigate();

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

    async function aceitaServico(e: any) {
        e.preventDefault();
        setOpen(false);
        if (sessionStorage.getItem('shFreelaLimite') != "0") {

            try {
                let limiteSession: any = sessionStorage.getItem('shFreelaLimite');
                let limite: any = parseInt(limiteSession);

                const formData = new FormData();
                formData.append('acao', 'freelaAceitaServico');
                formData.append('idServico', idServico);
                formData.append('idFreela', `${sessionStorage.getItem('shUserLogId')}`);
                formData.append('limiteFreela', `${limite - 1}`);


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
    }

    const mostrarDetalhes = (servico: any) => {
        idServico = servico.id;
        tipo = servico.tag;
        descricao = servico.descricao;
        if (servico.data) { diaServico = formatData(servico.data) }
        local = servico.endereco;
        remuneracao = servico.remuneracao;
        tipoRemuneracao = servico.tipoDeRemuneracao;
        clienteId = servico.clienteId;

        dadosCliente();

        async function dadosCliente() {

            try {
                const formData = new FormData();
                formData.append('acao', 'dados_cliente_servico');
                formData.append('cliId', clienteId);

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response) {
                    clienteClassificacao = response.data.classificacao;
                    clienteDataCriacao = formatData(response.data.data_de_criacao);
                    setOpen(true);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dadosFiltrados = data.filter((info: any) => info.tag.toLowerCase().includes(busca.toLowerCase()));

    useEffect(() => {
        Aos.init({ duration: 500 });
    })

    const listaServicos = data.map((servico: any, index: any) =>
        <li key={index} className="sh-servicosFreela-itens" data-aos="flip-left" onClick={(() => { mostrarDetalhes(servico) })}>
            <div className="sh-itens-data">
                <img src={fotoPadrao} alt="Foto de perfil sem rosto" className="sh-servicosFreela-img-perfil" />
                <p className="sh-servicosFreela-data-marcador">{servico.tag}</p>
            </div>
            <div className="sh-itens-data">
                <p className="sh-servicosFreela-data-descricao">{servico.descricao}</p>
            </div>
            {servico.remuneracao && <div className="sh-itens-data">
                <p className="sh-servicos-data-remuneracao">R${servico.remuneracao},00 reais</p>
            </div>}
        </li>
    );

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
                        <li key={`${dado.tag} ${dado.id}`} className="sh-servicosFreela-itens" data-aos="flip-left" onClick={(() => { mostrarDetalhes(dado) })}>
                            <div className="sh-itens-data">
                                <img src={fotoPadrao} alt="Foto de perfil sem rosto" className="sh-servicosFreela-img-perfil" />
                                <p className="sh-servicosFreela-data-marcador">{dado.tag}</p>
                            </div>
                            <div className="sh-itens-data">
                                <p className="sh-servicosFreela-data-descricao">{dado.descricao}</p>
                            </div>
                            {dado.remuneracao && <div className="sh-itens-data">
                                <p className="sh-servicos-data-remuneracao">R${dado.remuneracao},00 reais</p>
                            </div>}
                        </li>
                    )}

                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                        sx={styledDialogService}
                    >
                        <DialogTitle id="responsive-dialog-title" className='sh-servico-dialog-titulo'>
                            {tipo}
                        </DialogTitle>
                        <DialogContent className='sh-servico-dialog-dados'>
                            <DialogContentText className="sh-servico-subtitulos">
                                Descrição
                            </DialogContentText>
                            <DialogContentText className="sh-servico-dados">
                                {descricao}
                            </DialogContentText>

                            <DialogContentText className="sh-servico-subtitulos">
                                Data
                            </DialogContentText>
                            {!diaServico &&
                                <DialogContentText className="sh-servico-dados">
                                    Sem data marcada
                                </DialogContentText>
                            }
                            {diaServico &&
                                <DialogContentText className="sh-servico-dados">
                                    {diaServico}
                                </DialogContentText>
                            }

                            <DialogContentText className="sh-servico-subtitulos">
                                Endereço
                            </DialogContentText>
                            <DialogContentText className="sh-servico-dados">
                                {local}
                            </DialogContentText>

                            <DialogContentText className="sh-servico-subtitulos">
                                Remuneração
                            </DialogContentText>
                            <DialogContentText className="sh-servico-dados">
                                R${remuneracao} reais
                            </DialogContentText>

                            <DialogContentText className="sh-servico-subtitulos">
                                Cliente desde
                            </DialogContentText>
                            <DialogContentText className="sh-servico-dados">
                                {clienteDataCriacao}
                            </DialogContentText>

                            <DialogContentText className="sh-servico-subtitulos">
                                Classificação
                            </DialogContentText>
                            <DialogContentText className="sh-servico-dados">
                                <img src={imgEstrelas} className='sh-dialog-estrelas' />{clienteClassificacao}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Voltar
                            </Button>
                            <Button autoFocus onClick={((e) => { aceitaServico(e) })}>
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