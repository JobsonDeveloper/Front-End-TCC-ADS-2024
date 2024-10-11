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
import ClientesEmDestaque from './components/clientesEmDestaque/ClientesEmDestaque';
import Footer from './components/footer/Footer';
import Loading from './components/loading/Loading';
import { createRoot } from 'react-dom/client';

import backgroundApresentacaoUm from './assets/index/backgrounds/background-apresentacao-lg.webp'
import backgroundApresentacaoDois from './assets/index/backgrounds/imagem-apresentacao.webp'
import backgroundApresentacaoMd from './assets/index/backgrounds/background-apresentacaoMd.png'
import buttonFreelancer from './assets/index/backgrounds/serFreelancer.png';
import { Accordion } from 'react-bootstrap';

// ------------ Monta do banco ----------
const ultimosServicos = [
  {
    tag: 'Serviços gerais',
    descricao: 'Preciso de uma pesso',
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
  }
];

const profDestaque = [
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'João Paulo César',
    servicoUm: 'Músico',
    servicoDois: 'Professor',
    servicoTres: 'Tatuador',
    dataCadastro: '05/2024',
    estrelas: 103
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'Marcos Amorim da Silva',
    servicoUm: 'Músico',
    servicoDois: 'Professor',
    servicoTres: 'Tatuador',
    dataCadastro: '05/2024',
    estrelas: 87
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'Victor Amaral  de souza',
    servicoUm: 'Músico',
    servicoDois: 'Professor',
    servicoTres: 'Tatuador',
    dataCadastro: '05/2024',
    estrelas: 65
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'André Coutinho Andrade',
    servicoUm: 'Músico',
    servicoDois: 'Professor',
    servicoTres: 'Tatuador',
    dataCadastro: '05/2024',
    estrelas: 49
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'André Felipe Silva',
    servicoDois: 'Suporte técnico',
    dataCadastro: '05/2024',
    estrelas: 30
  },
];

const cliDestaque = [
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'João Paulo César',
    dataCadastro: '05/2024',
    estrelas: 103
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'João Paulo César',
    dataCadastro: '05/2024',
    estrelas: 90
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'João Paulo César',
    dataCadastro: '05/2024',
    estrelas: 87
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'João Paulo César',
    dataCadastro: '05/2024',
    estrelas: 78
  },
  {
    fotoUrl: '../../assets/profissionais/profissional.png',
    nome: 'João Paulo César',
    dataCadastro: '05/2024',
    estrelas: 76
  },
];

function App() {
  const [loading, removeLoading] = useState(false);
  const [sideBar, removeSideBar] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      removeLoading(true);
      removeSideBar(false);
    }, 1500);
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
      {!loading && <Loading />}

      <section className="sh-header-apresentacao">
        {!sideBar && <Header />}

        <article className='sh-apresentacao'>
          <article className="sh-apresentacao-um">
            <img src={backgroundApresentacaoUm} alt="Foto de pessoa segurando um notebook" className="sh-apresentacao-img d-lg-none" />
            <img src={backgroundApresentacaoMd} alt="Foto de pessoa segurando um notebook" className="sh-apresentacao-img d-none d-lg-flex" />
          </article>

          <article className="sh-apresentacao-textos d-md-none">
            <h2 className="sh-apresentacao-titulos">Faça sua carreira decolar! <br /> Conquiste o mercado conosco</h2>
            <p className="sh-apresentacao-paragrafos">
              Aqui você tem a oportunidade de encontrar novos clientes, se tornar prestigiado e requisitado por muitas pessoas.
            </p>
            <p className="sh-apresentacao-paragrafos">
              Cadastre-se no nosso site e seja mais um Freelancer de sucesso!
            </p>
          </article>

          {/* Button para freelancers */}
          <article className="sh-apresentacao-button d-md-none">
            <div className="sh-apresentacao-button-item sh-apresentacao-button">
              <Link to='/cadastro-freelancer' className='sh-apresentacao-button-cadastro'>Torne-se um Freelancer</Link>
            </div>
          </article>

          {/* Secundo post */}
          <article className="sh-apresentacao-dois d-md-none">
            <div className="sh-apresentacao-dois-container-img">
              <Link to='/cadastro-cliente'><img src={backgroundApresentacaoDois} alt="" className="sh-apresentacao-dois-img d-md-none" /></Link>
            </div>

            <div className="sh-apresentacao-textos">
              <h1 className="sh-apresentacao-dois-titulos">
                Seja cliente de forma 100% gratuíta
              </h1>
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
        {/* Oque é a Skillhun */}
        <article className="sh-show sh-main-skillhub" id='sh_main_skillhub'>
          <h2 className="sh-skillhub-titulo">Oque é a Skillhub</h2>

          <ul className="sh-skillhub-textos-list">
            <li className="sh-skillhub-paragrafos">
              A Skillhub é uma plataforma criada para facilitar os
              fornecimentos e as solicitações de serviços para todos.
              Funcionando 100% online, nós desejamos lhe proporcionar
              uma boa experiência de contratação de serviço e/ou do
              fornecimento dele.
            </li>

            <li className="sh-skillhub-paragrafos">
              Não somos somente uma plataforma, somos uma porta aberta
              para aqueles que desejam adquirir visibilidade fazendo
              aquilo de que gostam, também somos um facilitador para
              aqueles que desejam economizar tempo, chamando
              alguém para realizar um serviço.
            </li>

            <li className="sh-skillhub-paragrafos">
              Sendo cliente, você pode postar um serviço desejado e
              aguardar enquanto o divulgamos, até que um freelancer
              se interesse pelo trabalho e entre em contato para saber
              mais sobre o trabalho.
            </li>

            <li className="sh-skillhub-paragrafos">
              Sendo Freelancer, você encontrará serviços rápidos e bem
              remunerados perto da sua residência, facilitando tanto
              a sua vida quanto a vida de outras pessoas.
            </li>
          </ul>
        </article>

        {/* Profissionais em destaque */}
        <article className="sh-profissionaisEmDestaque" id='sh_profissionais_emDestaque'>
          <h2 className="sh-profissionaisEmDestaque-titulo">Profissionais em destaque</h2>
          <div className="sh-profissionalEmDestaque-lista">
            <ProfissionaisEmDestaque dados={profDestaque} />
          </div>
        </article>

        {/* Clientes em destaque */}
        <article className="sh-clientesEmDestaque" id='sh_profissionais_emDestaque'>
          <h2 className="sh-clientesEmDestaque-titulo">Clientes em destaque</h2>
          <div className="sh-clientesEmDestaque-lista">
            <ClientesEmDestaque dados={cliDestaque} />
          </div>
        </article>

        {/* Deseja ser um Freelancer? */}
        <article className="sh-show sh-main-planos" id='sh_planos'>
          <div className='sh-planos-titulos'>
            <h2 className="sh-planos-titulo">Deseja encontrar um cliente?</h2>
            <h2 className="sh-planos-subtitulo">Contrate um de nossos planos</h2>
          </div>

          <Planos />
        </article>

        {/* Vantagens de fazer parte do nosso time */}
        <article className="sh-main-vantagens" id='sh_vantagens'>
          <h2 className="sh-show sh-vantagens-titulo">Vantagens de ser nosso cliente</h2>

          <ul className="sh-show sh-vantagens-lista">
            <li className="sh-vantagem-item-info">
              Uma parte de nossos lucros é destinada para
              Casas de Adoção e Ongs de preservação da natureza,
              ao se tornar nosso cliente você estará melhorando a
              vida de muitas pessoas.
            </li>

            <li className="sh-vantagem-item-info">
              Verificamos o perfil de cada profissional antes
              de aprovar a criação da conta.
            </li>

            <li className="sh-vantagem-item-info">
              Cobramos dos profissionais e clientes em caso
              de comprovação de atitude inapropriada.
            </li>

            <li className="sh-vantagem-item-info">
              Garantia de Qualidade e Segurança.
            </li>

            <li className="sh-vantagem-item-info">
              Fornecemos uma Assistência humanizada.
            </li>

            <li className="sh-vantagem-item-info">
              Prezamos por um Atendimento personalizado
              por parte de nossos atendentes.
            </li>

          </ul>
        </article>

        {/* Como começar */}
        <article className="sh-main-comecar" id='sh_comecar'>
          <h2 className="sh-show sh-comecar-titulo">Como começar</h2>

          <div className="sh-comecar-tipo">
            <ul className="sh-show sh-comecar-list">
              <li className="sh-comecar-tipo-titlulo">Cliente</li>
              <li className="sh-comecar-list-item">Clique em em um dos botões do site para realizar o cadastro ou acesse <Link to='/cadastro-cliente'>este link.</Link></li>
              <li className="sh-comecar-list-item">Selecione o tipo “<span className='sh-span-destaque'>Cliente</span>” para proseguir com o cadastro.</li>
              <li className="sh-comecar-list-item">Em cada tela, forneça os dados solicitados e clique em “<span className='sh-span-destaque'>Continuar</span>”.</li>
              <li className="sh-comecar-list-item">Na ultima tela, verifique se os dados fornecidcadastro-freelanceros estão corretos.</li>
              <li className="sh-comecar-list-item">Caso algum dado esteja incorreto clique nele para editar.</li>
              <li className="sh-comecar-list-item">Após realizar a verificação, clique em “<span className='sh-span-destaque'>Cadastrar</span>”.</li>
              <li className="sh-comecar-list-item">Pronto! Seu perfil foi criado e está pronto para ser utilizado.</li>
            </ul>

            <ul className="sh-show sh-comecar-list">
              <li className="sh-comecar-tipo-titlulo">Freelancer</li>
              <li className="sh-comecar-list-item">Clique em em um dos <a href="#sh_planos">cards de planos</a>, no botão “<span className='sh-span-destaque'>Cadastre-se</span> no início do site ou <Link to='/cadastro-freelancer'>este link.</Link></li>
              <li className="sh-comecar-list-item">Caso tenha clicado no link ou em um dos botões, selecione o tipo “<span className='sh-span-destaque'>Profissional</span>” para proseguir com o cadastro e escolha o plano que você deseja.</li>
              <li className="sh-comecar-list-item">Após selecionar o plano desejado, forneça os dados solicitados e clique em “<span className='sh-span-destaque'>Continuar</span>”.</li>
              <li className="sh-comecar-list-item">Na ultima tela, verifique se os dados fornecidos estão corretos.</li>
              <li className="sh-comecar-list-item">Caso algum dado esteja incorreto clique nele para editar.</li>
              <li className="sh-comecar-list-item">Após realizar a verificação, clique em “<span className='sh-span-destaque'>Cadastrar</span>”.</li>
              <li className="sh-comecar-list-item">Após isto, o seu perfil será analisado por nossa equipe, a aprovação da conta pode levar até 5 dias úteis, você será informado por E-mail sobre o resultado da análise.</li>
            </ul>
          </div>
        </article>

        {/* Dúvidas frequentes  */}
        <article className="sh-main-duvidas" id='sh_duvidas'>
          <h2 className="sh-show sh-duvidas-titulo">Dúvidas frequentes</h2>

          <Accordion className='sh-show sh-duvidas-acordeon'>
            <Accordion.Item eventKey="0" className='sh-duvidas-acordeon-item'>
              <Accordion.Header className='sh-duvidas-header'>Como os freelancers conversam com os clientes?</Accordion.Header>
              <Accordion.Body className='sh-acordeon-body'>
                ...
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className='sh-duvidas-acordeon-item'>
              <Accordion.Header className='sh-duvidas-header'>O suporte é 24 horas?</Accordion.Header>
              <Accordion.Body className='sh-acordeon-body'>
                ...
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" className='sh-duvidas-acordeon-item'>
              <Accordion.Header className='sh-duvidas-header'>Os clientes pagam para se cadastrar?</Accordion.Header>
              <Accordion.Body className='sh-acordeon-body'>
                Para os clientes, a utilização da plataforma é 100%
                gratuíta, o pagameto só será realizado ao freelancer
                ao qual você deseja contratar para um determinado serviço.
                O valor da remuneração do serviço é definido pelo cliente
                no momento da postagem do mesmo.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3" className='sh-duvidas-acordeon-item'>
              <Accordion.Header className='sh-duvidas-header'>Quais são os meios de pagamento para aderir a um plano?</Accordion.Header>
              <Accordion.Body className='sh-acordeon-body'>
                ...
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </article>

        {/* Últimos serviços postados */}
        <article className="sh-main-servicos" id='sh_ultimas_postagens'>
          <h2 className="sh-show sh-servicos-titulo">Últimos serviços postados</h2>

          <div className="sh-servicos-lista-container">
            <Servicos data={ultimosServicos} />
          </div>
        </article>
      </section>

      <section className="sh-footer">
        <Footer />
      </section>
    </main>
  );
}

export default App;



