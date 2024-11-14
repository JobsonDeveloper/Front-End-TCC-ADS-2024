import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let mensagemAlert = "";
let tipoAlert = 0;

type Usuario = {
    id: string | null,
    tipo: string | null,
    nome: string | null,
    sobrenome: string | null,
    dataNascimento: string | null,
    endereco: string | null,
    telefone: string | null,
    email: string | null,
    dataCriacaoConta: string | null,
    imagemPerfil: string | null,
    classificacao: string | null,
    servicos: string | null,
    limite: string | null
};

const usuario: Usuario = {
    id: '',
    tipo: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    endereco: '',
    telefone: '',
    email: '',
    dataCriacaoConta: '',
    imagemPerfil: '',
    classificacao: '',
    servicos: '',
    limite: ''
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

const DadosUsuario = () => {
    const [loading, setLoading] = useState(true);
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const pagina = useNavigate();

    async function pegaDados() {

        usuario.id = sessionStorage.getItem('shUserLogId');
        usuario.tipo = sessionStorage.getItem('shUserLogTipo');

        try {
            setLoading(true);

            const formData = new FormData();

            if (usuario.tipo === "0") {
                formData.append('acao', 'dados_freelancer');
                formData.append('idfre', `${usuario.id}`);
            }
            else {
                formData.append('acao', 'dados_cliente');
                formData.append('idcliente', `${usuario.id}`);
            }

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();

            if (response.status === 200) {
                const dadosUsuario = response.dadosUser;
                usuario.nome = dadosUsuario[0].nome;
                usuario.sobrenome = dadosUsuario[0].sobrenome;
                usuario.dataCriacaoConta = formatData(dadosUsuario[0].nascimento);
                usuario.classificacao = dadosUsuario[0].classificacao;
                usuario.endereco = dadosUsuario[0].endereco;
                usuario.telefone = dadosUsuario[0].telefone;
                usuario.email = dadosUsuario[0].email;
                usuario.dataCriacaoConta = formatData(dadosUsuario[0].data_de_criacao);
                usuario.imagemPerfil = dadosUsuario[0].imagem_perfil;
                usuario.servicos = dadosUsuario[0].servicos;
                usuario.limite = dadosUsuario[0].limite;

                console.log(usuario);
            }
            else {
                tipoAlert = 3;
                mensagemAlert = "Dados não retornados!"
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

    useEffect(() => {
        if ((!sessionStorage.getItem('shUserLogId')) || (!sessionStorage.getItem('shUserLogTipo'))) {
            tipoAlert = 3;
            mensagemAlert = "Faça login antes!";
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else {
            pegaDados();
        }
    }, []);

    return (
        <>Dados...</>
    )
}

export default DadosUsuario;