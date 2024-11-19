import React, { useEffect } from "react";
import './ServicosAceitos.css';
import imgPerfilDefault from '../../assets/icons/perfil.png';
import imgClassificacaoEstrela from '../../assets/icons/estrela.svg';

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

            if (response.status === 201) {
                const dadosUsuario = response.dadosUser;
                const servicosAceitosData = response.servAceitos;
                const servicosFinalizadosData = response.servConc;

                if (servicosAceitos[0] === undefined) {

                    // Freelancer
                    if (userTipo === '0') {
                        servicosAceitosData.map((servAceitos: any) => {
                            servicosAceitos.push({
                                id: servAceitos.id,
                                clienteId: servAceitos.cliente_id,
                                freelaId: servAceitos.freelancer_id,
                                tag: servAceitos.tipo,
                                data: servAceitos.data_servico,
                                endereco: servAceitos.local_servico,
                                descricao: servAceitos.descricao,
                                remuneracao: servAceitos.remuneracao,
                                fotoServico: servAceitos.servico_foto,
                                clienteNome: servAceitos.nome,
                                clienteSobrenome: servAceitos.sobrenome,
                                clienteTelefone: servAceitos.telefone,
                                clienteEmail: servAceitos.email,
                                clienteClassificacao: servAceitos.classificacao,
                                clienteFotoPerfil: servAceitos.imagem_perfil,
                            });
                        });
                    }

                    // Cliente
                    else {
                        servicosAceitosData.map((servAceitos: any) => {
                            servicosAceitos.push({
                                id: servAceitos.id,
                                clienteId: servAceitos.cliente_id,
                                freelaId: servAceitos.freelancer_id,
                                tag: servAceitos.tipo,
                                data: servAceitos.data_servico,
                                endereco: servAceitos.local_servico,
                                descricao: servAceitos.descricao,
                                remuneracao: servAceitos.remuneracao,
                                freelancerNome: servAceitos.freelancerNome,
                                freelancerSobrenome: servAceitos.freelancerSobrenome,
                                freelancerTelefone: servAceitos.freelancerTelefone,
                                freelancerEmail: servAceitos.freelancerEmail,
                                freelancerClassificacao: servAceitos.freelancerClassificacao,
                                freelancerFotoPerfil: servAceitos.freelancerFotoPerfil,
                            });
                        });
                    }
                }
            }

            setLoading(false);
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

    const listaServicos = servicosAceitos.map((servico: any, index: any) =>
        <>
            {userTipo === "0" &&
                <li className="sh-servicosItem" key={servico.id}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                            <img src={servico.fotoServico} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilDefault} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                <p className="sh-servicosLista-nomeCliente">{servico.cliente_nome} {servico.cliente_sobrenome}</p>
                            </div>
                            <div className="sh-servicosLista-classificacao">
                                <img src={imgClassificacaoEstrela} alt="" className="sh-servicosLista-classificacaoImg" />
                                <p className="sh-servicosLista-classificacaoNumero">{servico.clienteClassificacao}</p>
                            </div>
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-main">
                            <p className="sh-servicosLista-tipoServico">{servico.tag}</p>
                            <p className="sh-servicosLista-descricaoServico">{servico.descricao}</p>
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-footer">
                            <p className="sh-servicosLista-remuneracao">R${servico.remuneracao},00 reais</p>
                        </li>
                    </ul>
                </li>
            }
            {userTipo === "1" &&
                <li className="sh-servicosItem" key={servico.id}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                            <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilDefault} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                <p className="sh-servicosLista-nomeCliente">{servico.cliente_nome} {servico.cliente_sobrenome}</p>
                            </div>
                            <div className="sh-servicosLista-classificacao">
                                <img src={imgClassificacaoEstrela} alt="" className="sh-servicosLista-classificacaoImg" />
                                <p className="sh-servicosLista-classificacaoNumero">{servico.cliente_classificacao}</p>
                            </div>
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-main">
                            <p className="sh-servicosLista-tipoServico">{servico.tag}</p>
                            <p className="sh-servicosLista-descricaoServico">{servico.descricao}</p>
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-footer">
                            <p className="sh-servicosLista-remuneracao">R${servico.remuneracao},00 reais</p>
                        </li>
                    </ul>
                </li>
            }
        </>

    );

    return (
        <article className="sh-servicosAceitos">
            <ul className="sh-servicosLista">
                {listaServicos}
 
                {servicosAceitos.length === 0 &&
                    <h2 className="sh-servicosAceitos-semServicos">
                        Nenhum serviço aceito
                    </h2>
                }
            </ul>

        </article>
    )
}

export default ServicosAceitos;