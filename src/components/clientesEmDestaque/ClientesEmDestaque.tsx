import React from "react";
import './ClientesEmDestaque.css';
import imgEstrelas from '../../assets/icons/estrela.svg';
import imgCliente from '../../assets/profissionais/profissional.png';

const ClientesEmDestaque = ({ dados }: any) => {
    const listaCliEmDestaque = dados.map((cliente: any, index: any) =>

        <li key={index} className="sh-cliEmDestaque-item">
            <div className="sh-cliEmDestaque-item-dados">
                <img src={imgCliente} alt="Foto de perfil" className="sh-cliEmDestaque-imagemProfissional" />
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
        <ul className="sh-cliEmDestaque">
            {listaCliEmDestaque}
        </ul>
    )
};

export default ClientesEmDestaque;