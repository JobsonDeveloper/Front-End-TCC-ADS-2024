import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { StrictMode, useEffect, useLayoutEffect, useState } from 'react';

// Css
import './App.css'

// Components
import Header from './components/header/Header';
import Servicos from './components/servicos/Servicos';
import imgApresentacaoUm from './assets/images_background/background_header_1Resultado.webp'
import imgApresentacaoDois from './assets/images_background/background_header_2Resultado.webp'
import Planos from './components/planos/Planos'
import ProfissionaisEmDestaque from './components/profissionaiEmDestaque/ProfissionaisEmDestaque';
import Footer from './components/footer/Footer';
import Loading from './components/loading/Loading';
import { createRoot } from 'react-dom/client';

import backgroundApresentacaoUm from './assets/index/backgrounds/background-apresentacao-lg.webp'
import backgroundApresentacaoDois from './assets/index/backgrounds/imagem-apresentacao.webp'
import apresentacaoButtonIcon from './assets/index/icons/apresentacao-button-icon.png';

// ------------ Monta do banco ----------
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

const profDestaque = [
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'João Paulo César',
    servicoUm: 'Músico',
    servicoDois: 'Professor',
    servicoTres: 'Tatuador',
    estrelas: 103
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'Marcos Amorim da Silva',
    servicoUm: 'Músico',
    servicoDois: 'Professor',
    servicoTres: 'Tatuador',
    estrelas: 87
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'Victor Amaral  de souza',
    servicoUm: 'Músico',
    servicoDois: 'Professor',
    servicoTres: 'Tatuador',
    estrelas: 65
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'André Coutinho Andrade',
    servicoUm: 'Músico',
    servicoDois: 'Professor',
    servicoTres: 'Tatuador',
    estrelas: 49
  },
];

function App() {
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    setRemoveLoading(true);
  }, []);


  // async function pegarDados() {
  //   try {

  //     const formData = new FormData();
  //     formData.append('acao', 'login');
  //     formData.append('cpf', '092.612.214-24');
  //     formData.append('senha', '12345678');

  //     const requsicao = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
  //       method: 'POST',
  //       mode: 'cors',
  //       body: formData
  //     });

  //     const resposta = await requsicao.json();

  //     let status = resposta.status;
  //     let dados = resposta.data;

  //     console.log(status, dados);
  //     setRemoveLoading(true);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <main className='sh-container'>
      {!removeLoading && <Loading />}

      <section className="sh-header-apresentacao">
        <Header />

        <article className='sh-apresentacao'>
          {/* <div className="sh-apresentacao-posters">
            <img src={imgApresentacaoUm} alt="Imagem de pessoas no trabalho" className='sh-images-img' />
            <div className='sh-apresentacao-cadastro'>
              <p className='sh-cadastro-textos'>Seja um Freelancer de sucesso</p>
              <Link to='/cadastro-freelancer' className='sh-cadastro-buttons'>Cadastre-se</Link>
            </div>
          </div>

          <div className="sh-apresentacao-posters">
            <img src={imgApresentacaoDois} alt="Imagem de pessoas no trabalho" className='sh-images-img' />
            <div className='sh-apresentacao-cadastro'>
              <p className='sh-cadastro-textos'>Economize o seu tempo! Contrate um Freelancer</p>
              <Link to='/cadastro-cliente' className='sh-cadastro-buttons'  >Cadastre-se</Link>
            </div>
          </div> */}

          <article className="sh-apresentacao-um">
            <img src={backgroundApresentacaoUm} alt="Foto de pessoa segurando um notebook" className="sh-apresentacao-img" />
          </article>

          <article className="sh-apresentacao-textos">
            <h2 className="sh-apresentacao-titulos">Faça sua carreira decolar!</h2>
            <h2 className="sh-apresentacao-titulos">Conquiste o mercado conosco</h2>
            <p className="sh-apresentacao-paragrafos">
              Aqui você tem a oportunidade de encontrar novos clientes, se tornar prestigiado e requisitado por muitas pessoas.
            </p>
            <p className="sh-apresentacao-paragrafos">
              Cadastre-se no nosso site e seja mais um Freelancer de sucesso!
            </p>
          </article>

          {/* Button para freelancers */}
          <ul className="sh-apresentacao-button">
            {/* <li className="sh-apresentacao-button-item">
              <img src={apresentacaoButtonIcon} alt="" className="sh-apresentacao-button-icon" />
            </li> */}
            <li className="sh-apresentacao-button-item sh-apresentacao-button">
              <Link to='/' className='sh-apresentacao-button-cadastro'>Torne-se um Freelancer</Link>
            </li> 
            {/* <li className="sh-apresentacao-button-item">
              <img src={apresentacaoButtonIcon} alt="" className="sh-apresentacao-button-icon sh-invert" />
            </li> */}
          </ul>

          {/* Secundo post */}
          <article className="sh-apresentacao-dois">
            <div className="sh-apresentacao-dois-container-img">
              <h1 className="sh-apresentacao-dois-titulos">
                Seja cliente de forma 100% gratuíta
              </h1>
              <img src={backgroundApresentacaoDois} alt="" className="sh-apresentacao-dois-img" />
            </div>

            <div className="sh-apresentacao-textos">
              <p className="sh-apresentacao-dois-textos">
                Estamos sempre buscando facilitar a vida de nossos clientes, concedendo o acesso a Freelancers qualificado.
              </p>
              <p className="sh-apresentacao-dois-textos">
                Cadastre-se na nossa plataforma de forma fácil e rápida, contrate um de nossos Freelancers e economize o seu tempo.              </p>
            </div>
          </article>
        </article>

      </section>

      <section className="sh-main">
        {/* Últimos serviços postados */}
        <article className="sh-main-servicos" id='sh_ultimas_postagens'>
          <h2 className="sh-servicos-titulo">Últimos serviços postados</h2>

          <Servicos data={ultimosServicos} />
        </article>

        {/* Card de planos */}
        <article className="sh-main-planos" id='sh_planos'>
          <div className='sh-planos-titulos'>
            <h2 className="sh-planos-titulo">Deseja encontrar um cliente?</h2>
            <h4 className="sh-planos-subtitulo">Contrate um de nossos planos</h4>
          </div>

          <Planos />
        </article>

        {/* Vanatágens de ser nosso cliente */}
        <article className="sh-main-vantagens" id='sh_vantagens'>
          <h2 className="sh-vantagens-titulo">Vantagens de ser nosso cliente</h2>

          <div className="sh-vantagem-lista">

            <ul className="sh-vantagem-lista-item">
              <li className="sh-vantagem-item-info">
                Uma parte de nossos lucros é destinada para <strong>Casas de Adoção
                </strong> e <strong>Ongs de preservação da natureza</strong>, ao se tornar
                nosso cliente você estará melhorando a vida de muitas pessoas
              </li>
            </ul>

            <ul className="sh-vantagem-lista-item">
              <li className="sh-vantagem-item-info">
                Verificamos o perfil de cada profissional antes de aprovar a criação da conta
              </li>
              <li className="sh-vantagem-item-info">
                Cobramos dos profissionais e clientes em caso de comprovação de atitude inapropriada
              </li>
            </ul>

            <ul className="sh-vantagem-lista-item">
              <li className="sh-vantagem-item-info">
                Garantia de <strong>Qualidade</strong> e <strong>Segurança</strong>
              </li>
              <li className="sh-vantagem-item-info">
                Fornecemos uma <strong>Assistência humanizada</strong>
              </li>
              <li className="sh-vantagem-item-info">
                Prezamos por um <strong>Atendimento personalizado</strong>
                por parte de nossos atendentes
              </li>
            </ul>

          </div>
        </article>

        {/* Como começar */}
        <article className="sh-main-comecar" id='sh_comecar'>
          <h2 className="sh-comecar-titulo">Como começar</h2>

          <div className="sh-comecar-tipo">
            <ul className="sh-comecar-list">
              <li className="sh-comecar-tipo-titlulo">Cliente</li>
              <li className="sh-comecar-list-item">Clique em em um dos botões do site para realizar o cadastro ou acesse <Link to='/cadastro-cliente'>este link.</Link></li>
              <li className="sh-comecar-list-item">Selecione o tipo “<strong>Cliente</strong>” para proseguir com o cadastro.</li>
              <li className="sh-comecar-list-item">Em cada tela, forneça os dados solicitados e clique em “<strong>Continuar</strong>”.</li>
              <li className="sh-comecar-list-item">Na ultima tela, verifique se os dados fornecidcadastro-freelanceros estão corretos.</li>
              <li className="sh-comecar-list-item">Caso algum dado esteja incorreto clique nele para editar.</li>
              <li className="sh-comecar-list-item">Após realizar a verificação, clique em “<strong>Cadastrar</strong>”.</li>
              <li className="sh-comecar-list-item">Pronto! Seu perfil foi criado e está pronto para ser utilizado.</li>
            </ul>

            <ul className="sh-comecar-list">
              <li className="sh-comecar-tipo-titlulo">Freelancer</li>
              <li className="sh-comecar-list-item">Clique em em um dos <a href="#sh_planos">cards de planos</a>, no botão “<strong>Cadastre-se</strong> no início do site ou <Link to='/cadastro-freelancer'>este link.</Link></li>
              <li className="sh-comecar-list-item">Caso tenha clicado no link ou em um dos botões, selecione o tipo “<strong>Profissional</strong>” para proseguir com o cadastro e escolha o plano que você deseja.</li>
              <li className="sh-comecar-list-item">Após selecionar o plano desejado, forneça os dados solicitados e clique em “<strong>Continuar</strong>”.</li>
              <li className="sh-comecar-list-item">Na ultima tela, verifique se os dados fornecidos estão corretos.</li>
              <li className="sh-comecar-list-item">Caso algum dado esteja incorreto clique nele para editar.</li>
              <li className="sh-comecar-list-item">Após realizar a verificação, clique em “<strong>Cadastrar</strong>”.</li>
              <li className="sh-comecar-list-item">Após isto, o seu perfil será analisado por nossa equipe, a aprovação da conta pode levar até 5 dias úteis, você será informado por E-mail sobre o resultado da análise.</li>
            </ul>
          </div>
        </article>

        {/* Profissionais em destaque */}
        <article className="sh-profissionaisEmDestaque" id='sh_profissionais_emDestaque'>
          <h2 className="sh-profissionaisEmDestaque-titulo">Profissionais em destaque</h2>
          <ProfissionaisEmDestaque dados={profDestaque} />
        </article>
      </section>

      <Footer />
    </main>
  );
}

export default App;



