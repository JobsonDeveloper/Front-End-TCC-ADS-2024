import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <h1>Página de Login</h1>

            <Link to='/sobrenos'>Sobre nós</Link><br />
            <Link to='/login'>login</Link><br />
            <Link to='/'>home</Link><br />
        </div>
    )
}

export default Login;