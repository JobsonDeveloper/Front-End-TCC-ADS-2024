import './ServicosDisponiveis.css';
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fotoPadrao from '../../assets/FreelaHome/icons/icon-perfil.png';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let descricao = "";

const ServicosDisponiveis = ({ data }: any) => {
    const [open, setOpen] = useState(false);

    const mostrarDetalhes = (servico: any) => {
        descricao = servico.descricao;

        setTimeout(() => {
            console.log(descricao);
            setOpen(true)
        }, 500);

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
                {servico.imgCliente && <img src={servico.imgCliente} alt="Foto de perfil sem rosto" className="sh-servicosFreela-img-perfil" />}
                {!servico.imgCliente && <img src={fotoPadrao} alt="Foto de perfil sem rosto" className="sh-servicosFreela-img-perfil" />}
                <p className="sh-servicosFreela-data-marcador">{servico.tag}</p>
            </div>
            <div className="sh-itens-data">
                <p className="sh-servicosFreela-data-descricao">{servico.descricao}</p>
            </div>
        </li>
    );

    return (
        <ul className="sh-show sh-servicosFreela-lista">
            {listaServicos}

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>


                    <DialogContentText id="alert-dialog-slide-description">
                        {descricao}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Sair</Button>
                    <Button>Aceitar</Button>
                </DialogActions>
            </Dialog>
        </ul>
    )
}

export default ServicosDisponiveis;