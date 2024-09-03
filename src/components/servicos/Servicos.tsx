import React from "react";
import fotoPerfil from '../../assets/icons/perfil.svg'

const Servicos = (ultimosServicos: any) => {
    return (
        ultimosServicos.map((informacao:any) => (
                <li className="sh-servicos-itens">
                    <div className="sh-itens-data">
                        <img src={fotoPerfil} alt="Foto de perfil, sem foto da pessoa" className='sh-servicos-img-perfil' />
                        <p className="sh-servicos-data-marcadores">{informacao.tag}</p>
                    </div>

                    <div className="sh-itens-data">
                        <p className="sh-servicos-data-descricao">{informacao.descricao}</p>
                    </div>

                    <div className="sh-itens-data">
                        <p className='sh-servicos-data-remuneracao'>Remuneração:</p>
                        <p className="sh-servicos-data-valor">R${informacao.remuneracao}</p>
                    </div>
                </li>
        )
            
        )
    )
}

export default Servicos;