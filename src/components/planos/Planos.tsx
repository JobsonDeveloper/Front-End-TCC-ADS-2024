import React, { useEffect } from "react";
import './Planos.css'
import { Link } from "react-router-dom";

// Components
import PlanoSimples from '../../assets/planos/plano-simples.svg'
import PlanoCustoBeneficio from '../../assets/planos/plano-custo-beneficio.svg'
import PlanoMaiorGanho from '../../assets/planos/plano-maior-ganho.svg'
import Aos from "aos";
import "aos/dist/aos.css";

const Planos = () => {
    useEffect(() => {
        Aos.init({ duration: 500 });
    });

    return (
        <ul className="sh-planos-cards">
            <li className="sh-planos-card-item" data-aos="flip-left">
                <Link to='/cadastro-freelancer'>
                    <img src={PlanoSimples} alt="" className="sh-planos-car-img" />
                </Link>
            </li>

            <li className="sh-planos-card-item" data-aos="flip-left">
                <Link to='/cadastro-freelancer'>
                    <img src={PlanoCustoBeneficio} alt="" className="sh-planos-car-img" />
                </Link>
            </li>

            <li className="sh-planos-card-item" data-aos="flip-left">
                <Link to='/cadastro-freelancer'>
                    <img src={PlanoMaiorGanho} alt="" className="sh-planos-car-img" />
                </Link>
            </li>
        </ul>
    )
}

export default Planos;