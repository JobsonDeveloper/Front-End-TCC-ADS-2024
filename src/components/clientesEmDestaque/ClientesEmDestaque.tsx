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
            {/* <div className="sh-cliEmDestaque-item-dados">
                {!cliente.imagem_perfil && <img src={imgCliente} alt="Foto de perfil" className="sh-cliEmDestaque-imagemProfissional" />}
                {cliente.imagem_perfil && <img src={cliente.imagem_perfil} alt="Foto de perfil" className="sh-cliEmDestaque-imagemProfissional" />}
                <p className="sh-cliEmDestaque-cliente-nome">{cliente.nome}</p>
            </div>

            <p className="sh-cliEmDestaque-item-dataCadastro">Desde {cliente.dataCadastro}</p>

            <div className="sh-cliEmDestaque-estrelas">
                <img src={imgEstrelas} alt="Estrelas" className="sh-cliEmDestaque-estrelas-img" />
                <p className="sh-cliEmDestaque-estrelas-quantidade">{cliente.estrelas}</p>
            </div> */}
            <div className="sh-cliente-foto">
                {!cliente.imagem_perfil &&
                    <img src={imgCliente} alt="" className="cliente-img" />
                }
                {cliente.imagem_perfil &&
                    <img src={cliente.imagem_perfil} alt="" className="cliente-img" />
                }
            </div>

            <div className="sh-cliente-dados">
                <p className="sh-cliente-nome">{cliente.nome}</p>
                <p className="sh-cliente-dataCriacao">Desde {cliente.dataCadastro}</p>
            </div>

            <div className="sh-cliente-classificacao">
                <div className="sh-cliente-classificacao-imagam">
                    <img src={imgEstrelas} className="sh-cliente-classificacao-img" />
                </div>

                <div className="sh-cliente-classificacao-numero">
                    <p className="sh-cliente-classificacao-texto">{cliente.estrelas}</p>
                </div>
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

{/* <li key={index} className="sh-cliEmDestaque-item" data-aos="flip-left">
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
</li> */}