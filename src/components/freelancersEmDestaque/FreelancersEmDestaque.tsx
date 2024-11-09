import React from "react";
import './FreelancersEmDestaque.css';

const FreelancersEmDestaque = ({ freelancers }: any) => {

    const listaFreelas = freelancers.map((freela: any) =>
        <li className="sh-freelaDestaque-item" key={freela.id}>
            <div className="sh-freela-header">

            </div>

            <div className="sh-freela-main">
                <p className="sh-freela-apresentacao">
                    {freela.apresentacao}
                </p>
            </div>

            <div className="sh-freela-footer">
                <p className="sh-freela-footer-criacao">
                    Desde {freela.dataCadastro}
                </p>
            </div>
        </li>
    );

    return (
        <article className="sh-freelaDestaque">
            <h5 className="sh-profissionais-titulo">Profissionais em destaque</h5>

            <ul className="sh-freelaDestaque-lista">
                {listaFreelas}
            </ul>
        </article>
    )
}

export default FreelancersEmDestaque;