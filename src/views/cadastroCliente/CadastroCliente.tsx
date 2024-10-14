import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CadastroCliente.css';

// Components
import logo from '../../assets/icons/logoLogin.svg';
import imgDescricao from '../../assets/icons/descricao.svg';
import imgLogin from '../../assets/icons/btn-login.svg';
import Loading from "../../components/loading/Loading";
import { Box, Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";

const steps = ['Dados iniciais', 'Endereço e contato', 'Segurança'];


const CadastroCliente = () => {
    const [removeLoading, setRemoveLoading] = useState(false);
    const [identificador, setIdentificador] = useState('');
    const [senha, setSenha] = useState('');
    const pagina = useNavigate();

    const mudarIndentificador = (event: any) => {
        setIdentificador(event.target.value);
    }

    const mudarSenha = (event: any) => {
        setSenha(event.target.value);
    }

    async function login() {
        const formData = new FormData();
        formData.append('acao', 'login');
        formData.append('cpf', identificador);
        formData.append('senha', senha);

        fetch('https://jobsondeveloper.site/cadastro_login.php', {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);

                if (data.status === 201) {
                    localStorage.setItem('usuário', data.data.Usuarioid);

                    if (data.data.type === 0) {
                        pagina('/home-cliente');
                    }

                    if (data.data.type === 1) {
                        pagina('/home-freelancer');
                    }
                }

                setRemoveLoading(true);
            });
    }

    useEffect(() => {
        setTimeout(() => {
            setRemoveLoading(true);
        }, 2000);
    }, []);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // -------------------------------------
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // -------------------------------------

    return (
        // <section className="sh-login">
        //     {!removeLoading && <Loading />}

        //     <ul className="sh-login-formulario">
        //         <li className="sh-formulario-item sh-formulario-header">

        //             <div className="sh-header-logo">
        //                 <Link to="/">
        //                     <img src={logo} alt="" className="sh-header-logo-img" />
        //                 </Link>
        //             </div>

        //             <div className="sh-header-descricao">
        //                 <img src={imgDescricao} alt="" className="sh-descricao-img" />
        //             </div>
        //         </li>

        //         <li className="sh-formulario-item sh-formulario-main">
        //             <div className="sh-formulario-main-content">
        //                 <TextField id="sh_user" label="CPF/CNPJ" variant="outlined" className="sh-formulario-data-text" />
        //             </div>

        //             <div className="sh-formulario-main-content">
        //                 <TextField id="sh_password" label="Senha" variant="outlined" type="password" className="sh-formulario-data-text" />
        //             </div>
        //         </li>

        //         <li className="sh-formulario-item sh-formulario-footer">
        //             <button type="button" className="sh-footer-btn" onClick={login}>
        //                 <img src={imgLogin} alt="" className="sh-footer-btn-img" />
        //             </button>
        //         </li>
        //     </ul>
        // </section>


        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Lista dos dados que foram adicionados, confirmação para cadastro
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Refazer</Button>
                        <Button>Realizar o cadastro</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Step {activeStep + 1}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Voltar
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default CadastroCliente;