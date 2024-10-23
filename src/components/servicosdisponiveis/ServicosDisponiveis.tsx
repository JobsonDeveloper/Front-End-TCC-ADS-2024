import './ServicosDisponiveis.css';
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fotoPadrao from '../../assets/FreelaHome/icons/icon-perfil.png';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, useMediaQuery, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Padding } from '@mui/icons-material';

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
        }
    }

}

async function aceitaServico(e: any) {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append('acao', 'freelaAceitaServico');
        formData.append('idServico', idServico);
        formData.append('idFreela', `${sessionStorage.getItem('shUserLogId')}`);

        // console.log(formData.get('idServico'));
        // console.log(formData.get('idFreela'));

        const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
            method: 'POST',
            mode: 'cors',
            body: formData
        });

        const response = await request.json();
        // const dadosFreela = response.dadosFreela[0];

        if (response) {
            // window.location.reload();
            console.log('aceito');
        }
    }
    catch (error) {
        
        console.error(error);
    }

}

const ServicosDisponiveis = ({ data }: any) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const mostrarDetalhes = (servico: any) => {
        idServico = servico.id;
        tipo = servico.tag;
        descricao = servico.descricao;
        diaServico = servico.data;
        local = servico.endereco;
        remuneracao = servico.remuneracao;
        tipoRemuneracao = servico.tipoDeRemuneracao;

        console.log(servico.id);

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        <ul className="sh-show sh-servicosFreela-lista">
            {listaServicos}

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
                    <DialogContentText className="sh-servico-dados">
                        {diaServico}
                    </DialogContentText>


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
                        R${remuneracao} reais - {tipoRemuneracao}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Voltar
                    </Button>
                    <Button onClick={((e) => { aceitaServico(e) })}>
                        Aceitar
                    </Button>
                </DialogActions>
            </Dialog>
        </ul>
    )
}

export default ServicosDisponiveis;