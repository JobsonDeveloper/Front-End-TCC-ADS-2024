import React, { useEffect } from "react";
import fotoPerfil from '../../assets/index/icons/profissional.png'
import './Servicos.css'
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Servicos = ({ data }: any) => {

  useEffect(() => {
    Aos.init({ duration: 500 });
  })

  const listaServicos = data.map((servico: any, index: any) =>
    <li key={index} className="sh-servicos-itens" data-aos="flip-left">
      <Link to='/login' className="sh-servicos-link">
        <div className="sh-itens-data">
          <img src={fotoPerfil} alt="Foto de perfil sem rosto" className="sh-servicos-img-perfil" />
          <p className="sh-servicos-data-marcador">{servico.tag}</p>
        </div>
        <div className="sh-itens-data">
          <p className="sh-servicos-data-descricao">{servico.descricao}</p>
        </div>
        {servico.remuneracao &&
          <div className="sh-itens-data">
            <p className="sh-servicos-data-descricao">{servico.remuneracao}</p>
          </div>
        }
      </Link>
    </li>
  );

  return (
    <ul className="sh-show sh-servicos-lista">
      {listaServicos}
    </ul>
  )
}

export default Servicos;