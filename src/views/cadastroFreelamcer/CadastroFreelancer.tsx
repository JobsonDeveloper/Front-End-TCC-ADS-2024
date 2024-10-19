import './CadastroFreelancer.css'
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, Slide, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { color, fontFamily, fontSize, fontWeight, Stack } from "@mui/system";
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
import { TransitionProps } from "@mui/material/transitions";

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
let estadoOndeMora = '';
let mensagemAlert = "";
let tipoAlert = 0;

// --------------- PÁGINA DE CADASTRO

const CadastroCliente = () => {
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const pagina = useNavigate();

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
    const [termosAceitos, setTermosAceitos] = useState(false);
    const [mostrarAlert, setMostrarAlert] = useState(false);

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
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    });

    async function cadastraCliente() {
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

            if (nascimentoDia.length < 2) {
                nascimentoDia = `0${nascimentoDia}`;
            }

            if (nascimentoMes.length < 2) {
                nascimentoMes = `0${nascimentoMes}`;
            }

            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('acao', 'cadastro');
                formData.append('nome', nome);
                formData.append('sobrenome', sobrenome);
                formData.append('cpf', cpfCnpj);
                formData.append('data_nascimento', `${nascimentoAno}-${nascimentoMes}-${nascimentoDia}`);
                formData.append('endereco', `${rua}, numero ${numero}, ${cidade} - ${estado}`);
                formData.append('numero', `(${ddd}) ${telefone}`);
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

                    setTimeout(() => {
                        setMostrarAlert(false);
                        setLoading(false);
                        pagina('/login');
                    }, 4000);

                }
                else if (response.status === 400) {
                    tipoAlert = 2;
                    mensagemAlert = "CPF inválido!"
                    setMostrarAlert(true);
                    
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
                
                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
                console.error(error);
            }
        }
    }

    const mudarStep = (variante: string) => {

        if (variante === 'proximo') {
            if (activeStep >= 2) {
                return;
            }

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
                    setActiveStep((currentStep) => currentStep + 1);
                }
            }


            if (activeStep === 1) {
                if ((rua === "") || (numero === "") || (cidade === "") || (ddd === "") || (telefone === "")) {
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

        }
        else {
            if (activeStep <= 0) {
                return;
            }

            setActiveStep((currentStep) => currentStep - 1);
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
                        {activeStep === 0 &&
                            <img src={proximoImg} alt="Butão para voltar para a home" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }} />
                        }
                        {activeStep === 1 &&
                            <img src={proximoImg} alt="Butão para voltar para a home" className="sh-cadastro-button-proximo" onClick={() => { mudarStep('proximo') }} />
                        }
                        {activeStep === 2 &&
                            <img src={concluirImg} alt="Butão para voltar para a home" className="sh-cadastro-button-concluir" onClick={cadastraCliente} />
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

export default CadastroCliente;
