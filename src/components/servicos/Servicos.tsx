import React from "react";
import fotoPerfil from '../../assets/index/icons/icon-perfil.png'
import './Servicos.css'

const Servicos = ({ data }: any) => {

  const listaServicos = data.map((servico: any, index: any) =>
    <li key={index} className="sh-servicos-itens">
      <div className="sh-itens-data">
        <img src={fotoPerfil} alt="Foto de perfil sem rosto" className="sh-servicos-img-perfil" />
        <p className="sh-servicos-data-marcador">{servico.tag}</p>
      </div>
      <div className="sh-itens-data">
        <p className="sh-servicos-data-descricao">{servico.descricao} da noite da segunda-feira, como se nada tivesse acontecido</p>
      </div>
      <div className="sh-itens-data sh-itens-remuneracao">
        <p className="sh-servicos-data-remuneracao">Remuneração:</p>
        <p className="sh-servicos-data-valor">R${servico.remuneracao} - {servico.tipoDeRemuneracao}</p>
      </div>
    </li>
  );

  return (
    <ul className="sh-servicos-lista">
      { listaServicos }
    </ul>
  )
}

export default Servicos;