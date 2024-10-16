import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './CadastroCliente.css';
import { Autocomplete, FormControl, IconButton, Input, InputAdornment, InputLabel, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Visibility, VisibilityOff } from "@mui/icons-material";

// IMPORTAÇÃO DE COMPONENTES
import logoImg from '../../assets/CadastroCliente/icons/logo.svg';
import homeImg from '../../assets/CadastroCliente/icons/home.png'
import proximoImg from '../../assets/CadastroCliente/icons/proximo.png'
import anteriorImg from '../../assets/CadastroCliente/icons/anterior.png'
import concluirImg from '../../assets/CadastroCliente/icons/concluir.png'
import tituloPaginaImg from '../../assets/CadastroCliente/icons/cadastroCliente.png'
import Loading from "../../components/loading/Loading";

// --------------- ESTILIZAÇÃO DE COMPONENTES DO MATERIAL UI

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

const styledSelect = {
    '& .MuiSelect-select': {
        width: '36px',
    },
    '& .css-1umw9bq-MuiSvgIcon-root': {
        display: 'none'
    }
}

// --------------- COMPONENTES

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

    const todosOsEstados = [
        { estado: 'AC' },
        { estado: 'AL' },
        { estado: 'AP' },
        { estado: 'AM' },
        { estado: 'BA' },
        { estado: 'CE' },
        { estado: 'ES' },
        { estado: 'GO' },
        { estado: 'MA' },
        { estado: 'MT' },
        { estado: 'MS' },
        { estado: 'MG' },
        { estado: 'PA' },
        { estado: 'PB' },
        { estado: 'PR' },
        { estado: 'PE' },
        { estado: 'PI' },
        { estado: 'RJ' },
        { estado: 'RN' },
        { estado: 'RS' },
        { estado: 'RO' },
        { estado: 'RR' },
        { estado: 'SC' },
        { estado: 'SP' },
        { estado: 'SE' },
        { estado: 'TO' }
    ];

    const capturaValoresSelect = {
        options: todosOsEstados,
        getOptionLabel: (option:any) => option.estado,
    };


    return (
        <ul className="sh-dados sh-dados-localizacao">
            <li className="sh-dados-localizacao-item">
                <TextField id="standard-basic" label="Rua" variant="standard" type="text" sx={styledTextField} className="sh-cadastro-rua" />
                <TextField id="standard-basic" label="Numero" variant="standard" type="number" sx={styledTextField} className="sh-cadastro-numero sh-dados-simples" />
            </li>
            <li className="sh-dados-localizacao-item">
                <TextField id="standard-basic" label="Cidade" variant="standard" type="text" sx={styledTextField} className="sh-cadastro-cidade" />
                <Stack spacing={1} sx={styledSelect}>
                    <Autocomplete
                        {...capturaValoresSelect}
                        id="disable-clearable"
                        disableClearable
                        renderInput={(parametros) => (
                            <TextField {...parametros} label="Estado" variant="standard"/>
                        )}
                    />
                </ Stack>
            </li>
            <li className="sh-dados-localizacao-item">
                <TextField id="standard-basic" label="DDD" variant="standard" type="number" sx={styledTextField} className="sh-cadastro-ddd sh-dados-simples" />
                <TextField id="standard-basic" label="Telefone" variant="standard" type="number" sx={styledTextField} className="sh-cadastro-telefone" />
            </li>
        </ul>
    )
}

export const FormSeguranca = () => {
    const selecaoMudarSenha = () => setShowPassword((show) => !show);
    const selecaoMudarConfirmSenha = () => setshowConfirmPassword((show) => !show);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    const MouseDownMudarSenha = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const MouseUpMudarSenha = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <article className="sh-dados sh-dados-seguranca">
            <TextField id="standard-basic" label="E-mail" variant="standard" type="email" sx={styledTextField} />
            <FormControl variant="standard">
                <InputLabel htmlFor="sh_label_senha_input">Senha</InputLabel>
                <Input
                    id="sh_label_senha_input"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={selecaoMudarSenha}
                                onMouseDown={MouseDownMudarSenha}
                                onMouseUp={MouseUpMudarSenha}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>


            <FormControl variant="standard">
                <InputLabel htmlFor="sh_label_confirm_senha_input">Confirmar senha</InputLabel>
                <Input
                    id="sh_label_confirm_senha_input"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={selecaoMudarConfirmSenha}
                                onMouseDown={MouseDownMudarSenha}
                                onMouseUp={MouseUpMudarSenha}
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </article>
    )
}

// --------------- PÁGINA DE CADASTRO

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

                <div className="sh-stepersForm">
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
                </div>

                <article className="sh-cadastro-buttons">
                    {activeStep == 0 && <Link to="/" className="sh-cadastro-button-link"> <img src={homeImg} alt="Butão para voltar para a home" className="sh-cadastro-button-home" /> </Link>}
                    {activeStep > 0 && <img src={anteriorImg} alt="Butão para voltar para a home" className="sh-cadastro-button-anterior" onClick={() => { mudarStep('anterior') }} />}
                    {activeStep < 2 && <img src={proximoImg} alt="Butão para voltar para a home" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }} />}
                    {activeStep == 2 && <img src={concluirImg} alt="Butão para voltar para a home" className="sh-cadastro-button-concluir" />}
                </article>
            </div>
        </main>
    )
}

export default CadastroCliente;
