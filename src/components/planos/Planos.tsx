import React from "react";
import './Planos.css'
import PlanoSimples from '../../assets/planos/plano-simples.svg'
import PlanoCustoBeneficio from '../../assets/planos/plano-custo-beneficio.svg'
import PlanoMaiorGanho from '../../assets/planos/plano-maior-ganho.svg'

const Planos = () => {
    return (
        <ul className="sh-planos-cards">
            <li className="sh-planos-card-item">
                <img src={ PlanoSimples } alt="" className="sh-planos-car-img"/>
            </li>

            <li className="sh-planos-card-item">
                <img src={ PlanoCustoBeneficio } alt="" className="sh-planos-car-img"/>
            </li>

            <li className="sh-planos-card-item">
                <img src={ PlanoMaiorGanho } alt="" className="sh-planos-car-img"/>
            </li>
        </ul>
    )
}

export default Planos;