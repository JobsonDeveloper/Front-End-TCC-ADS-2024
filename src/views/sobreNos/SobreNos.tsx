import React from "react";
import { Link } from "react-router-dom";
import './SobreNos.css'

const SobreNos = () => {
    return (
        <section className="sh-main">
            <h2>Sobre Nós</h2>

            <Link to='/sobrenos'>Sobre nós</Link><br />
            <Link to='/login'>login</Link><br />
            <Link to='/'>home</Link><br />
        </section>
    )
};

export default SobreNos;