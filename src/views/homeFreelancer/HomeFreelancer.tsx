import React, { useEffect, useState } from "react";
import './HomeFreelancer.css'
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProfissionaisEmDestaque from "../../components/profissionaiEmDestaque/ProfissionaisEmDestaque";
import ClientesEmDestaque from "../../components/clientesEmDestaque/ClientesEmDestaque";
import Servicos from '../../components/servicos/Servicos';
import Duvidas from "../duvidas/Duvidas";
import { Accordion } from "react-bootstrap";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const ultimosServicos = [
    {
        tag: 'Serviços gerais',
        descricao: 'Preciso de uma pessoa para ajudar meu filho com matemática, dando aulas a ele dois dias por semana, durante a parte da tarde.',
        remuneracao: '250,00',
        tipoDeRemuneracao: 'Diária'
    },
    {
        tag: 'Professor',
        descricao: 'Preciso de uma pessoa para ajudar meu filho com matemática, dando aulas a ele dois dias por semana, durante a parte da tarde.',
        remuneracao: '1.200,00',
        tipoDeRemuneracao: 'Mensal'
    },
    {
        tag: 'Pedreiro',
        descricao: 'Preciso de uma pessoa para dar andamento ao projeto da minha casa, começando o trabalho de segunda a quarta, das 08:00 da manhã até as 16:00 da tarde.',
        remuneracao: '60,00',
        tipoDeRemuneracao: 'Diária'
    },
    {
        tag: 'Jardineiro',
        descricao: 'Preciso de uma pessoa para limpar o jardim da minha casa até no máximo as 16:00 horas do dia 30/12/2024.',
        remuneracao: '300,00',
        tipoDeRemuneracao: 'Diária'
    }
];

const profDestaque = [
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'João Paulo César',
        servicoUm: 'Músico',
        servicoDois: 'Professor',
        servicoTres: 'Tatuador',
        dataCadastro: '05/2024',
        estrelas: 103
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'Marcos Amorim da Silva',
        servicoUm: 'Músico',
        servicoDois: 'Professor',
        servicoTres: 'Tatuador',
        dataCadastro: '05/2024',
        estrelas: 87
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'Victor Amaral  de souza',
        servicoUm: 'Músico',
        servicoDois: 'Professor',
        servicoTres: 'Tatuador',
        dataCadastro: '05/2024',
        estrelas: 65
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'André Coutinho Andrade',
        servicoUm: 'Músico',
        servicoDois: 'Professor',
        servicoTres: 'Tatuador',
        dataCadastro: '05/2024',
        estrelas: 49
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'André Felipe Silva',
        servicoDois: 'Suporte técnico',
        dataCadastro: '05/2024',
        estrelas: 30
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'André Felipe Silva',
        servicoDois: 'Suporte técnico',
        dataCadastro: '05/2024',
        estrelas: 30
    },
];

const cliDestaque = [
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'João Paulo César',
        dataCadastro: '05/2024',
        estrelas: 103
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'João Paulo César',
        dataCadastro: '05/2024',
        estrelas: 90
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'João Paulo César',
        dataCadastro: '05/2024',
        estrelas: 87
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'João Paulo César',
        dataCadastro: '05/2024',
        estrelas: 78
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'João Paulo César',
        dataCadastro: '05/2024',
        estrelas: 76
    },
    {
        fotoUrl: '../../assets/profissionais/profissional.png',
        nome: 'João Paulo César',
        dataCadastro: '05/2024',
        estrelas: 76
    },
];

const HomeFreelancer = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    })

    return (
        <section className="sh-freela">
            {loading && <Loading />}

            <article className="sh-freela-header-apresentacao">
                {!loading && <Header usuario={2} />}
            </article>

            <article className="sh-freela-main">
                <article className="sh-profissionaisEmDestaque" id='sh_profissionais_emDestaque'>
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
                </article>

                <article className="sh-main-servicos" id='sh_ultimas_postagens'>
                    <h2 className="sh-show sh-servicos-titulo" data-aos="zoom-in">Últimos serviços postados</h2>
                    <div className="sh-servicos-lista-container">
                        <Servicos data={ultimosServicos} />
                    </div>
                </article>

                <article className="sh-todos-servicos">
                    <h2 className="sh-show sh-todos-os-servicos-titulo" data-aos="zoom-in">Serviços</h2>

                    <div className="sh-todos-os-servicos-info">
                        <div className="sh-todos-servicos-filtro">Filtro</div>
                        <ul className="sh-todos-servicos-list">
                            <li className="sh-todos-os-servicos-item">Servico</li>
                            <li className="sh-todos-os-servicos-item">Servico</li>
                            <li className="sh-todos-os-servicos-item">Servico</li>
                        </ul>
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
        </section >
    )
};

export default HomeFreelancer;