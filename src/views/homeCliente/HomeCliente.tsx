import { Alert, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import './HomeCliente.css';

const ShAlert = () => {
    return (
        <>
            {tipoAlert === 0 &&
                <Alert severity="success">
                    {mensagemAlert}
                </Alert>
            }

            {tipoAlert === 1 &&
                <Alert severity="info">
                    {mensagemAlert}
                </Alert>
            }

            {tipoAlert === 2 &&
                <Alert severity="warning">
                    {mensagemAlert}
                </Alert>
            }

            {tipoAlert === 3 &&
                <Alert severity="error">
                    {mensagemAlert}
                </Alert>
            }
        </>
    )
}

let mensagemAlert = "";
let tipoAlert = 0;

const frutas = [
    {nome: 'MAÇÃ', valor: 12},
    {nome: 'morango', valor: 12},
    {nome: 'Abacaxi', valor: 12},
    {nome: 'ViTaMiNa', valor: 12}
]

const Home = () => {
    const pagina = useNavigate();
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState('');

    const frutasFiltradas = frutas.filter((fruta) => fruta.nome.toLowerCase().includes(busca.toLowerCase()));

    useEffect(() => {
        if (!sessionStorage.getItem('shUserLogId')) {
            tipoAlert = 3;
            mensagemAlert = "Faça login antes!";
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else if (sessionStorage.getItem('shUserLogTipo') != '1') {
            tipoAlert = 3;
            mensagemAlert = "Faça login antes!";
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else {
            setLoading(false);
        }
    });

    return (
        <div className="sh-main">
            {loading && <Loading />}

            <div>
                <input
                    type="text"
                    onChange={((e) => { setBusca(e.target.value) })}
                    value={busca}
                />

                <ul>
                    {frutasFiltradas.map((fruta) =>
                        <li key={fruta.nome}>{fruta.nome} {fruta.valor}</li>
                    )}
                </ul>
            </div>

            {mostrarAlert && <div className="sh-alerts"> <ShAlert /> </div>}
        </div>
    )
}

export default Home;