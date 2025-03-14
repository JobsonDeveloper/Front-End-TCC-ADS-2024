import React, { useEffect, useState } from "react";
import './HomeCliente.css'
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProfissionaisEmDestaque from "../../components/profissionaiEmDestaque/ProfissionaisEmDestaque";
import ClientesEmDestaque from "../../components/clientesEmDestaque/ClientesEmDestaque";
import Servicos from '../../components/servicos/Servicos';
import Duvidas from "../duvidas/Duvidas";
import { Accordion } from "react-bootstrap";
import { Alert, Paper, TextField } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import backgroundApresentacaoUm from '../../assets/FreelaHome/backgrounds/background-apresentacao-lg.webp'
import backgroundApresentacaoDois from '../../assets/FreelaHome/backgrounds/imagem-apresentacao.webp'
import backgroundApresentacaoMd from '../../assets/FreelaHome/backgrounds/background-apresentacaoMd.png'
import { Link, useNavigate } from "react-router-dom";
import FreelancersEmDestaque from "../../components/freelancersEmDestaque/FreelancersEmDestaque";

const profDestaque: any = [];

const cliDestaque: any = [];

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

let mensagemAlert = "asdasdasda";
let tipoAlert = 0;

const HomeCliente = () => {
    const pagina = useNavigate();
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [loading, setLoading] = useState(true);


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

    async function coletaDados() {
        try {
            const formData = new FormData();
            formData.append('acao', 'dados_apresentacao');
            // formData.append('id', `${sessionStorage.getItem('shUserLogId')}`);
            // formData.append('servicoAdequado', `${sessionStorage.getItem('shUserServico')}`);


            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();

            if (response) {
                setLoading(false);

                if (profDestaque[0] === undefined) {
                    response.dataFreelancers.map((dados: any) => {
                        let servicosSplit = dados.servicos.split(",");

                        profDestaque.push({
                            id: dados.id,
                            fotoUrl: dados.imagem_perfil,
                            nome: `${dados.nome} ${dados.sobrenome}`,
                            servico: servicosSplit[0],
                            apresentacao: dados.apresentacao,
                            dataCadastro: formatData(dados.data_de_criacao),
                            classificacao: dados.classificacao
                        });
                    })
                }

                if (cliDestaque[0] === undefined) {
                    response.dataClientes.map((dados: any) => {
                        cliDestaque.push({
                            fotoUrl: dados.imagem_perfil,
                            nome: `${dados.nome} ${dados.sobrenome}`,
                            dataCadastro: formatData(dados.data_de_criacao),
                            estrelas: dados.classificacao,
                            status: dados.statos
                        });
                    })
                }
            }
            else {
                setLoading(false);
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
        if (!sessionStorage.getItem('shUserLogId')) {
            tipoAlert = 3;
            mensagemAlert = "Faça login antes!";
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else if (sessionStorage.getItem('shUserLogTipo') != '1') {
            tipoAlert = 3;
            mensagemAlert = "Faça login antes!";
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else {
            coletaDados();
        }
    });


    return (
        <section className="sh-freela">
            {loading && <Loading />}

            <article className="sh-freela-header-apresentacao">
                {!loading && <Header usuario={2} />}

                <article className='sh-apresentacao'>
                    <article className="sh-apresentacao-um">
                        <img src={backgroundApresentacaoUm} alt="Foto de pessoa segurando um notebook" className="sh-apresentacao-img d-lg-none" />
                        <img src={backgroundApresentacaoMd} alt="Foto de pessoa segurando um notebook" className="sh-apresentacao-img d-none d-lg-flex" />
                    </article>

                    <article className="sh-apresentacao-textos d-lg-none">
                        <h2 className="sh-apresentacao-titulos">Faça sua carreira decolar! <br /> Conquiste o mercado conosco</h2>
                        <p className="sh-apresentacao-paragrafos">
                            Aqui você tem a oportunidade de encontrar novos clientes, se tornar prestigiado e requisitado por muitas pessoas.
                        </p>
                        <p className="sh-apresentacao-paragrafos">
                            Encontre o serviço certo e seja mais um Freelancer de sucesso!
                        </p>
                    </article>

                    {/* Button para freelancers */}
                    <article className="sh-apresentacao-button d-sm-none">
                        <div className="sh-apresentacao-button-item sh-apresentacao-button">
                            <a href='#sh_ultimas_postagens' className='sh-apresentacao-button-cadastro'>Serviços</a>
                        </div>
                    </article>

                    {/* Secundo post */}
                    <article className="sh-apresentacao-dois d-lg-none">
                        <div className="sh-apresentacao-dois-container-img" data-aos="fade-right">
                            <Link to='/cadastro-cliente'><img src={backgroundApresentacaoDois} alt="" className="sh-apresentacao-dois-img d-lg-none" /></Link>
                        </div>

                        <div className="sh-apresentacao-textos" data-aos="fade-left">
                            <h1 className="sh-apresentacao-dois-titulos"> Torne-se um cliente reconhecido! </h1>
                            <p className="sh-apresentacao-dois-textos">
                                Cadastre já um serviço e economize o seu tempo, nossos freelancers estão prontos para te atender.
                            </p>
                            <p className="sh-apresentacao-dois-textos">
                                Receba avaliações por parte dos nossos freelancer e torne-se uma estrela na Skillhub.
                            </p>
                        </div>
                    </article>
                </article>
            </article>

            <article className="sh-freela-main">
                {/* <article className="sh-profissionaisEmDestaque" id='sh_profissionais_emDestaque'>
                    <h2 className="sh-profissionaisEmDestaque-titulo" data-aos="zoom-in">Profissionais em destaque</h2>
                    <div className="sh-profissionalEmDestaque-lista">
                        <ProfissionaisEmDestaque dados={profDestaque} />
                    </div>
                </article>

                <article className="sh-clientesEmDestaque" id='sh_clientes_emDestaque'>
                    <h2 className="sh-clientesEmDestaque-titulo" data-aos="zoom-in">Clientes em destaque</h2>
                    <div className="sh-clientesEmDestaque-lista">
                        <ClientesEmDestaque dados={cliDestaque} />
                    </div>
                </article> */}

                <FreelancersEmDestaque freelancers={profDestaque} />


                <article className="sh-clientesEmDestaque" id='sh_clientes_emDestaque'>
                    <h2 className="sh-clientesEmDestaque-titulo" data-aos="zoom-in">Clientes em destaque</h2>
                    <div className="sh-clientesEmDestaque-lista">
                        <ClientesEmDestaque dados={cliDestaque} />
                    </div>
                </article>

                <div className="sh-freela-duvidas">
                    <h2 className="sh-show sh-duvidas-titulo" data-aos="zoom-in">Dúvidas frequentes</h2>

                    <Accordion className='sh-show sh-duvidas-acordeon' data-aos="zoom-in">
                        <Accordion.Item eventKey="0" className='sh-duvidas-acordeon-item'>
                            <Accordion.Header className='sh-duvidas-header'>Como os freelancers conversam com os clientes?</Accordion.Header>
                            <Accordion.Body className='sh-acordeon-body'>
                                ...
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1" className='sh-duvidas-acordeon-item'>
                            <Accordion.Header className='sh-duvidas-header'>O suporte é 24 horas?</Accordion.Header>
                            <Accordion.Body className='sh-acordeon-body'>
                                ...
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2" className='sh-duvidas-acordeon-item'>
                            <Accordion.Header className='sh-duvidas-header'>Os clientes pagam para se cadastrar?</Accordion.Header>
                            <Accordion.Body className='sh-acordeon-body'>
                                Para os clientes, a utilização da plataforma é 100%
                                gratuíta, o pagameto só será realizado ao freelancer
                                ao qual você deseja contratar para um determinado serviço.
                                O valor da remuneração do serviço é definido pelo cliente
                                no momento da postagem do mesmo.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3" className='sh-duvidas-acordeon-item'>
                            <Accordion.Header className='sh-duvidas-header'>Quais são os meios de pagamento para aderir a um plano?</Accordion.Header>
                            <Accordion.Body className='sh-acordeon-body'>
                                ...
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>

            </article>

            <article className="sh-freela-footer">
                <Footer usuario={2} />
            </article>

            {/* Alerts */}
            {mostrarAlert &&
                <div className="sh-alerts">
                    <ShAlert />
                </div>
            }
        </section >
    )
};

export default HomeCliente;