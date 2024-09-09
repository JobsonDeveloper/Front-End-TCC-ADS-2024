import React from "react";
import fotoPerfil from '../../assets/icons/perfil.svg'
import './Servicos.css'

const Servicos = ({data}:any) => {

  const listaServicos = data.map((servico:any, index:any) => 
    <li key={index} className="sh-servicos-itens">
      <div className="sh-itens-data">
        <img src={fotoPerfil} alt="Foto de perfil sem rosto" className="sh-servicos-img-perfil" />
        <p className="sh-servicos-data-marcadores">{ servico.tag }</p>
      </div>
      <div className="sh-itens-data">
        <p className="sh-servicos-data-descricao">{ servico.descricao }</p>
      </div>
      <div className="sh-itens-data">
        <p className="sh-servicos-data-remuneracao">Remuneração:</p>
        <p className="sh-servicos-data-valor">R${ servico.remuneracao } - { servico.tipoDeRemuneracao }</p>
      </div>
    </li>
  );

  return (
    <ul className="sh-servicos-lista">
      {listaServicos}
    </ul>
  )
}

export default Servicos;