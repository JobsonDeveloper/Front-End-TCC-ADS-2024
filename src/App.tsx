import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/header/Header';
import ImgApresentacao from './assets/imgDeConvite.svg'

function App() {
  return (
    <main className='sh-container'>
      <Header />

      <section className="sh-apresentacao">
        <article className="sh-apresentacao-container">
          <img src={ImgApresentacao} alt="" className="sh-apresentacao-img" />
        </article>
        <article className="sh-apresentacao-item">
          <h2 className="sh-apresentacao-title">Oque você procura está aqui!</h2>
          <p className="sh-apresentacao-text">Economize o seu tempo, seja cliente e contrate já um profissional</p>
          <a href="#" className='sh-apresentacao-link'>Cadastre-se</a>
        </article>
      </section>
    </main>

  );
}

export default App;
