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
import dayjs from "dayjs";

// --------------- ESTILIZAÇÃO DE COMPONENTES DO MATERIAL UI

const styledTextField = {
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontFamily: '"Nunito", sans-serif;',
        color: '#000'
    },
};

const styledSelect = {
    '& .MuiSelect-select': {
        width: '36px',
    },
    '& .css-1umw9bq-MuiSvgIcon-root': {
        display: 'none'
    }
}

let dataNascimento = '';
let estadoOndeMora = '';

// --------------- PÁGINA DE CADASTRO

const CadastroCliente = () => {
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    // Form de dados básicos
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [nascimento, setNascimento] = useState('');
    const pegarDataNascimento = (e: any) => {
        e.preventDefault();

        if (nascimento) {
            const data = new Date(nascimento)
            let dia = `${data.getDate()}`;
            let mes = `${data.getMonth() + 1}`;
            let ano = `${data.getFullYear()}`;

            if (dia.length < 2) {
                dia = `0${dia}`;
            }

            if (mes.length < 2) {
                mes = `0${mes}`;
            }

            dataNascimento = `${dia}/${mes}/${ano}`;

        }

        if (estado) {
            estadoOndeMora = estado;
        }
    }

    // Form de localização e contato
    const todosOsEstados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState<string | null>();
    const [ddd, setDdd] = useState('')
    const [telefone, setTelefone] = useState('')
    const capturaValoresSelect = { options: todosOsEstados.map((option) => option) };

    // Do form de seguranca
    const selecaoMudarSenha = () => setMostrarSenha((show) => !show);
    const selecaoMudarConfirmSenha = () => setMostrarConfirmSenha((show) => !show);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmSenha, setMostrarConfirmSenha] = useState(false);
    const MouseDownMudarSenha = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };
    const MouseUpMudarSenha = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

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

            <form onSubmit={pegarDataNascimento} className="sh-cadastro-formulario">
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
                        {/* dados básicos */}
                        {activeStep == 0 &&
                            <article className="sh-dados sh-dados-iniciais">

                                <TextField
                                    id="standard-basic-nome"
                                    label="Nome"
                                    variant="standard"
                                    type="text"
                                    sx={styledTextField}
                                    onChange={(e: any) => setNome(e.target.value)}
                                    defaultValue={nome ? nome : ''}
                                />

                                <TextField
                                    id="standard-basic-sobrenome"
                                    label="Sobrenome"
                                    variant="standard"
                                    type="text"
                                    sx={styledTextField}
                                    onChange={(e: any) => setSobrenome(e.target.value)}
                                    defaultValue={sobrenome ? sobrenome : ''}
                                />

                                <TextField
                                    id="standard-basic-cpfCnpj"
                                    label="CPF/CNPJ"
                                    variant="standard"
                                    type="number"
                                    sx={styledTextField}
                                    onChange={(e: any) => setCpfCnpj(e.target.value)}
                                    defaultValue={cpfCnpj ? cpfCnpj : ''}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {dataNascimento &&
                                        <DateField
                                            id="TESTEEEEE"
                                            label="Nascimento"
                                            variant="standard"
                                            format="DD/MM/YYYY"
                                            sx={styledTextField}
                                            onChange={(e: any) => setNascimento(e)}
                                            defaultValue={dayjs(dataNascimento)}
                                        />
                                    }

                                    {!dataNascimento && <DateField
                                        label="Nascimento"
                                        variant="standard"
                                        format="DD/MM/YYYY"
                                        sx={styledTextField}
                                        onChange={(e: any) => setNascimento(e)}
                                    />}
                                </LocalizationProvider>
                            </article>
                        }

                        {/* localização e contato */}
                        {activeStep == 1 &&
                            <ul className="sh-dados sh-dados-localizacao">
                                <li className="sh-dados-localizacao-item">
                                    <TextField
                                        label="Rua"
                                        variant="standard"
                                        type="text"
                                        sx={styledTextField}
                                        className="sh-cadastro-rua"
                                        defaultValue={rua}
                                        onChange={(e) => setRua(e.target.value)}
                                    />

                                    <TextField
                                        label="Numero"
                                        variant="standard"
                                        type="number"
                                        sx={styledTextField}
                                        className="sh-cadastro-numero sh-dados-simples"
                                        defaultValue={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                    />
                                </li>

                                <li className="sh-dados-localizacao-item">
                                    <TextField
                                        label="Cidade"
                                        variant="standard"
                                        type="text"
                                        sx={styledTextField}
                                        className="sh-cadastro-cidade"
                                        defaultValue={cidade}
                                        onChange={(e) => setCidade(e.target.value)}
                                    />

                                    {estadoOndeMora && <Stack spacing={1} sx={styledSelect}>
                                        <Autocomplete
                                            {...capturaValoresSelect}
                                            disableClearable
                                            value={estadoOndeMora}
                                            onChange={(event: any, newValue: string | null) => {
                                                setEstado(newValue);
                                                pegarDataNascimento(event)
                                            }}
                                            renderInput={(parametros) => (
                                                <TextField {...parametros}
                                                    label="Estado"
                                                    variant="standard" />
                                            )}
                                        />
                                    </ Stack>}

                                    {!estadoOndeMora && <Stack spacing={1} sx={styledSelect}>
                                        <Autocomplete
                                            {...capturaValoresSelect}
                                            disableClearable
                                            onChange={(event: any, newValue: string | null) => {
                                                setEstado(newValue);
                                                pegarDataNascimento(event)
                                            }}
                                            renderInput={(parametros) => (
                                                <TextField {...parametros}
                                                    label="Estado"
                                                    variant="standard" />
                                            )}
                                        />
                                    </ Stack>}
                                </li>

                                <li className="sh-dados-localizacao-item">
                                    <TextField
                                        label="DDD"
                                        variant="standard"
                                        type="number"
                                        sx={styledTextField}
                                        className="sh-cadastro-ddd sh-dados-simples"
                                        defaultValue={ddd}
                                        onChange={(e) => setDdd(e.target.value)}
                                    />

                                    <TextField
                                        label="Telefone"
                                        variant="standard"
                                        type="number"
                                        sx={styledTextField}
                                        className="sh-cadastro-telefone"
                                        defaultValue={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                    />
                                </li>
                            </ul>
                        }

                        {/* E-mail e senha */}
                        {activeStep == 2 &&
                            <article className="sh-dados sh-dados-seguranca">
                                <TextField
                                    id="standard-basic-email"
                                    label="E-mail"
                                    variant="standard"
                                    type="email"
                                    sx={styledTextField}
                                    defaultValue={email}
                                    onChange={((e) => { setEmail(e.target.value) })}
                                />

                                <FormControl variant="standard">
                                    <InputLabel htmlFor="sh_label_senha_input">Senha</InputLabel>
                                    <Input
                                        id="sh_label_senha_input"
                                        type={mostrarSenha ? 'text' : 'password'}
                                        defaultValue={senha}
                                        onChange={((e) => { setSenha(e.target.value) })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={selecaoMudarSenha}
                                                    onMouseDown={MouseDownMudarSenha}
                                                    onMouseUp={MouseUpMudarSenha}
                                                >
                                                    {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>


                                <FormControl variant="standard">
                                    <InputLabel htmlFor="sh_label_confirm_senha_input">Confirmar senha</InputLabel>
                                    <Input
                                        id="sh_label_confirm_senha_input"
                                        type={mostrarConfirmSenha ? 'text' : 'password'}
                                        defaultValue={confirmSenha}
                                        onChange={((e) => { setConfirmSenha(e.target.value) })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={selecaoMudarConfirmSenha}
                                                    onMouseDown={MouseDownMudarSenha}
                                                    onMouseUp={MouseUpMudarSenha}
                                                >
                                                    {mostrarConfirmSenha ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </article>
                        }
                    </div>
                </div>

                <article className="sh-cadastro-buttons">
                    {activeStep == 0 && <Link to="/" className="sh-cadastro-button-link"> <img src={homeImg} alt="Butão para voltar para a home" className="sh-cadastro-button-home" /> </Link>}
                    <button type="submit" className="sh-cadastro-button-elemento">
                        {activeStep > 0 &&
                            <img src={anteriorImg} alt="Butão para voltar para a home" className="sh-cadastro-button-anterior" onClick={() => { mudarStep('anterior') }} />
                        }
                    </button>

                    <button type="submit" className="sh-cadastro-button-elemento">
                        {activeStep === 0 &&
                            <img src={proximoImg} alt="Butão para voltar para a home" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }} />
                        }
                        {activeStep === 1 &&
                            <img src={proximoImg} alt="Butão para voltar para a home" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }} />
                        }
                        {activeStep === 2 &&
                            <img src={concluirImg} alt="Butão para voltar para a home" className="sh-cadastro-button-concluir" />
                        }
                    </button>
                </article>
            </form>
        </main>
    )
}

export default CadastroCliente;
