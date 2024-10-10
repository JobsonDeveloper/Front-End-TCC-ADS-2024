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

      <ul className="sh-EmDestaque-servicos">
        { profissional.servicoUm && <li className="sh-servicos-list">{profissional.servicoUm}</li> }
        { profissional.servicoDois && <li className="sh-servicos-list">{profissional.servicoDois}</li> }
        { profissional.servicoTres && <li className="sh-servicos-list">{profissional.servicoTres}</li> }
      </ul>

      <p className="sh-EmDestaque-item-dataCadastro">Desde {profissional.dataCadastro}</p>

      <div className="sh-EmDestaque-estrelas">
        <img src={imgEstrelas} alt="Estrelas" className="sh-EmDestaque-estrelas-img"/>
        <p className="sh-EmDestaque-estrelas-quantidade">{profissional.estrelas}</p>
      </div>
    </li>
  )

  return (
    <ul className="sh-show sh-EmDestaque-lista">
      {listaProfDestaque}
    </ul>
  )
}

export default ProfissionaisEmDestaque;