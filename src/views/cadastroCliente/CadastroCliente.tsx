import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CadastroCliente.css';

// Components
import logoImg from '../../assets/CadastroCliente/icons/logo.svg';
import homeImg from '../../assets/CadastroCliente/icons/home.png'
import proximoImg from '../../assets/CadastroCliente/icons/proximo.png'
import anteriorImg from '../../assets/CadastroCliente/icons/anterior.png'
import concluirImg from '../../assets/CadastroCliente/icons/concluir.png'
import tituloPaginaImg from '../../assets/CadastroCliente/icons/cadastroCliente.png'
import imgDescricao from '../../assets/icons/descricao.svg';
import imgLogin from '../../assets/icons/btn-login.svg';
import Loading from "../../components/loading/Loading";
import { Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { border, color, fontFamily, fontSize, minWidth, padding, styled, width } from "@mui/system";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const styledTextField = {
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontFamily: '"Nunito", sans-serif;',
        color: '#000'
    },

    '@media (min-width: 992px)': {
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
        }
    }
};

const styledButtonMui = {
    fontSize: '1rem',
    fontFamily: '"Nunito", sans-serif;',
    color: '#fff',
    padding: '3px 0',
    backgroundColor: '#0075FF',
    borderRadius: '3px',
    width: '89px',

    '&:hover': {

    },

    '@media (min-width: 992px)': {
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
        }
    }
};


export const FormDadosBase = () => {
    return (
        <article className="sh-dados sh-dados-iniciais">
            <TextField id="standard-basic" label="Nome" variant="standard" type="text" sx={styledTextField} />
            <TextField id="standard-basic" label="Sobrenome" variant="standard" type="text" sx={styledTextField} />
            <TextField id="standard-basic" label="CPF/CNPJ" variant="standard" type="number" sx={styledTextField} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField label="Nascimento" variant="standard" format="DD/MM/YYYY" sx={styledTextField} />
            </LocalizationProvider>
        </article>
    )
}

export const FormLocalizacaoContato = () => {
    return (
        <article className="sh-dados sh-dados-localizacao">
            <TextField id="standard-basic" label="Rua" variant="standard" type="text" sx={styledTextField} className="sh-cadastro-rua"/>
            <TextField id="standard-basic" label="Numero" variant="standard" type="number" sx={styledTextField} className="sh-cadastro-numero"/>
            <TextField id="standard-basic" label="Cidade" variant="standard" type="text" sx={styledTextField} className="sh-cadastro-cidade"/>
            <TextField id="standard-basic" label="Estado" variant="standard" type="text" sx={styledTextField} className="sh-cadastro-estado"/>
            <TextField id="standard-basic" label="DDD" variant="standard" type="number" sx={styledTextField} className="sh-cadastro-ddd"/>
            <TextField id="standard-basic" label="Telefone" variant="standard" type="number" sx={styledTextField} className="sh-cadastro-telefone"/>
        </article>
    )
}

export const FormSeguranca = () => {
    return (
        <article className="sh-dados sh-dados-seguranca">
            <TextField id="standard-basic" label="E-mail" variant="standard" type="email" sx={styledTextField} />
            <TextField id="standard-basic" label="Senha" variant="standard" type="text" sx={styledTextField} />
            <TextField id="standard-basic" label="Confirmar senha" variant="standard" type="text" sx={styledTextField} />
        </article>
    )
}

const CadastroCliente = () => {
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    });

    const mudarStep = (variante: string) => {

        if (variante === 'proximo') {
            if (activeStep >= 2) {
                alert('cadastro realiado')
            }

            setActiveStep((currentStep) => currentStep + 1);
        }
        else {
            if (activeStep <= 0) {
                return;
            }
            setActiveStep((currentStep) => currentStep + -1);
        }

    }

    return (
        <main className="sh-cadastroCliente">
            {loading && <Loading />}

            <div className="sh-cadastro-formulario">
                <article className="sh-cadastro-header">
                    <Link to="/"><img src={logoImg} alt="" className="sh-cadastro-logoImg" /></Link>
                    <img src={tituloPaginaImg} alt="" className="sh-cadastro-tituloPagina" />
                </article>
                <Stepper activeStep={activeStep} className="sh-steper-cadastro" alternativeLabel>
                    <Step> <StepLabel /> </Step>
                    <Step> <StepLabel /> </Step>
                    <Step> <StepLabel /> </Step>
                </Stepper>
                <div className="sh-formulario-inputs">
                    {activeStep == 0 && <FormDadosBase />}
                    {activeStep == 1 && <FormLocalizacaoContato />}
                    {activeStep == 2 && <FormSeguranca />}
                </div>
                <article className="sh-cadastro-buttons">
                    {activeStep == 0 && <Link to="/" className="sh-cadastro-button-link"> <img src={homeImg} alt="Butão para voltar para a home" className="sh-cadastro-button-home"/> </Link>}
                    {activeStep > 0 && <img src={anteriorImg} alt="Butão para voltar para a home" className="sh-cadastro-button-anterior" onClick={() => { mudarStep('anterior') }}/>}
                    {activeStep < 2 && <img src={proximoImg} alt="Butão para voltar para a home" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }}/>}
                    {activeStep == 2 && <img src={concluirImg} alt="Butão para voltar para a home" className="sh-cadastro-button-concluir"/>}
                </article>
            </div>
        </main>
    )
}

export default CadastroCliente;