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


// --------------- COMPONENTES

// export const FormDadosBase = () => {
//     const [nome, setNome] = useState('');
//     const [sobrenome, setSobrenome] = useState('');
//     const [cpfCnpj, setCpfCnpj] = useState('');
//     const [nascimento, setNascimento] = useState('');

//     useEffect(() => {
//         if (localStorage.getItem('nome')) {
//             setNome(`${localStorage.getItem('nome')}`);
//         }

//         if (localStorage.getItem('sobrenome')) {
//             setSobrenome(`${localStorage.getItem('sobrenome')}`);
//         }

//         if (localStorage.getItem('cpfCnpj')) {
//             setCpfCnpj(`${localStorage.getItem('cpfCnpj')}`);
//         }

//         if (localStorage.getItem('nascimento')) {
//             const data = new Date(`${localStorage.getItem('nascimento')}`)
//             let dia = `${data.getDate()}`;
//             let mes = `${data.getMonth() + 1}`;
//             let ano = `${data.getFullYear()}`;

//             if (dia.length < 2) {
//                 dia = `0${dia}`;
//             }

//             if (mes.length < 2) {
//                 mes = `0${mes}`;
//             }

//             setNascimento(`${dia}/${mes}/${ano}`);

//         }
//     })

//     return (
//         <article className="sh-dados sh-dados-iniciais">
//             {nome && <TextField
//                 id="standard-basic-nome"
//                 label="Nome"
//                 variant="standard"
//                 type="text"
//                 sx={styledTextField}
//                 onChange={(e: any) => localStorage.setItem('nome', e.target.value)}
//                 defaultValue={nome}
//             />}

//             {!nome && <TextField
//                 id="standard-basic-nome"
//                 label="Nome"
//                 variant="standard"
//                 type="text"
//                 sx={styledTextField}
//                 onChange={(e: any) => localStorage.setItem('nome', e.target.value)}
//             />}

//             {sobrenome && <TextField
//                 id="standard-basic-sobrenome"
//                 label="Sobrenome"
//                 variant="standard"
//                 type="text"
//                 sx={styledTextField}
//                 onChange={(e: any) => localStorage.setItem('sobrenome', e.target.value)}
//                 defaultValue={sobrenome}
//             />}

//             {!sobrenome && <TextField
//                 id="standard-basic-sobrenome"
//                 label="Sobrenome"
//                 variant="standard"
//                 type="text"
//                 sx={styledTextField}
//                 onChange={(e: any) => localStorage.setItem('sobrenome', e.target.value)}
//                 defaultValue={sobrenome}
//             />}

//             {cpfCnpj && <TextField
//                 id="standard-basic-cpfCnpj"
//                 label="CPF/CNPJ"
//                 variant="standard"
//                 type="number"
//                 sx={styledTextField}
//                 onChange={(e: any) => localStorage.setItem('cpfCnpj', e.target.value)}
//                 defaultValue={cpfCnpj}
//             />}

//             {!cpfCnpj && <TextField
//                 id="standard-basiccpfCnpj"
//                 label="CPF/CNPJ"
//                 variant="standard"
//                 type="number"
//                 sx={styledTextField}
//                 onChange={(e: any) => localStorage.setItem('cpfCnpj', e.target.value)}
//                 defaultValue={cpfCnpj}
//             />}

//             {/* Se não tiver umda data já escrita */}
//             {!nascimento &&
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DateField
//                         label="Nascimento"
//                         variant="standard"
//                         format="DD/MM/YYYY"
//                         sx={styledTextField}
//                         onChange={(e: any) => localStorage.setItem('nascimento', e)}
//                     />
//                 </LocalizationProvider>
//             }

//             {/* Se não tiver umda data já escrita */}
//             {nascimento && <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateField
//                     label="Nascimento"
//                     variant="standard"
//                     format="DD/MM/YYYY"
//                     defaultValue={dayjs(nascimento)}
//                     sx={styledTextField}
//                     onChange={(e: any) => localStorage.setItem('nascimento', e)}
//                 />
//             </LocalizationProvider>}


//         </article>
//     )
// }

export const FormLocalizacaoContato = () => {
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [ddd, setDdd] = useState('')
    const [telefone, setTelefone] = useState('')

    if (localStorage.getItem('rua')) {
        setRua(`${localStorage.getItem('rua')}`);
    }

    if (localStorage.getItem('numero')) {
        setNumero(`${localStorage.getItem('numero')}`);
    }

    if (localStorage.getItem('cidade')) {
        setCidade(`${localStorage.getItem('cidade')}`);
    }

    if (localStorage.getItem('estado')) {
        setEstado(`${localStorage.getItem('estado')}`);
    }

    if (localStorage.getItem('ddd')) {
        setDdd(`${localStorage.getItem('ddd')}`);
    }

    if (localStorage.getItem('telefone')) {
        setTelefone(`${localStorage.getItem('telefone')}`);
    }

    const todosOsEstados = [
        { estado: 'AC', id: 1 },
        { estado: 'AL', id: 2 },
        { estado: 'AP', id: 3 },
        { estado: 'AM', id: 4 },
        { estado: 'BA', id: 5 },
        { estado: 'CE', id: 6 },
        { estado: 'ES', id: 7 },
        { estado: 'GO', id: 8 },
        { estado: 'MA', id: 9 },
        { estado: 'MT', id: 10 },
        { estado: 'MS', id: 11 },
        { estado: 'MG', id: 12 },
        { estado: 'PA', id: 13 },
        { estado: 'PB', id: 14 },
        { estado: 'PR', id: 15 },
        { estado: 'PE', id: 16 },
        { estado: 'PI', id: 17 },
        { estado: 'RJ', id: 18 },
        { estado: 'RN', id: 19 },
        { estado: 'RS', id: 20 },
        { estado: 'RO', id: 21 },
        { estado: 'RR', id: 22 },
        { estado: 'SC', id: 23 },
        { estado: 'SP', id: 24 },
        { estado: 'SE', id: 25 },
        { estado: 'TO', id: 26 }
    ];

    const capturaValoresSelect = {
        options: todosOsEstados.map((option) => option.estado),
    };

    interface tiposDadosEstado {
        estado: string;
        id: number;
    }

    // const capturaValoresSelect = {
    //     options: todosOsEstados,
    //     getOptionLabel: (option: any) => option.estado,
    // };

    return (
        <ul className="sh-dados sh-dados-localizacao">
            <li className="sh-dados-localizacao-item">
                {rua && <TextField
                    id="standard-basic"
                    label="Rua"
                    variant="standard"
                    type="text"
                    sx={styledTextField}
                    className="sh-cadastro-rua"
                    defaultValue={rua}
                />}

                {!rua && <TextField
                    id="standard-basic"
                    label="Rua"
                    variant="standard"
                    type="text"
                    sx={styledTextField}
                    className="sh-cadastro-rua"
                />}

                {numero && <TextField
                    id="standard-basic"
                    label="Numero"
                    variant="standard"
                    type="number"
                    sx={styledTextField}
                    className="sh-cadastro-numero sh-dados-simples"
                    defaultValue={numero}
                />}

                {!numero && <TextField
                    id="standard-basic"
                    label="Numero"
                    variant="standard"
                    type="number"
                    sx={styledTextField}
                    className="sh-cadastro-numero sh-dados-simples"
                />}
            </li>

            <li className="sh-dados-localizacao-item">
                {cidade && <TextField
                    id="standard-basic-cidade"
                    label="Cidade"
                    variant="standard"
                    type="text"
                    sx={styledTextField}
                    className="sh-cadastro-cidade"
                    defaultValue={cidade}
                />}

                {!cidade && <TextField
                    id="standard-basic-cidade"
                    label="Cidade"
                    variant="standard"
                    type="text"
                    sx={styledTextField}
                    className="sh-cadastro-cidade"
                />}

                {estado && <Stack spacing={1} sx={styledSelect}>
                    <Autocomplete
                        {...capturaValoresSelect}
                        id="disable-clearable-estado"
                        disableClearable
                        onChange={(event: any, newValue: any) => {
                            setEstado(`${newValue}`);
                            console.log(estado);
                        }}
                        renderInput={(parametros) => (
                            <TextField {...parametros}
                                label="Estado"
                                variant="standard" />
                        )}
                    />
                </ Stack>}

                {!estado && <Stack spacing={1} sx={styledSelect}>
                    <Autocomplete
                        {...capturaValoresSelect}
                        id="disable-clearable-estado"
                        disableClearable
                        renderInput={(parametros) => (
                            <TextField {...parametros}
                                label="Estado"
                                variant="standard" />
                        )}
                    />
                </ Stack>}
            </li>

            <li className="sh-dados-localizacao-item">
                {ddd && <TextField
                    id="standard-basic-ddd"
                    label="DDD"
                    variant="standard"
                    type="number"
                    sx={styledTextField}
                    className="sh-cadastro-ddd sh-dados-simples"
                    defaultValue={ddd}
                />}

                {!ddd && <TextField
                    id="standard-basic-ddd"
                    label="DDD"
                    variant="standard"
                    type="number"
                    sx={styledTextField}
                    className="sh-cadastro-ddd sh-dados-simples"
                />}

                {telefone && <TextField
                    id="standard-basic-telefone"
                    label="Telefone"
                    variant="standard"
                    type="number"
                    sx={styledTextField}
                    className="sh-cadastro-telefone"
                    defaultValue={telefone}
                />}

                {!telefone && <TextField
                    id="standard-basic-telefone"
                    label="Telefone"
                    variant="standard"
                    type="number"
                    sx={styledTextField}
                    className="sh-cadastro-telefone"
                />}
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
            <TextField id="standard-basic-email" label="E-mail" variant="standard" type="email" sx={styledTextField} />
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

    // Form de dados básicos
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [nascimento, setNascimento] = useState('');

    // Form de localização e contato
    const todosOsEstados = [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO'
    ];
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    // const [estado, setEstado]:any = useState('')
    const [estado, setEstado] = useState<string | null>();
    const [ddd, setDdd] = useState('')
    const [telefone, setTelefone] = useState('')
    
    const capturaValoresSelect = {
        options: todosOsEstados.map((option) => option),
    };

    interface tiposDadosEstado {
        estado: string;
        id: number;
    }

    function mostrar() {
        console.log(localStorage.getItem('nome'));
        console.log(localStorage.getItem('sobrenome'));
        console.log(localStorage.getItem('cpfCnpj'));

        const data = new Date(`${localStorage.getItem('nascimento')}`)
        let dia = `${data.getDate()}`;
        let mes = `${data.getMonth() + 1}`;
        let ano = `${data.getFullYear()}`;

        if (dia.length < 2) {
            dia = `0${dia}`;
        }

        if (mes.length < 2) {
            mes = `0${mes}`;
        }

        console.log(`${dia}-${mes}-${ano}`);
    }

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
    }

    const pegarEstado = (e: any) => {
        e.preventDefault();

        if(estado) {
            estadoOndeMora = estado;
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
                        {activeStep == 2 && <FormSeguranca />}
                    </div>
                </div>

                <article className="sh-cadastro-buttons">
                    {activeStep == 0 && <Link to="/" className="sh-cadastro-button-link"> <img src={homeImg} alt="Butão para voltar para a home" className="sh-cadastro-button-home" /> </Link>}
                    {activeStep > 0 && <img src={anteriorImg} alt="Butão para voltar para a home" className="sh-cadastro-button-anterior" onClick={() => { mudarStep('anterior') }} />}

                    {activeStep == 0 && <button type="submit" className="sh-cadastro-button-elemento"><img src={proximoImg} alt="Butão para voltar para a home" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }} /></button>}
                    {activeStep == 1 && <button type="button" onClick={pegarEstado} className="sh-cadastro-button-elemento"><img src={proximoImg} alt="Butão para voltar para a home" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }} /></button>}
                    {activeStep == 2 && <button type="submit" className="sh-cadastro-button-elemento"><img src={concluirImg} alt="Butão para voltar para a home" className="sh-cadastro-button-concluir" /></button>}
                </article>
            </form>
        </main>
    )
}

export default CadastroCliente;
