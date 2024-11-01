import React, { useEffect, useState } from "react";
import './ListaServicos.css';
import imgTeste from '../../assets/index/backgrounds/teste.png';
import imgPadrao from '../../assets/index/icons/icon-perfil.png';
import imgPerfilTeste from '../../assets/index/icons/profissional.png';
import imgClassificacaoEstrela from '../../assets/icons/estrela.svg';
import background from '../../assets/index/backgrounds/background-servicos.svg';
import { Link, useNavigate } from "react-router-dom";

const ListaServicos = ({ setLoading, setMostraAlert, tituloDaSessao, servicos }) => {
    const id_usuario = sessionStorage.getItem('shUserLogId');
    const tipo_usuario = sessionStorage.getItem('shUserLogTipo');
    const pagina = useNavigate();

    useEffect(() => {
        setTimeout(() => {
        }, 4000);
    });

    function redirectLogin() {
        pagina('/login');
    }

    const montaServicos = servicos.map((servico) =>
        <>
            {servico.servico_status === 'aberto' && !tipo_usuario &&
                <li className="sh-servicosItem" key={servico.id} onClick={redirectLogin}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item sh-servicosLista-fotoServico">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilTeste} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
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

            {/* Serviços cadastrados (perfil Cliente) */}
            {servico.servico_status === 'aberto' && tipo_usuario === '1' &&
                <li className="sh-servicosItem" key={servico.id}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilTeste} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
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

            {/* Serviços aceitos (perfil Cliente) */}
            {servico.servico_status === 'em-andamento' && tipo_usuario === '1' &&
                <li className="sh-servicosItem" key={servico.id}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilTeste} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
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

            {/* Serviços concluidos (perfil Cliente) */}
            {servico.servico_status === 'concluido' && tipo_usuario === '1' &&
                <li className="sh-servicosItem" key={servico.id}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilTeste} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
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

            {/* Serviços sujeridos/todos os servicos (Freelancer) */}
            {servico.servico_status === 'aberto' && tipo_usuario === '0' &&
                <li className="sh-servicosItem" key={servico.id}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilTeste} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
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

            {/* Serviços aceitos (perfil Freelancer) */}
            {servico.servico_status === 'em-andamento' && tipo_usuario === '0' &&
                <li className="sh-servicosItem" key={servico.id}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilTeste} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
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

            {/* Serviços concluidos (perfil Freelancer) */}
            {servico.servico_status === 'concluido' && tipo_usuario === '0' &&
                <li className="sh-servicosItem" key={servico.id}>
                    <ul className="sh-servicosItem-lista">
                        <li className="sh-servicosLista-item">
                            {servico.servico_foto &&
                                <img src={servico.servico_foto} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                            {!servico.servico_foto &&
                                <img src={imgTeste} className="sh-servicosLista-imagem" alt="Imgagem do serviço a ser realizado" />
                            }
                        </li>
                        <li className="sh-servicosLista-item sh-servicosLista-header">
                            <div className="sh-servicosLista-fotoNome">
                                {servico.cliente_foto &&
                                    <img src={servico.cliente_foto} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
                                }
                                {!servico.cliente_foto &&
                                    <img src={imgPerfilTeste} alt="Imagem de perfil do cliente" className="sh-servicosLista-clienteImg" />
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
        <article className="sh-servicos">
            <h2 className="sh-servicos-titulo">{tituloDaSessao}</h2>
            <ul className="sh-servicosLista">
                {montaServicos}
            </ul>
        </article>
    )
}

export default ListaServicos;