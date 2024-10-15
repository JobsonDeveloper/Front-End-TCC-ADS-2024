import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CadastroCliente.css';

// Components
import logo from '../../assets/icons/logoLogin.svg';
import imgDescricao from '../../assets/icons/descricao.svg';
import imgLogin from '../../assets/icons/btn-login.svg';
import Loading from "../../components/loading/Loading";
import { Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export const FormDadosBase = () => {
    return (
        <article className="sh-dados sh-dados-iniciais">
            <TextField id="outlined-basic" label="Nome" variant="outlined" type="text" />
            <TextField id="outlined-basic" label="Sobrenome" variant="outlined" type="text" />
            <TextField id="outlined-basic" label="CPF" variant="outlined" type="number" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField label="Nascimento" format="DD/MM/YYYY" />
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
                <Stepper activeStep={activeStep} className="sh-steper-cadastro">
                    <Step>
                        <StepLabel />
                    </Step>
                    <Step>
                        <StepLabel />
                    </Step>
                    <Step>
                        <StepLabel />
                    </Step>
                    <Step>
                        <StepLabel />
                    </Step>
                </Stepper>
                <div className="sh-formulario-inputs">
                    {activeStep == 0 && <FormDadosBase />}
                    {activeStep == 1 && <FormLocalizacaoContato />}
                    {activeStep == 2 && <FormSeguranca />}
                    {activeStep == 3 && <FormConfirmaDados />}
                </div>
                <Button variant="outlined" onClick={() => { mudarStep('anterior') }}>Voltar</Button>
                <Button variant="outlined" onClick={() => { mudarStep('proximo') }}>Próximo</Button>
            </div>
        </main>
    )
}

export default CadastroCliente;