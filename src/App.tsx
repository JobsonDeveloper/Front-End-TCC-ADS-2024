import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/header/Header';
import Servicos from './components/servicos/Servicos';

import imgApresentacaoUm from './assets/images_background/background_header_1.svg'
import imgApresentacaoDois from './assets/images_background/background_header_2.svg'
import fotoPerfil from './assets/icons/perfil.svg'

function App() {
  const ultimosServicos = {
    tag: 'Serviços gerais',
    descricao: 'Preciso de uma pessoa para limpar os anheiros do meu clube hoje a partir das 23:00 horas, pos uma festa de aniversário que ocorrerá no local.',
    remuneracao: '100,00'
  }


  return (
    <main className='sh-container'>

      {/* Header completo */}
      <section className="sh-header-apresentacao">
        <Header />

        <article className='sh-apresentacao'>
          <div className="sh-apresentacao-posters">
            <img src={imgApresentacaoUm} alt="Imagem de pessoas no trabalho" className='sh-images-img' />
            <div className='sh-apresentacao-cadastro'>
              <p className='sh-cadastro-textos'>Seja um Freelancer de sucesso</p>
              <a href="cadastro freela" className='sh-cadastro-buttons'>Cadastre-se</a>
            </div>
          </div>
          <div className="sh-apresentacao-posters">
            <img src={imgApresentacaoDois} alt="Imagem de pessoas no trabalho" className='sh-images-img' />
            <div className='sh-apresentacao-cadastro'>
              <p className='sh-cadastro-textos'>Economize o seu tempo! Contrate um Freelancer</p>
              <a href="cadastro cliente" className='sh-cadastro-buttons'>Cadastre-se</a>
            </div>
          </div>
        </article>

      </section>

      {/* Main completo */}
      <section className="sh-main">
        <article className="sh-main-servicos">
          <h2 className="sh-servicos-titulo">Últimos serviços postados</h2>

          <ul className="sh-servicos-lista">
            {/* <Servicos data={ultimosServicos}/> */}

            {/* Remover */}
            <li className="sh-servicos-itens">
              <div className="sh-itens-data">
                <img src={fotoPerfil} alt="Foto de perfil, sem foto da pessoa" className='sh-servicos-img-perfil' />
                <p className="sh-servicos-data-marcadores">{ultimosServicos.tag}</p>
              </div>

              <div className="sh-itens-data">
                <p className="sh-servicos-data-descricao">{ultimosServicos.descricao}</p>
              </div>

              <div className="sh-itens-data">
                <p className='sh-servicos-data-remuneracao'>Remuneração:</p>
                <p className="sh-servicos-data-valor">R${ultimosServicos.remuneracao}</p>
              </div>
            </li>
            <li className="sh-servicos-itens">
              <div className="sh-itens-data">
                <img src={fotoPerfil} alt="Foto de perfil, sem foto da pessoa" className='sh-servicos-img-perfil' />
                <p className="sh-servicos-data-marcadores">{ultimosServicos.tag}</p>
              </div>

              <div className="sh-itens-data">
                <p className="sh-servicos-data-descricao">{ultimosServicos.descricao}</p>
              </div>

              <div className="sh-itens-data">
                <p className='sh-servicos-data-remuneracao'>Remuneração:</p>
                <p className="sh-servicos-data-valor">R${ultimosServicos.remuneracao}</p>
              </div>
            </li>
            <li className="sh-servicos-itens">
              <div className="sh-itens-data">
                <img src={fotoPerfil} alt="Foto de perfil, sem foto da pessoa" className='sh-servicos-img-perfil' />
                <p className="sh-servicos-data-marcadores">{ultimosServicos.tag}</p>
              </div>

              <div className="sh-itens-data">
                <p className="sh-servicos-data-descricao">{ultimosServicos.descricao}</p>
              </div>

              <div className="sh-itens-data">
                <p className='sh-servicos-data-remuneracao'>Remuneração:</p>
                <p className="sh-servicos-data-valor">R${ultimosServicos.remuneracao}</p>
              </div>
            </li>
            <li className="sh-servicos-itens">
              <div className="sh-itens-data">
                <img src={fotoPerfil} alt="Foto de perfil, sem foto da pessoa" className='sh-servicos-img-perfil' />
                <p className="sh-servicos-data-marcadores">{ultimosServicos.tag}</p>
              </div>

              <div className="sh-itens-data">
                <p className="sh-servicos-data-descricao">{ultimosServicos.descricao}</p>
              </div>

              <div className="sh-itens-data">
                <p className='sh-servicos-data-remuneracao'>Remuneração:</p>
                <p className="sh-servicos-data-valor">R${ultimosServicos.remuneracao}</p>
              </div>
            </li>
            {/* Remover */}
          </ul>
        </article>

        <article className="sh-main-planos">
          <h2 className="sh-planos-titulos"></h2>
        </article>
      </section>

      {/* Footer completo */}
      <section className="sh-footer">footer</section>
    </main>

  );
}

export default App;
