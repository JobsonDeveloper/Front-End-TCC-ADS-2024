import React, { useEffect } from "react";
import './ClientesEmDestaque.css';
import imgEstrelas from '../../assets/icons/estrela.svg';
import imgCliente from '../../assets/profissionais/profissional.png';
import Aos from "aos";
import "aos/dist/aos.css";

const ClientesEmDestaque = ({ dados }: any) => {
    useEffect(() => {
        Aos.init({ duration: 500 });
    });

    const listaCliEmDestaque = dados.map((cliente: any, index: any) =>

        <li key={index} className="sh-cliEmDestaque-item" data-aos="flip-left">
            <div className="sh-cliEmDestaque-item-dados">
                {!cliente.imagem_perfil && <img src={imgCliente} alt="Foto de perfil" className="sh-cliEmDestaque-imagemProfissional" />}
                {cliente.imagem_perfil && <img src={cliente.imagem_perfil} alt="Foto de perfil" className="sh-cliEmDestaque-imagemProfissional" />}
                <p className="sh-cliEmDestaque-cliente-nome">{cliente.nome}</p>
            </div>

            <p className="sh-cliEmDestaque-item-dataCadastro">Desde {cliente.dataCadastro}</p>

            <div className="sh-cliEmDestaque-estrelas">
                <img src={imgEstrelas} alt="Estrelas" className="sh-cliEmDestaque-estrelas-img" />
                <p className="sh-cliEmDestaque-estrelas-quantidade">{cliente.estrelas}</p>
            </div>
        </li>
    );


    return (
        <ul className="sh-show sh-cliEmDestaque">
            {listaCliEmDestaque}
        </ul>
    )
};

export default ClientesEmDestaque;