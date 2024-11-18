import React, { useEffect } from "react";
import './ServicosAceitos.css';

let userId: string | null = '';
let userTipo: string | null = '';
const servicosAceitos: any = [];

const ServicosAceitos = ({ setMostrarAlert, setTipoAlert, setMensagemAlert, setLoading, pagina }: any) => {

    async function pegaDados() {
        userId = sessionStorage.getItem('shUserLogId');
        userTipo = sessionStorage.getItem('shUserLogTipo');

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('acao', 'servicos_aceitos');

            if (userTipo === "0") {
                formData.append('idFree', `${userId}`);
            }
            else {
                formData.append('idCliente', `${userId}`);
            }

            const request = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            const response = await request.json();
            console.log(response);

            if (response.status === 200) {
                const dadosUsuario = response.dadosUser;
                const servicosAceitosData = response.servAceitos;
                const servicosFinalizadosData = response.servConc;

                if (servicosAceitos[0] === undefined) {

                    // Freelancer
                    if (userTipo === '0') {
                        // servicosAceitosData.map((dados: any) => {
                        //     servicosAceitos.push({
                        //         id: dados.id,
                        //         clienteId: dados.cliente_id,
                        //         freelaId: dados.freelancer_id,
                        //         tag: dados.tipo,
                        //         data: dados.data_servico,
                        //         endereco: dados.local_servico,
                        //         descricao: dados.descricao,
                        //         remuneracao: dados.remuneracao,
                        //         fotoServico: dados.servico_foto,
                        //         clienteNome: dados.clienteNome,
                        //         clienteSobrenome: dados.clienteSobrenome,
                        //         clienteTelefone: dados.clienteTelefone,
                        //         clienteEmail: dados.clienteEmail,
                        //         clienteClassificacao: dados.clienteClassificacao,
                        //         clienteFotoPerfil: dados.clienteFotoPerfil,
                        //     });
                        // });
                    }

                    // Cliente
                    else {
                        servicosAceitosData.map((dados: any) => {
                            servicosAceitos.push({
                                id: dados.id,
                                clienteId: dados.cliente_id,
                                freelaId: dados.freelancer_id,
                                tag: dados.tipo,
                                data: dados.data_servico,
                                endereco: dados.local_servico,
                                descricao: dados.descricao,
                                remuneracao: dados.remuneracao,
                                freelancerNome: dados.freelancerNome,
                                freelancerSobrenome: dados.freelancerSobrenome,
                                freelancerTelefone: dados.freelancerTelefone,
                                freelancerEmail: dados.freelancerEmail,
                                freelancerClassificacao: dados.freelancerClassificacao,
                                freelancerFotoPerfil: dados.freelancerFotoPerfil,
                            });
                        });
                    }
                }

            }
            else {
                setTipoAlert(3);
                setMensagemAlert("Dados não retornados!");
                setMostrarAlert(true);

                setTimeout(() => {
                    setMostrarAlert(false);
                    setLoading(false);
                }, 4000);
            }


        }
        catch (error) {
            setTipoAlert(3);
            setMensagemAlert("Erro de requisição!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                setLoading(false);
            }, 4000);
            console.error(error);
        }
    };

    useEffect(() => {
        if ((!sessionStorage.getItem('shUserLogId')) || (!sessionStorage.getItem('shUserLogTipo'))) {
            setTipoAlert(3);
            setMensagemAlert("Faça login antes!");
            setMostrarAlert(true);

            setTimeout(() => {
                setMostrarAlert(false);
                pagina('/login');
            }, 4000);
        }
        else {
            setLoading(false);
            pegaDados();
        }
    }, []);

    return (
        <article className="sh-servicosAceitos">
            Serrviços aceitos
        </article>
    )
}

export default ServicosAceitos;