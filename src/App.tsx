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
import { duration } from '@mui/material';

import Aos from "aos";
import "aos/dist/aos.css";
import ListaServicos from './components/listaServicos/ListaServicos';
import FreelancersEmDestaque from './components/freelancersEmDestaque/FreelancersEmDestaque';

// ------------ Monta do banco ----------
let ultimosServicos: Array<object> = [];

const profDestaque: Array<object> = [];

const cliDestaque: Array<object> = [];

let consulta = false;

function App() {
  const [loading, setLoading] = useState(true);
  const [sideBar, setSideBar] = useState(false);

  useEffect(() => {
    pegarDados();
    setTimeout(() => {
      setLoading(false);
      setSideBar(true);
    }, 1500);

    Aos.init({ duration: 500 });
  }, []);

  function formatData(data: any) {
    let dataFormatUm = new Date(data);
    let dia = `${dataFormatUm.getDate()}`;
    let mes = `${dataFormatUm.getMonth() + 1}`;
    let ano = dataFormatUm.getFullYear();

    if (dia.length < 2) {
      dia = `0${dia}`;
    }

    if (mes.length < 2) {
      mes = `0${mes}`;
    }

    return (`${dia}/${mes}/${ano}`);
  }


  async function pegarDados() {
    if (!consulta) {
      consulta = true;

      try {

        const formData = new FormData();
        formData.append('acao', 'dados_apresentacao');

        const requsicao = await fetch('https://jobsondeveloper.site/cadastro_login.php', {
          method: 'POST',
          mode: 'cors',
          body: formData
        });

        const response = await requsicao.json();


        if (response) {
          const servicos = response.dataServico;
          const freelancers = response.dataFreelancers;
          const clientes = response.dataClientes;

          servicos.map((dados: any) => {
            ultimosServicos.push({
              id: dados.id,
              freelancer_id: dados.frefreelancer_id,
              cliente_id: dados.cliente_id,
              servico_foto: dados.servico_foto,
              cliente_foto: dados.imagem_perfil,
              cliente_nome: dados.nome,
              cliente_sobrenome: dados.sobrenome,
              cliente_classificacao: dados.classificacao,
              tag: dados.tipo,
              descricao: dados.descricao,
              remuneracao: dados.remuneracao,
              servico_status: 'aberto',
              tipo_servico: 'ultimos'
            });
          })

          freelancers.map((dados: any) => {
            let servicosSplit = dados.servicos.split(",");

            profDestaque.push({
              id: dados.id,
              fotoUrl: dados.imagem_perfil,
              nome: `${dados.nome} ${dados.sobrenome}`,
              servico: servicosSplit[0],
              apresentacao: dados.apresentacao,
              dataCadastro: formatData(dados.data_de_criacao),
              classificacao: dados.classificacao
            });
          })

          clientes.map((dados: any) => {
            cliDestaque.push({
              fotoUrl: dados.imagem_perfil,
              nome: `${dados.nome} ${dados.sobrenome}`,
              dataCadastro: formatData(dados.data_de_criacao),
              estrelas: dados.classificacao
            });
          })
        }


      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <main className='sh-container'>
      {loading && <Loading />}

      <section className="sh-header-apresentacao" id='sh_home_header'>
        {sideBar && <Header usuario={0} />}

        <article className='sh-apresentacao'>
          <article className="sh-apresentacao-um">
            <img src={backgroundApresentacaoUm} alt="Foto de pessoa segurando um notebook" className="sh-apresentacao-img d-lg-none" />
            <img src={backgroundApresentacaoMd} alt="Foto de pessoa segurando um notebook" className="sh-apresentacao-img d-none d-lg-flex" />
          </article>

          <article className="sh-apresentacao-textos d-lg-none">
            <h2 className="sh-apresentacao-titulos">Faça sua carreira decolar! <br /> Conquiste o mercado conosco</h2>
            <p className="sh-apresentacao-paragrafos">
              Aqui você tem a oportunidade de encontrar novos clientes, se tornar prestigiado e requisitado por muitas pessoas.
            </p>
            <p className="sh-apresentacao-paragrafos">
              Cadastre-se no nosso site e seja mais um Freelancer de sucesso!
            </p>
          </article>

          {/* Button para freelancers */}
          <article className="sh-apresentacao-button d-sm-none">
            <div className="sh-apresentacao-button-item sh-apresentacao-button">
              <Link to='/cadastro-freelancer' className='sh-apresentacao-button-cadastro'>Torne-se um Freelancer</Link>
            </div>
          </article>

          {/* Secundo post */}
          <article className="sh-apresentacao-dois d-lg-none">
            <div className="sh-apresentacao-dois-container-img" data-aos="fade-right">
              <Link to='/cadastro-cliente'><img src={backgroundApresentacaoDois} alt="" className="sh-apresentacao-dois-img d-lg-none" /></Link>
            </div>

            <div className="sh-apresentacao-textos" data-aos="fade-left">
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
        <div className="sh-skillhub-info" id='sh_sobre_a_skillhub'>
          <article className="sh-show sh-main-skillhub" id='sh_main_skillhub'>
            <h2 className="sh-skillhub-titulo" data-aos="zoom-in">Oque é a Skillhub</h2>
            <ul className="sh-skillhub-textos-list">
              <li className="sh-skillhub-paragrafos" data-aos="fade-right">
                A Skillhub é uma plataforma criada para facilitar os
                fornecimentos e as solicitações de serviços para todos.
                Funcionando 100% online, nós desejamos lhe proporcionar
                uma boa experiência de contratação de serviço e/ou do
                fornecimento dele.
              </li>
              <li className="sh-skillhub-paragrafos" data-aos="fade-left">
                Não somos somente uma plataforma, somos uma porta aberta
                para aqueles que desejam adquirir visibilidade fazendo
                aquilo de que gostam, também somos um facilitador para
                aqueles que desejam economizar tempo, chamando
                alguém para realizar um serviço.
              </li>
              <li className="sh-skillhub-paragrafos" data-aos="fade-right">
                Sendo cliente, você pode postar um serviço desejado e
                aguardar enquanto o divulgamos, até que um freelancer
                se interesse pelo trabalho e entre em contato para saber
                mais sobre o trabalho.
              </li>
              <li className="sh-skillhub-paragrafos" data-aos="fade-left">
                Sendo Freelancer, você encontrará serviços rápidos e bem
                remunerados perto da sua residência, facilitando tanto
                a sua vida quanto a vida de outras pessoas.
              </li>
            </ul>
          </article>
        </div>

        {/* Profissionais em destaque */}
        {/* <article className="sh-profissionaisEmDestaque" id='sh_profissionais_emDestaque'>
          <h2 className="sh-profissionaisEmDestaque-titulo" data-aos="zoom-in">Profissionais em destaque</h2>
          <div className="sh-profissionalEmDestaque-lista">
            <ProfissionaisEmDestaque dados={profDestaque} />
          </div>
        </article> */}
        <FreelancersEmDestaque freelancers={profDestaque}/>

        {/* Clientes em destaque */}
        <article className="sh-clientesEmDestaque" id='sh_clientes_emDestaque'>
          <h2 className="sh-clientesEmDestaque-titulo" data-aos="zoom-in">Clientes em destaque</h2>
          <div className="sh-clientesEmDestaque-lista">
            <ClientesEmDestaque dados={cliDestaque} />
          </div>
        </article>

        {/* Deseja ser um Freelancer? */}
        <article className="sh-show sh-main-planos" id='sh_planos'>
          <div className='sh-planos-titulos' data-aos="zoom-in">
            <h2 className="sh-planos-titulo">Deseja encontrar um cliente?</h2>
            <h2 className="sh-planos-subtitulo">Contrate um de nossos planos</h2>
          </div>

          <Planos />
        </article>

        {/* Vantagens de fazer parte do nosso time */}
        <article className="sh-main-vantagens" id='sh_vantagens'>
          <h2 className="sh-show sh-vantagens-titulo" data-aos="zoom-in">Vantagens de ser nosso cliente</h2>

          <ul className="sh-show sh-vantagens-lista" data-aos="zoom-in">
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
          <h2 className="sh-show sh-comecar-titulo" data-aos="zoom-in">Como começar</h2>

          <div className="sh-comecar-tipo">
            <ul className="sh-show sh-comecar-list" data-aos="fade-right">
              <li className="sh-comecar-tipo-titlulo">Cliente</li>
              <li className="sh-comecar-list-item">Clique em em um dos botões do site para realizar o cadastro ou acesse <Link to='/cadastro-cliente'>este link.</Link></li>
              <li className="sh-comecar-list-item">Selecione o tipo “<span className='sh-span-destaque'>Cliente</span>” para proseguir com o cadastro.</li>
              <li className="sh-comecar-list-item">Em cada tela, forneça os dados solicitados e clique em “<span className='sh-span-destaque'>Continuar</span>”.</li>
              <li className="sh-comecar-list-item">Na ultima tela, verifique se os dados fornecidcadastro-freelanceros estão corretos.</li>
              <li className="sh-comecar-list-item">Caso algum dado esteja incorreto clique nele para editar.</li>
              <li className="sh-comecar-list-item">Após realizar a verificação, clique em “<span className='sh-span-destaque'>Cadastrar</span>”.</li>
              <li className="sh-comecar-list-item">Pronto! Seu perfil foi criado e está pronto para ser utilizado.</li>
            </ul>

            <ul className="sh-show sh-comecar-list" data-aos="fade-left">
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

        {/* Últimos serviços postados */}
        {/* <article className="sh-main-servicos" id='sh_ultimas_postagens'>
          <h2 className="sh-show sh-servicos-titulo" data-aos="zoom-in">Últimos serviços postados</h2>

          <div className="sh-servicos-lista-container">
            <Servicos data={ultimosServicos} />
          </div>
        </article> */}

        {/* Servicos */}
        <ListaServicos
          servicos={ultimosServicos}
          tituloDaSessao="Últimos serviços postados"
          setLoading={setLoading}
          setMostraAlert={false}
        />

        {/* Dúvidas frequentes  */}
        <article className="sh-main-duvidas" id='sh_duvidas'>
          <h2 className="sh-show sh-duvidas-titulo" data-aos="zoom-in">Dúvidas frequentes</h2>

          <Accordion className='sh-show sh-duvidas-acordeon' data-aos="zoom-in">
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
      </section>

      <section className="sh-footer">
        <Footer usuario={0} />
      </section>
    </main>
  );
}

export default App;



