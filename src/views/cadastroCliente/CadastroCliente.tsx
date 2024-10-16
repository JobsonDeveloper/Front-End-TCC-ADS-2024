import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CadastroCliente.css';

// Components
import logoImg from '../../assets/CadastroCliente/icons/logo.svg';
import tituloPaginaImg from '../../assets/CadastroCliente/icons/cadastroCliente.png'
import imgDescricao from '../../assets/icons/descricao.svg';
import imgLogin from '../../assets/icons/btn-login.svg';
import Loading from "../../components/loading/Loading";
import { Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { color, fontFamily, fontSize, styled } from "@mui/system";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const styledTextField = {
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontFamily: '"Nunito", sans-serif;',
        color: '#000'
    },

    '@media (min-width: 992px)' : {
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
        }
    }
};

export const FormDadosBase = () => {
    return (
        <article className="sh-dados sh-dados-iniciais">
            <TextField id="standard-basic" label="Nome" variant="standard" type="text" sx={styledTextField}/>
            <TextField id="standard-basic" label="Sobrenome" variant="standard" type="text" />
            <TextField id="standard-basic" label="CPF/CNPJ" variant="standard" type="number" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField label="Nascimento" variant="standard" format="DD/MM/YYYY" />
            </LocalizationProvider>
        </article>
    )
}

export const FormLocalizacaoContato = () => {
    return (
        <article className="sh-dados sh-dados-localizacao">
            Rua, Número, Cidade, Estado, DDD, Telefone
        </article>
    )
}

export const FormSeguranca = () => {
    return (
        <article className="sh-dados sh-dados-seguranca">
            E-mail, Senha, Confirmar senha
        </article>
    )
}

export const FormConfirmaDados = () => {
    return (
        <article className="sh-dados sh-confirmacao">
            Lista de todos os dados
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
            if (activeStep >= 3) {
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
                    <img src={logoImg} alt="" className="sh-cadastro-logoImg"/>
                    <img src={tituloPaginaImg} alt="" className="sh-cadastro-tituloPagina"/>
                </article>
                <Stepper activeStep={activeStep} className="sh-steper-cadastro" alternativeLabel>
                    <Step> <StepLabel /> </Step>
                    <Step> <StepLabel /> </Step>
                    <Step> <StepLabel /> </Step>
                    <Step> <StepLabel /> </Step>
                </Stepper>
                <div className="sh-formulario-inputs">
                    {activeStep == 0 && <FormDadosBase />}
                    {activeStep == 1 && <FormLocalizacaoContato />}
                    {activeStep == 2 && <FormSeguranca />}
                    {activeStep == 3 && <FormConfirmaDados />}
                </div>
                <article className="sh-cadastro-buttons">
                    <Button variant="outlined" onClick={() => { mudarStep('anterior') }}>Voltar</Button>
                    <Button variant="outlined" onClick={() => { mudarStep('proximo') }}>Próximo</Button>
                </article>
            </div>
        </main>
    )
}

export default CadastroCliente;