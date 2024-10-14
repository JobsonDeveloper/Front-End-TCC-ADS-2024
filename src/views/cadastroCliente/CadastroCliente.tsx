import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CadastroCliente.css';

// Components
import logo from '../../assets/icons/logoLogin.svg';
import imgDescricao from '../../assets/icons/descricao.svg';
import imgLogin from '../../assets/icons/btn-login.svg';
import Loading from "../../components/loading/Loading";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const FormDadosBase = () => {
    return (
        <div className="sh-dados-iniciais">
            Nome, Sobrenome, CPF, Nascimento
        </div>
    )
}

export const FormLocalizacaoContato = () => {
    return (
        <div className="sh-dados-iniciais">
            Rua, Número, Cidade, Estado, DDD, Telefone
        </div>
    )
}

export const FormSeguranca = () => {
    return (
        <div className="sh-dados-iniciais">
            E-mail, Senha, Confirmar senha
        </div>
    )
}

export const FormConfirmaDados = () => {
    return (
        <div className="sh-dados-iniciais">
            Lista de todos os dados
        </div>
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
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {activeStep == 0 && <FormDadosBase />}
                    {activeStep == 1 && <FormLocalizacaoContato />}
                    {activeStep == 2 && <FormSeguranca />}
                    {activeStep == 3 && <FormConfirmaDados />}
                </Typography>
                <Button variant="outlined" onClick={() => { mudarStep('anterior') }}>Voltar</Button>
                <Button variant="outlined" onClick={() => { mudarStep('proximo') }}>Próximo</Button>
            </div>
        </main>
    )
}

export default CadastroCliente;