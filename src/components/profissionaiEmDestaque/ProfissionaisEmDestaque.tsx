import React from "react";
import './ProfissionaisEmDestaque.css';
import imgProfissional from '../../assets/profissionais/profissional.png';
import imgEstrelas from '../../assets/icons/estrela.svg';

const ProfissionaisEmDestaque = ({ dados }: any) => {

  const listaProfDestaque = dados.map((profissional: any, index: any) =>
    <li key={index} className="sh-EmDestaque-item">
      <div className="sh-EmDestaque-item-dados">
        <img src={imgProfissional} alt="Foto de perfil" className="sh-EmDestaque-imagemProfissional" />
        <p className="sh-EmDestaque-profissonal-nome">{profissional.nome}</p>
      </div>

      <p className="sh-EmDestaque-servicos-titulo">Serviços principais</p>

      <ul className="sh-EmDestaque-servicos">
        <li className="sh-servicos-list">{profissional.servicoUm}</li>
        <li className="sh-servicos-list">{profissional.servicoDois}</li>
        <li className="sh-servicos-list">{profissional.servicoTres}</li>
      </ul>

      <div className="sh-EmDestaque-estrelas">
        <img src={imgEstrelas} alt="Estrelas" className="sh-EmDestaque-estrelas-img"/>
        <p className="sh-EmDestaque-estrelas-quantidade">{profissional.estrelas}</p>
      </div>
    </li>
  )

  return (
    <ul className="sh-EmDestaque-lista">
      {listaProfDestaque}
    </ul>
  )
}

export default ProfissionaisEmDestaque;