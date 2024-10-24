import './CadastroFreelancer.css'
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, Input, InputAdornment, InputLabel, Slide, Step, StepLabel, Stepper, SvgIcon, TextField } from "@mui/material";
import { color, fontFamily, fontSize, Stack } from "@mui/system";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Visibility, VisibilityOff } from "@mui/icons-material";

// IMPORTAÇÃO DE COMPONENTES
import logoImg from '../../assets/CadastroFreelancer/icons/logo.svg';
import homeImg from '../../assets/CadastroFreelancer/icons/home.png'
import proximoImg from '../../assets/CadastroFreelancer/icons/proximo.png'
import anteriorImg from '../../assets/CadastroFreelancer/icons/anterior.png'
import concluirImg from '../../assets/CadastroFreelancer/icons/concluir.png'
import tituloPaginaImg from '../../assets/CadastroFreelancer/icons/cadastroFreelancer.png'
import Loading from "../../components/loading/Loading";
import dayjs from "dayjs";
import { TransitionProps } from "@mui/material/transitions";

// Icons Material UI
import UploadIcon from '@mui/icons-material/Upload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IMaskInput } from 'react-imask';


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

const styledSelectServicos = {
    '& .MuiSelect-select': {
        width: '100px',
    },

    '& .css-1umw9bq-MuiSvgIcon-root': {
        display: 'none'
    },

    '& .MuiInputBase-input': {
        color: '#494949',
        fontFamily: '"Nunito", sans-serif',
        fontSize: '1rem'
    }
}

const styledDialog = {
    '& .MuiTypography-h6': {
        color: '#000',
        fontFamily: '"Nunito", sans-serif',
        fontSize: '1.4rem'
    },

    '& .MuiDialogContent-root': {
        display: 'grid',
        gap: '5px',

        '& .MuiDialogContentText-root': {
            color: '#494949',
            fontFamily: '"Nunito", sans-serif',
            fontSize: '1rem',

            '& a': {
                textDecoration: 'none'
            }
        },

        '& .sh-termos-subtitulos': {
            fontWeight: 'bold',
            marginTop: '10px'
        }
    }


};

const ShAlert = () => {
    return (
        <>
            {tipoAlert === 0 &&
                <Alert severity="success">
                    {mensagemAlert}
                </Alert>
            }

            {tipoAlert === 1 &&
                <Alert severity="info">
                    {mensagemAlert}
                </Alert>
            }

            {tipoAlert === 2 &&
                <Alert severity="warning">
                    {mensagemAlert}
                </Alert>
            }

            {tipoAlert === 3 &&
                <Alert severity="error">
                    {mensagemAlert}
                </Alert>
            }
        </>
    )
}

const Transition = React.forwardRef(
    function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

let dataNascimento = '';
let estado = '';
let mensagemAlert = "";
let tipoAlert = 0;

// --------------- PÁGINA DE CADASTRO

const CadastroFreelancer = () => {
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const pagina = useNavigate();

    // Form de dados básicos
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [nascimento, setNascimento] = useState('');
    const pegarDadosForm = (e: any) => {
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

            dataNascimento = `${mes}/${dia}/${ano}`;

        }
    }

    // Form de localização e contato
    const todosOsEstados = [
        'AC', 'AL', 'AP', 'AM', 'BA',
        'CE', 'ES', 'GO', 'MA', 'MT',
        'MS', 'MG', 'PA', 'PB', 'PR',
        'PE', 'PI', 'RJ', 'RN', 'RS',
        'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];
    const dadosServicos = [
        'Reparo de Televisor',
        'Reparo de Notebook',
        'Reparo de Computador',
        'Reparo de Ar-condicionado',
        'Reparo de Smartphone',
        'Instalação de Ar-condicionado',
        'Instalação de Câmera',
        'Reparo de Geladeira',
        'Reparo de Microondas',
        'Reparo de Console'
    ];
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState<string | null>();
    const [ddd, setDdd] = useState('')
    const [telefone, setTelefone] = useState('')
    const capturaValoresSelect = { options: todosOsEstados.map((option) => option) };
    const capturaServicos = { options: dadosServicos.map((option) => option) };

    // Do form de imagens
    const [imgFrentRg, setImgFrentRg] = useState();
    const [imgVersoRg, setImgVersoRg] = useState();
    const [imgAntecedentes, setImgAntecedentes] = useState();

    const pegaImgRgFrente = (documento: any) => {
        let imgFrenteRg = documento.target.files;
        let tipoImgFrenteRg = imgFrenteRg[0].type;

        if (imgFrenteRg < 1) {
            tipoAlert = 2;
            mensagemAlert = "A imagem não foi fornecida!"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else if (
            (tipoImgFrenteRg != 'image/png')
            && (tipoImgFrenteRg != 'image/jpeg')
        ) {
            tipoAlert = 2;
            mensagemAlert = "Formatos aceitos: PNG ou JPEG"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else {
            setImgFrentRg(imgFrenteRg);
        }
    }
    const pegaImgRgVerso = (documento: any) => {
        let imgVersoRg = documento.target.files;
        let tipoImgVersoRg = imgVersoRg[0].type;

        if (imgVersoRg < 1) {
            tipoAlert = 2;
            mensagemAlert = "A imagem não foi fornecida!"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else if (
            (tipoImgVersoRg != 'image/png')
            && (tipoImgVersoRg != 'image/jpeg')
        ) {
            tipoAlert = 3;
            mensagemAlert = "Formatos aceitos: PNG ou JPEG"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else {
            setImgVersoRg(imgVersoRg);
        }
    }
    const pegaImgAntecedentes = (documento: any) => {
        let imgAntecedentes = documento.target.files;
        let tipoImgAntecedentes = imgAntecedentes[0].type;

        if (imgAntecedentes < 1) {
            tipoAlert = 3;
            mensagemAlert = "A imagem não foi fornecida!"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else if (
            (tipoImgAntecedentes != 'image/png')
            && (tipoImgAntecedentes != 'image/jpeg')
        ) {
            tipoAlert = 3;
            mensagemAlert = "Formatos aceitos: PNG ou JPEG"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
            }, 4000);
        }
        else {
            setImgAntecedentes(imgAntecedentes);
        }

    }

    // Serviços
    const [servicoUm, setServicoUm] = useState<string | null>();
    const [servicoDois, setServicoDois] = useState<string | null>();
    const [servicoTres, setServicoTres] = useState<string | null>();

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
    const [termosAceitos, setTermosAceitos] = useState(false);
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [requisicao, setRequisicao] = useState(false);

    const alteraTermosAceitos = () => {
        if (termosAceitos === true) {
            setTermosAceitos(false);
        }
        else {
            setTermosAceitos(true);
        }

    }

    // Do dialog de termos de uso
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!requisicao) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    });

    function cadastroFreelancer(e: any) {
        if ((email === "") || (senha === "") || (confirmSenha === "")) {
            tipoAlert = 2;
            mensagemAlert = "Preencha todos os campos!"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                return;
            }, 4000);
        }
        else if (senha != confirmSenha) {
            tipoAlert = 2;
            mensagemAlert = "As senhas estão diferentes!"
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                return;
            }, 4000);
        }
        else if (!termosAceitos) {
            tipoAlert = 2;
            mensagemAlert = "É preciso aceitar os termos de uso!"

            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                return;
            }, 4000);
        }
        else {
            const shDate = new Date(nascimento);
            let nascimentoDia = `${shDate.getDate()}`;
            let nascimentoMes = `${shDate.getMonth() + 1}`;
            let nascimentoAno = `${shDate.getFullYear()}`;
            let listaServicos = "";

            if (nascimentoDia.length < 2) {
                nascimentoDia = `0${nascimentoDia}`;
            }

            if (nascimentoMes.length < 2) {
                nascimentoMes = `0${nascimentoMes}`;
            }

            if (servicoUm != undefined) {
                listaServicos += `${servicoUm}`;
            }

            if (servicoDois != undefined) {
                if(servicoUm === undefined) {
                    listaServicos += `${servicoDois}`;
                }
                else {
                    listaServicos += `,${servicoDois}`;
                }
            }

            if (servicoTres != undefined) {
                if((servicoUm === undefined) && (servicoDois === undefined)) {
                    listaServicos += `${servicoTres}`;
                }
                else {
                    listaServicos += `,${servicoTres}`;
                }
            }

            let base64FrenteRG = "";
            let base64VersoRG = "";
            let base64Anteced = "";

            if (imgFrentRg && imgVersoRg && imgAntecedentes) {
                let lerImagemUm = new FileReader();
                let lerImagemDois = new FileReader();
                let lerImagemTres = new FileReader();

                lerImagemUm.onload = function (arquivo: any) {
                    base64FrenteRG = arquivo.target.result;

                    lerImagemDois.onload = function (arquivo: any) {
                        base64VersoRG = arquivo.target.result;

                        lerImagemTres.onload = function (arquivo: any) {
                            base64Anteced = arquivo.target.result;

                            async function requisicao(e: any) {
                                e.preventDefault();

                                try {
                                    setLoading(true);
                                    setRequisicao(true);
                                    const formData = new FormData();
                                    formData.append('acao', 'cadfreela');
                                    formData.append('nome', nome);
                                    formData.append('sobrenome', sobrenome);
                                    formData.append('cpf', cpfCnpj);
                                    formData.append('data_nascimento', `${nascimentoAno}-${nascimentoMes}-${nascimentoDia}`);
                                    formData.append('endereco', `${rua}, numero ${numero}, ${cidade} - ${estado}`);
                                    formData.append('numero', `(${ddd}) ${telefone}`);
                                    formData.append('servicos', JSON.stringify(listaServicos));
                                    formData.append('rg_frente', base64FrenteRG);
                                    formData.append('rg_verso', base64VersoRG);
                                    formData.append('antecedentes_criminais', base64Anteced);
                                    formData.append('email', email);
                                    formData.append('senha', senha);

                                    const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                                        method: 'POST',
                                        mode: 'cors',
                                        body: formData
                                    });

                                    const response = await request.json();

                                    if (response.status === 201) {
                                        tipoAlert = 0;
                                        mensagemAlert = "Cadastro realizado!"
                                        setMostrarAlert(true);
                                        setRequisicao(false);
                                        pagina('/login');

                                        setTimeout(() => {
                                            setMostrarAlert(false);
                                            setLoading(false);
                                        }, 4000);

                                    }
                                    else if (response.status === 400) {
                                        tipoAlert = 2;
                                        mensagemAlert = "CPF inválido!"
                                        setMostrarAlert(true);
                                        setRequisicao(false);

                                        setTimeout(() => {
                                            setMostrarAlert(false);
                                            setLoading(false);
                                        }, 4000);
                                    }
                                    else {
                                        console.log(response.status)
                                        tipoAlert = 3;
                                        mensagemAlert = "Erro ao cadastrar!"
                                        setMostrarAlert(true);
                                        setRequisicao(false);

                                        setTimeout(() => {
                                            setMostrarAlert(false);
                                            setLoading(false);
                                        }, 4000);
                                    }


                                }
                                catch (error) {
                                    tipoAlert = 3;
                                    mensagemAlert = "Erro de requisição!"
                                    setMostrarAlert(true);
                                    setRequisicao(false);

                                    setTimeout(() => {
                                        setMostrarAlert(false);
                                        setLoading(false);
                                    }, 4000);
                                    console.error(error);
                                }
                            }

                            requisicao(e);
                        }

                        lerImagemTres.readAsDataURL(imgAntecedentes[0]);

                    }

                    lerImagemDois.readAsDataURL(imgVersoRg[0]);

                }

                lerImagemUm.readAsDataURL(imgFrentRg[0]);
            }
        }
    }

    const mudarStep = (variante: string) => {

        if (variante === 'proximo') {
            if (activeStep === 0) {
                if ((nome === "") || (sobrenome === "") || (cpfCnpj === "") || (nascimento === "")) {
                    tipoAlert = 2;
                    mensagemAlert = "Preencha todos os campos!"
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        return;
                    }, 4000);
                }
                else {
                    const hoje = new Date();
                    const diaAtual = hoje.getDate();
                    const mesAtual = hoje.getMonth() + 1;
                    const anoDeVerificacao = hoje.getFullYear() - 18;

                    let dataNascimento = new Date(nascimento);
                    let diaNascimento = dataNascimento.getDate();
                    let mesNascimento = dataNascimento.getMonth() + 1;
                    let anoNascimento = dataNascimento.getFullYear();

                    if (anoNascimento === anoDeVerificacao) {
                        if (mesNascimento === mesAtual) {
                            if (diaNascimento === diaAtual) {
                                setActiveStep((currentStep) => currentStep + 1);
                                return;
                            }
                            else {
                                tipoAlert = 2;
                                mensagemAlert = "Você é menor de idade!"
                                setMostrarAlert(true);

                                setTimeout(() => {
                                    setMostrarAlert(false);
                                    return;
                                }, 4000);
                            }
                        }
                        else if (mesNascimento < mesAtual) {
                            setActiveStep((currentStep) => currentStep + 1);
                            return;
                        }
                        else {
                            tipoAlert = 2;
                            mensagemAlert = "Você é menor de idade!"
                            setMostrarAlert(true);

                            setTimeout(() => {
                                setMostrarAlert(false);
                                return;
                            }, 4000);
                        }
                    }
                    else if (anoNascimento < anoDeVerificacao) {
                        setActiveStep((currentStep) => currentStep + 1);
                        return;
                    }
                    else {
                        tipoAlert = 2;
                        mensagemAlert = "Você é menor de idade!"
                        setMostrarAlert(true);

                        setTimeout(() => {
                            setMostrarAlert(false);
                            return;
                        }, 4000);
                    }
                }
            }

            if (activeStep === 1) {
                if ((rua === "") || (numero === "") || (cidade === "") || (estado === undefined) || (ddd === "") || (telefone === "")) {
                    tipoAlert = 2;
                    mensagemAlert = "Preencha todos os campos!"
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        return;
                    }, 4000);
                }
                else {
                    setActiveStep((currentStep) => currentStep + 1);
                }
            }

            if (activeStep === 2) {
                if ((imgFrentRg === "") || (imgVersoRg === "") || (imgAntecedentes === "")) {
                    tipoAlert = 2;
                    mensagemAlert = "Forneça as fotos solicitadas!"
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        return;
                    }, 4000);
                }
                else {
                    setActiveStep((currentStep) => currentStep + 1);
                }
            }

            if (activeStep >= 3) {
                if ((servicoUm != undefined) || (servicoUm != undefined) || (servicoUm != undefined)) {
                    setActiveStep((currentStep) => currentStep + 1);
                }
                else {
                    tipoAlert = 2;
                    mensagemAlert = "Nenhum serviço selecionado!"
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        return;
                    }, 4000);
                }
            }

            if (activeStep >= 4) {
                return;
            }

        }
        else {
            if (activeStep <= 0) {
                return;
            }

            setActiveStep((currentStep) => currentStep - 1);
        }

    }

    return (
        <main className="sh-cadastroFreelancer">
            {loading && <Loading />}

            <form onSubmit={pegarDadosForm} className="sh-cadastro-formulario">
                <article className="sh-cadastro-header">
                    <Link to="/"><img src={logoImg} alt="" className="sh-cadastro-logoImg" /></Link>
                    <img src={tituloPaginaImg} alt="" className="sh-cadastro-tituloPagina" />
                </article>

                <div className="sh-stepersForm">
                    <Stepper activeStep={activeStep} className="sh-steper-cadastro" alternativeLabel>
                        <Step> <StepLabel /> </Step>
                        <Step> <StepLabel /> </Step>
                        <Step> <StepLabel /> </Step>
                        <Step> <StepLabel /> </Step>
                        <Step> <StepLabel /> </Step>
                    </Stepper>

                    <div className="sh-formulario-inputs">
                        {/* dados básicos */}
                        {activeStep == 0 &&
                            <article className="sh-dados sh-dados-iniciais">

                                <TextField
                                    label="Nome"
                                    variant="standard"
                                    type="text"
                                    sx={styledTextField}
                                    onChange={(e: any) => setNome(e.target.value)}
                                    defaultValue={nome ? nome : ''}
                                />

                                <TextField
                                    label="Sobrenome"
                                    variant="standard"
                                    type="text"
                                    sx={styledTextField}
                                    onChange={(e: any) => setSobrenome(e.target.value)}
                                    defaultValue={sobrenome ? sobrenome : ''}
                                />

                                <TextField
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

                                    {estado && <Stack spacing={1} sx={styledSelect}>
                                        <Autocomplete
                                            {...capturaValoresSelect}
                                            disableClearable
                                            value={estado}
                                            onChange={(event: any, newValue: string | null) => {
                                                setEstado(newValue);
                                                pegarDadosForm(event)
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
                                            disableClearable
                                            onChange={(event: any, newValue: string | null) => {
                                                setEstado(newValue);
                                                pegarDadosForm(event)
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

                        {/* Antecendentes criminais e RG */}
                        {activeStep == 2 &&
                            <ul className='sh-dados sh-dados-fotos'>
                                <li className='sh-dados-foto-item'>
                                    {imgFrentRg &&
                                        <CheckCircleIcon className='sh-dados-icon-upload-complete' />
                                    }
                                    {!imgFrentRg &&
                                        <AddAPhotoIcon className='sh-dados-icon-upload' />
                                    }
                                    <label htmlFor="frenteRG" className='sh-dados-fotos-label'>Foto da frente do RG</label>
                                    <input type="file" id='frenteRG' className='sh-dados-fotos-input' onChange={pegaImgRgFrente} />
                                </li>

                                <li className='sh-dados-foto-item'>
                                    {imgVersoRg &&
                                        <CheckCircleIcon className='sh-dados-icon-upload-complete' />
                                    }
                                    {!imgVersoRg &&
                                        <AddAPhotoIcon className='sh-dados-icon-upload' />
                                    }
                                    <label htmlFor="versoRG" className='sh-dados-fotos-label'>Foto do verso do RG</label>
                                    <input type="file" id='versoRG' className='sh-dados-fotos-input' onChange={pegaImgRgVerso} />
                                </li>

                                <li className='sh-dados-foto-item'>
                                    {imgAntecedentes &&
                                        <CheckCircleIcon className='sh-dados-icon-upload-complete' />
                                    }
                                    {!imgAntecedentes &&
                                        <AddAPhotoIcon className='sh-dados-icon-upload' />
                                    }
                                    <label htmlFor="antecedCriminais" className='sh-dados-fotos-label'>Antecedentes criminais</label>
                                    <input type="file" id='antecedCriminais' className='sh-dados-fotos-input' onChange={pegaImgAntecedentes} />
                                </li>
                            </ul>
                        }

                        {activeStep == 3 &&
                            <ul className='sh-dados sh-dados-servicos'>
                                <li className='sh-dados-servicos-item sh-servicos-title'>Serviços fornecidos</li>

                                <li className="sh-dados-servicos-item">
                                    {servicoUm && <Stack spacing={1} sx={styledSelectServicos}>
                                        <Autocomplete
                                            {...capturaServicos}
                                            disableClearable
                                            value={servicoUm}
                                            onChange={(event: any, newValue: string | null) => {
                                                setServicoUm(newValue);
                                                pegarDadosForm(event)
                                            }}
                                            renderInput={(parametros) => (
                                                <TextField {...parametros}
                                                    label=""
                                                    variant="standard" />
                                            )}
                                        />
                                    </ Stack>}

                                    {!servicoUm && <Stack spacing={1} sx={styledSelectServicos}>
                                        <Autocomplete
                                            {...capturaServicos}
                                            disableClearable
                                            onChange={(event: any, newValue: string | null) => {
                                                setServicoUm(newValue);
                                                pegarDadosForm(event)
                                            }}
                                            renderInput={(parametros) => (
                                                <TextField {...parametros}
                                                    label=""
                                                    variant="standard" />
                                            )}
                                        />
                                    </ Stack>}
                                </li>

                                <li className="sh-dados-servicos-item">
                                    {servicoDois && <Stack spacing={1} sx={styledSelectServicos}>
                                        <Autocomplete
                                            {...capturaServicos}
                                            disableClearable
                                            value={servicoDois}
                                            onChange={(event: any, newValue: string | null) => {
                                                setServicoDois(newValue);
                                                pegarDadosForm(event)
                                            }}
                                            renderInput={(parametros) => (
                                                <TextField {...parametros}
                                                    label=""
                                                    variant="standard" />
                                            )}
                                        />
                                    </ Stack>}

                                    {!servicoDois && <Stack spacing={1} sx={styledSelectServicos}>
                                        <Autocomplete
                                            {...capturaServicos}
                                            disableClearable
                                            onChange={(event: any, newValue: string | null) => {
                                                setServicoDois(newValue);
                                                pegarDadosForm(event)
                                            }}
                                            renderInput={(parametros) => (
                                                <TextField {...parametros}
                                                    label=""
                                                    variant="standard" />
                                            )}
                                        />
                                    </ Stack>}
                                </li>

                                <li className="sh-dados-servicos-item">
                                    {servicoTres && <Stack spacing={1} sx={styledSelectServicos}>
                                        <Autocomplete
                                            {...capturaServicos}
                                            disableClearable
                                            value={servicoTres}
                                            onChange={(event: any, newValue: string | null) => {
                                                setServicoTres(newValue);
                                                pegarDadosForm(event)
                                            }}
                                            renderInput={(parametros) => (
                                                <TextField {...parametros}
                                                    label=""
                                                    variant="standard" />
                                            )}
                                        />
                                    </ Stack>}

                                    {!servicoTres && <Stack spacing={1} sx={styledSelectServicos}>
                                        <Autocomplete
                                            {...capturaServicos}
                                            disableClearable
                                            onChange={(event: any, newValue: string | null) => {
                                                setServicoTres(newValue);
                                                pegarDadosForm(event)
                                            }}
                                            renderInput={(parametros) => (
                                                <TextField {...parametros}
                                                    label=""
                                                    variant="standard" />
                                            )}
                                        />
                                    </ Stack>}
                                </li>
                            </ul>
                        }

                        {/* E-mail e senha */}
                        {activeStep == 4 &&
                            <article className="sh-dados sh-dados-seguranca">
                                <TextField
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
                                        id='sh_label_senha_input'
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
                                        id='sh_label_confirm_senha_input'
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

                                <div className="sh-termosDeServico">
                                    <div className="sh-termosDeUso-checkbox">
                                        {termosAceitos && <Checkbox defaultChecked onChange={alteraTermosAceitos} />}
                                        {!termosAceitos && <Checkbox onChange={alteraTermosAceitos} />}
                                        <button onClick={handleClickOpen} className="sh-termosDeUso-checkbox-link">Aceito os <strong>termos de uso</strong></button>
                                    </div>


                                    <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                        sx={styledDialog}
                                    >
                                        <DialogTitle>{"Termos de uso da Skillhub"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>Estes Termos de Uso regem o uso deste site <a href="https://skillhub-phi.vercel.app/">skillhub-phi.vercel.app</a> e quaisquer serviços oferecidos pela SkillHub. <br />Ao acessar ou usar o Site, você concorda com estes Termos. Se você não concorda com estes Termos, por favor, não use o Site.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">1. Aceitação dos Termos</DialogContentText>
                                            <DialogContentText>1.1. Concordância: Ao acessar ou usar o Site, você concorda em cumprir estes Termos e todas as leis e regulamentos aplicáveis.</DialogContentText>
                                            <DialogContentText>1.2. Menores de Idade: Este Site não é destinado a menores de 18 anos. Se você é menor de idade, deve obter permissão de seus pais ou responsável antes de usar o Site.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">2. Uso do Site</DialogContentText>
                                            <DialogContentText>2.1. Licença de Uso: Concedemos a você uma licença limitada, não exclusiva e não transferível para acessar e usar o Site para seus fins pessoais e não comerciais.</DialogContentText>
                                            <DialogContentText>2.2. Conteúdo do Usuário: Se você enviar, postar ou exibir conteúdo no Site, você nos concede uma licença mundial, não exclusiva, livre de royalties para usar, modificar, exibir e distribuir esse conteúdo.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">3. Contas de Usuário</DialogContentText>
                                            <DialogContentText>3.1. Registro: Alguns recursos do Site podem exigir registro. Ao se registrar, você concorda em fornecer informações precisas e completas. Você é responsável por manter a confidencialidade de sua conta e senha.</DialogContentText>
                                            <DialogContentText>3.2. Responsabilidade pela Conta: Você é responsável por todas as atividades que ocorram em sua conta. Se houver qualquer uso não autorizado de sua conta, você deve nos notificar imediatamente.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">4. Propriedade Intelectual</DialogContentText>
                                            <DialogContentText>4.1. Direitos de Propriedade: Todo o conteúdo do Site, incluindo textos, gráficos, logotipos, imagens, clipes de áudio e software, é protegido por direitos autorais e outras leis de propriedade intelectual.</DialogContentText>
                                            <DialogContentText>4.2. Uso Restrito: Você concorda em não reproduzir, distribuir, modificar, exibir, executar, publicar ou criar obras derivadas a partir do conteúdo do Site sem nossa permissão prévia por escrito.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">5. Proteção de Dados e LGPD</DialogContentText>
                                            <DialogContentText>5.1. Coleta de Dados: Ao utilizar o Site, podemos coletar informações pessoais conforme descrito em nossa Política de Privacidade. Ao fornecer informações pessoais, você concorda com nossa coleta e uso conforme permitido pela legislação aplicável.</DialogContentText>
                                            <DialogContentText>5.2. Direitos do Titular dos Dados: Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco conforme indicado na seção de Contato.</DialogContentText>
                                            <DialogContentText>5.3. Segurança dos Dados: Implementamos medidas de segurança para proteger suas informações pessoais. No entanto, não podemos garantir a segurança completa das informações transmitidas pela internet.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">6. Isenção de Responsabilidade</DialogContentText>
                                            <DialogContentText>6.1. Uso por Sua Conta e Risco: Você concorda que o uso do Site é por sua conta e risco. Não garantimos que o Site estará livre de erros ou interrupções.</DialogContentText>
                                            <DialogContentText>6.2. Limitação de Responsabilidade: Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso ou incapacidade de usar o Site.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">7. Links para Terceiros</DialogContentText>
                                            <DialogContentText>7.1. Links Externos: O Site pode conter links para sites de terceiros. Nós não endossamos e não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">8. Alterações nos Termos</DialogContentText>
                                            <DialogContentText>8.1. Atualizações: Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação no Site.</DialogContentText>
                                            <DialogContentText>8.2. Notificação de Alterações: É sua responsabilidade revisar periodicamente estes Termos para ficar informado sobre as atualizações. Ao continuar a usar o Site após as alterações, você está concordando com os Termos revisados.</DialogContentText>
                                            <DialogContentText className="sh-termos-subtitulos">9. Disposições Gerais</DialogContentText>
                                            <DialogContentText>9.1. Lei Aplicável: Estes Termos são regidos e interpretados de acordo com as leis do Brasil sem consideração aos seus conflitos de disposições legais.</DialogContentText>
                                            <DialogContentText>9.2. Divisibilidade: Se qualquer disposição destes Termos for considerada inválida ou inexequível, tal disposição será eliminada e as disposições restantes permanecerão em pleno vigor e efeito.</DialogContentText>
                                            <DialogContentText>9.3. Contato: Se você tiver dúvidas sobre estes Termos, entre em contato conosco em skillhub@gmail.com.</DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Fechar</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
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
                        {activeStep < 4 &&
                            <img src={proximoImg} alt="Butão para próximo step" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }} />
                        }
                        {activeStep === 4 &&
                            <img src={concluirImg} alt="Butão para concluir cadastro" className="sh-cadastro-button-concluir" onClick={cadastroFreelancer} />
                        }
                    </button>
                </article>
            </form>

            {mostrarAlert &&
                <div className="sh-alerts">
                    <ShAlert />
                </div>
            }
        </main>
    )
}

export default CadastroFreelancer;
