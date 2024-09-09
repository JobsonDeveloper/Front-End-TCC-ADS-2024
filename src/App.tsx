import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';

// Css
import './App.css'

// Components
import Header from './components/header/Header';
import Servicos from './components/servicos/Servicos';
import imgApresentacaoUm from './assets/images_background/background_header_1Resultado.webp'
import imgApresentacaoDois from './assets/images_background/background_header_2Resultado.webp'
import Planos from './components/planos/Planos'


const ultimosServicos = [
  {
    tag: 'Serviços gerais',
    descricao: 'Preciso de uma pessoa para limpar os banheiros do meu clube hoje a partir das 23:00 horas, pos uma festa de aniversário que ocorrerá no local.',
    remuneracao: '250,00',
    tipoDeRemuneracao: 'Diária'
  },
  {
    tag: 'Professor',
    descricao: 'Preciso de uma pessoa para ajudar meu filho com matemática, dando aulas a ele dois dias por semana, durante a parte da tarde.',
    remuneracao: '1.200,00',
    tipoDeRemuneracao: 'Mensal'
  },
  {
    tag: 'Pedreiro',
    descricao: 'Preciso de uma pessoa para dar andamento ao projeto da minha casa, começando o trabalho de segunda a quarta, das 08:00 da manhã até as 16:00 da tarde.',
    remuneracao: '60,00',
    tipoDeRemuneracao: 'Diária'
  },
  {
    tag: 'Jardineiro',
    descricao: 'Preciso de uma pessoa para limpar o jardim da minha casa até no máximo as 16:00 horas do dia 30/12/2024.',
    remuneracao: '300,00',
    tipoDeRemuneracao: 'Diária'
  },
];

function App() {
  window.onload = function () { console.log("Está carregado!") }

  return (
    <main className='sh-container'>

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

      <section className="sh-main">
        {/* Últimos serviços postados */}
        <article className="sh-main-servicos">
          <h2 className="sh-servicos-titulo">Últimos serviços postados</h2>

          <Servicos data={ultimosServicos} />
        </article>

        {/* Card de planos */}
        <article className="sh-main-planos">
          <div className='sh-planos-titulos'>
            <h2 className="sh-planos-titulo">Deseja encontrar um cliente?</h2>
            <h4 className="sh-planos-subtitulo">Contrate um de nossos planos</h4>
          </div>

          <Planos />
        </article>

        {/* Vanatágens de ser nosso cliente */}
        <article className="sh-main-vantagens">
          <h2 className="sh-vantagens-titulo">Vantagens de ser nosso cliente</h2>

          <ul className="sh-vantagem-lista">
            <li className="sh-vantagem-item">
              <div className='sh-vantagem-item-marcador'></div>

            <div>
              Uma parte de nossos lucros é destinada para <strong>
                Casas de
                Adoção
              </strong> e <strong>Ongs de preservação da natureza</strong>, ao se tornar
              nosso cliente você estará melhorando a vida de muitas pessoas
            </div>
            </li>

            <li className="sh-vantagem-item">
              <ul className="sh-vantagens-item-info">
                <li className="sh-vantagens-info-item">
                  <div>.</div>
                  Verificamos o perfil de cada profissional antes de aprovar a criação da conta
                </li>
                <li className="sh-vantagens-info-item"></li>
              </ul>
            </li>

            <li className="sh-vantagem-item">

            </li>
          </ul>
        </article>
      </section>

      <section className="sh-footer">footer</section>
    </main>
  );
}

export default App;



