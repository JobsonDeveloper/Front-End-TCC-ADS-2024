import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

// Components
import logo from '../../assets/icons/logoLogin.svg';
import imgDescricao from '../../assets/icons/descricao.svg';
import imgLogin from '../../assets/icons/btn-login.svg';
import Loading from "../../components/loading/Loading";

const Login = () => {
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

                if(data.status === 201) {
                   localStorage.setItem('usuário', data.data.Usuarioid);
                    
                   // Se o usuário é um cliente
                   if(data.data.type === 0) {
                    pagina('/home-cliente');
                   }

                   // Se o usuário é um freelancer
                   if(data.data.type === 1) {
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

    return (
        <section className="sh-login">
            {!removeLoading && <Loading />}

            <ul className="sh-login-formulario">
                <li className="sh-formulario-item sh-formulario-header">

                    <div className="sh-header-logo">
                        <img src={logo} alt="" className="sh-header-logo-img" />
                    </div>

                    <div className="sh-header-descricao">
                        <img src={imgDescricao} alt="" className="sh-descricao-img" />
                    </div>
                </li>

                <li className="sh-formulario-item sh-formulario-main">
                    <div className="sh-formulario-main-content">
                        <p className="sh-main-dado-titulo">CPF/CNPJ</p>
                        <input type="number" className="sh-main-input" value={identificador} onChange={mudarIndentificador} />
                    </div>

                    <div className="sh-formulario-main-content">
                        <p className="sh-main-dado-titulo">Senha</p>
                        <input type="password" className="sh-main-input" value={senha} onChange={mudarSenha} />
                    </div>
                </li>

                <li className="sh-formulario-item sh-formulario-footer">
                    <button type="button" className="sh-footer-btn" onClick={login}>
                        <img src={imgLogin} alt="" className="sh-footer-btn-img" />
                    </button>
                </li>
            </ul>
        </section>
    )
}

export default Login;