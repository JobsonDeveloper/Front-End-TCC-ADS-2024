import { Alert } from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './DadosUsuario.css';
import imgPerfilPadrao from '../../assets/icons/perfil.svg';
import imgEstrelas from '../../assets/icons/estrela.svg';

// let mensagemAlert = "";
// let tipoAlert = 0;

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

function formatData(data: any) {
    let dataFormatUm = new Date(data);
    let dia = `${dataFormatUm.getDate()}`;
    let mes = `${dataFormatUm.getMonth() + 1}`;
    let ano = dataFormatUm.getFullYear();

    if (dia.length < 2) {
        dia = `0${dia}`;
    }

    if (mes.length < 2) {
        mes = `0${mes}`;
    }

    return (`${dia}/${mes}/${ano}`);
}

const DadosUsuario = ({ setMostrarAlert, setTipoAlert, setMensagemAlert }: any) => {
    const [loading, setLoading] = useState(true);
    // const [mostrarAlert, setMostrarAlert] = useState(false);
    const pagina = useNavigate();

    // Dados do usuario
    const [userId, setUserId] = useState<string | null>();
    const [userTipo, setUserTipo] = useState<string | null>('');
    const [userNome, setUserNome] = useState('');
    const [userSobrenome, setUserSobrenome] = useState('');
    const [userNascimento, setUserNascimento] = useState('');
    const [userEndereco, setUserEndereco] = useState('');
    const [userTelefone, setUserTelefone] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDataCriacao, setUserDataCriacao] = useState('');
    const [userImgPerfil, setUserImgPerfil] = useState('');
    const [userClassificacao, setUserClassificacao] = useState('');
    const [userServicos, setUserServicos] = useState('');
    const [userLimite, setUserLimite] = useState('');
    // const [file, setFile] = useState<string | null>();

    async function leituraDeImagem(arquivo: FileList | null) {
        if (arquivo) {
            let tipoArquivo = arquivo[0].type;

            if (arquivo.length < 1) {
                setTipoAlert(3);
                setMensagemAlert("A imagem não foi fornecida!");
                setMostrarAlert(true);
                console.log(0);

                setTimeout(() => {
                    setMostrarAlert(false);
                }, 4000);
            }
            else if ((tipoArquivo != 'image/png') && (tipoArquivo != 'image/jpeg')) {
                setTipoAlert(3);
                setMensagemAlert("Formatos aceitos: PNG ou JPEG");
                setMostrarAlert(true);
                console.log(1);

                setTimeout(() => {
                    setMostrarAlert(false);
                }, 4000);
            }
            else {
                if (arquivo[0].size > 60000) {
                    setTipoAlert(3);
                    setMensagemAlert("A imagem é muito pesada!");
                    setMostrarAlert(true);
                    console.log(arquivo[0]);

                    setTimeout(() => {
                        setMostrarAlert(false);
                    }, 4000);
                }
                else {
                    if (arquivo[0] != null) {
                        let lerImagem = new FileReader();

                        lerImagem.onload = function (imagem) {
                            if (imagem.target) {
                                mudaFotoPerfil(imagem.target.result);
                            }
                        }

                        lerImagem.readAsDataURL(arquivo[0]);
                    }
                }
            }
        }
    }

    async function mudaFotoPerfil(base64: string | ArrayBuffer | null) {
        if (typeof base64 === 'string') {
            try {
                const formData = new FormData();
                formData.append('acao', 'muda_foto_perfil');
                formData.append('imagem', `${base64}`);

                if (userTipo === "0") {
                    formData.append('idFree', `${userId}`);
                }
                else {
                    formData.append('idCliente', `${userId}`);
                }

                const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                const response = await request.json();

                if (response.status === 201) {
                    window.location.reload();
                }
                else {
                    setTipoAlert(3);
                    setMensagemAlert("Foto não modificada!");
                    setMostrarAlert(true);

                    setTimeout(() => {
                        setMostrarAlert(false);
                        setLoading(false);
                    }, 4000);
                }
            }
            catch (error) {
                setTipoAlert(3);
                setMensagemAlert("Erro de requisição!");
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
                console.error(error);
            }
        }
        else {
            setTipoAlert(4);
            setMensagemAlert("Tente novamente!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                setLoading(false);
            }, 4000);
        }
    }

    async function pegaDados() {
        try {
            setLoading(true);

            const formData = new FormData();

            if (sessionStorage.getItem('shUserLogTipo') === "0") {
                formData.append('acao', 'dados_freelancer');
                formData.append('idfre', `${sessionStorage.getItem('shUserLogId')}`);
            }
            else {
                formData.append('acao', 'dados_cliente');
                formData.append('idcliente', `${sessionStorage.getItem('shUserLogId')}`);
            }

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();

            if (response.status === 200) {
                const dadosUsuario = response.dadosUser;

                console.log(response);

                setUserNome(dadosUsuario[0].nome);
                setUserSobrenome(dadosUsuario[0].sobrenome);
                setUserNascimento(formatData(dadosUsuario[0].nascimento));
                setUserEndereco(dadosUsuario[0].endereco);
                setUserTelefone(dadosUsuario[0].telefone);
                setUserEmail(dadosUsuario[0].email);
                setUserDataCriacao(formatData(dadosUsuario[0].data_de_criacao));
                setUserImgPerfil(dadosUsuario[0].imagem_perfil);

                if (userTipo === '0') {
                    setUserServicos(dadosUsuario[0].servicos);
                    setUserLimite(dadosUsuario[0].limite);
                }

                setUserClassificacao(dadosUsuario[0].classificacao);

            }
            else {
                setTipoAlert(3);
                setMensagemAlert("Dados não retornados!");
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
            }
        }
        catch (error) {
            setTipoAlert(3);
            setMensagemAlert("Erro de requisição!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                setLoading(false);
            }, 4000);
            console.error(error);
        }
    }

    useEffect(() => {
        if ((!sessionStorage.getItem('shUserLogId')) || (!sessionStorage.getItem('shUserLogTipo'))) {
            setTipoAlert(3);
            setMensagemAlert("Faça login antes!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else {
            setUserId(sessionStorage.getItem('shUserLogId'));
            setUserTipo(sessionStorage.getItem('shUserLogTipo'));
            pegaDados();
        }
    }, []);

    return (
        <ul className="sh-dadosPerfil">
            <li className="sh-dadosPerfil-item">
                <div className="sh-perfil-foto">
                    {userImgPerfil &&
                        <img src={userImgPerfil} alt="" className="sh-perfil-img" />
                    }
                    {!userImgPerfil &&
                        <img src={imgPerfilPadrao} alt="" className="sh-perfil-img" />
                    }
                </div>

                <div className="sh-fotoPerfil-buttons">
                    <label htmlFor="sh_input_file_perfil" className="sh-button-imgPerfil">
                        Mudar foto
                    </label>
                    <input
                        type="file"
                        id="sh_input_file_perfil"
                        className="sh-fotoPerfil-input"
                        onChange={((e) => {
                            leituraDeImagem(e.target.files);
                        })}
                    />
                    <button className="sh-button-imgPerfil">
                        Remover foto
                    </button>
                </div>
                <div className="sh-perfil-classificacao">
                    <img src={imgEstrelas} alt="Estrelas de classificação" />
                    <p>{userClassificacao}</p>
                </div>
            </li>
        </ul>
    )
}

export default DadosUsuario;