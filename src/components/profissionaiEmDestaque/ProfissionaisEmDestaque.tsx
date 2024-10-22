import React, { useEffect } from "react";
import './ProfissionaisEmDestaque.css';
import imgProfissional from '../../assets/profissionais/profissional.png';
import imgEstrelas from '../../assets/icons/estrela.svg';
import Aos from "aos";
import "aos/dist/aos.css";

const ProfissionaisEmDestaque = ({ dados }: any) => {

  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  const listaProfDestaque = dados.map((profissional: any, index: any) =>

    <li key={index} className="sh-EmDestaque-item" data-aos="flip-left">
      <div className="sh-EmDestaque-item-dados">
        {!profissional.fotoUrl && <img src={imgProfissional} alt="Foto de perfil" className="sh-EmDestaque-imagemProfissional" />}
        {profissional.fotoUrl && <img src={profissional.fotoUrl} alt="Foto de perfil" className="sh-EmDestaque-imagemProfissional" />}
        <p className="sh-EmDestaque-profissonal-nome">{profissional.nome}</p>
      </div>

      <ul className="sh-EmDestaque-servicos">
        <li className="sh-servicos-list">{profissional.servico}</li> 
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