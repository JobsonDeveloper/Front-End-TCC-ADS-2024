import React, { useEffect } from "react";
import './FreelancersEmDestaque.css';
import Footer from "../footer/Footer";
import fotoPerfilPadrao from '../../assets/icons/perfil.png';
import imgEstrela from '../../assets/icons/estrela.svg';
import 'aos/dist/aos.css';
import Aos from 'aos';

const FreelancersEmDestaque = ({ freelancers }: any) => {

    useEffect(() => {
        Aos.init({ duration: 500 })
    }, [])

    const listaFreelas = freelancers.map((freela: any) =>
        <li className="sh-freelaDestaque-item" key={freela.id} data-aos='flip-left'>
            <div className="sh-destaqueFreela-header">
                {freela.fotoUrl &&
                    <div className="sh-freela-foto">
                        <img src={freela.fotoUrl} alt="" className="sh-freela-imagem" />
                    </div>
                }
                {!freela.fotoUrl &&
                    <div className="sh-freela-foto">
                        <img src={fotoPerfilPadrao} alt="" className="sh-freela-imagem" />
                    </div>
                }

                <ul className="sh-freela-nomeServico">
                    <li className="sh-freela-nomeServico-item sh-freelaNome">
                        {freela.nome}
                    </li>
                    <li className="sh-freela-nomeServico-item sh-freelaServico">
                        {freela.servico}
                    </li>
                </ul>

                <ul className="sh-freela-classificacao">
                    <li className="sh-freela-classicicacao-img">
                        <img src={imgEstrela} alt="" className="sh-classificacao-img" />
                    </li>
                    <li className="sh-freela-classificacao-numero">{freela.classificacao}</li>
                </ul>
            </div>

            <div className="sh-destaqueFreela-main">
                <p className="sh-freela-apresentacao">
                    {freela.apresentacao}
                </p>
            </div>

            <div className="sh-destaqueFreela-footer">
                <p className="sh-freela-footer-criacao">
                    Desde {freela.dataCadastro}
                </p>
            </div>
        </li>
    );

    return (
        <article className="sh-freelaDestaque">
            <h5 className="sh-profissionais-titulo">Profissionais em destaque</h5>

            <ul className="sh-freelaDestaque-lista">
                {listaFreelas}
            </ul>
        </article>
    )
}

export default FreelancersEmDestaque;