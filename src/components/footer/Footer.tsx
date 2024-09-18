import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

// Components
import WhatsAppImg from '../../assets/icons/WhatsApp.svg';
import InstagramImg from '../../assets/icons/Instagram.svg';

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <section className="sh-footer">
      <ul className="sh-footer-info">
        <li className="sh-footer-info-item sh-footer-fundadores">
          <h5 className="sh-fundadores-title">Fundadores</h5>

          <ul className="sh-fundadores-list">
            <li className="sh-fundadores-nome">Igor Filipe</li>
            <li className="sh-fundadores-nome">Marlom Rafael</li>
            <li className="sh-fundadores-nome">Carlos Eduardo</li>
            <li className="sh-fundadores-nome">Joseph Santos</li>
            <li className="sh-fundadores-nome">Renata Selva</li>
            <li className="sh-fundadores-nome">Renan Brandão</li>
            <li className="sh-fundadores-nome">Nedson Manuel</li>
            <li className="sh-fundadores-nome">Jobson Oliveira</li>
          </ul>
        </li>
        
        <li className="sh-footer-info-item sh-footer-redesSociais">
          <img src={InstagramImg} alt="Foto de instagram da skillhub" className="sh-footer-redesSociais-img" />
          <img src={WhatsAppImg} alt="Foto de whatsapp da skillhub" className="sh-footer-redesSociais-img" />
        </li>

        <li className="sh-footer-info-item sh-footer-email">
          <h5 className="sh-email-title">Email</h5>
          <p className="sh-email-text">skillhub@gmail.com</p>
        </li>

        <li className="sh-footer-info-item sh-footer-mapa">
          <h5 className="sh-footer-mapa-title">Mapa</h5>

          <ul className="sh-footer-mapa-list">
            <li className="sh-footer-mapa-item">
              <Link to='/' className="sh-mapa-link">Home</Link>
            </li>
            <li className="sh-footer-mapa-item">
              <a href="#sh_ultimas_postagens" className="sh-mapa-link">Últimas postágens</a>
            </li>
            <li className="sh-footer-mapa-item">
              <a href="#sh_planos" className="sh-mapa-link">Planos</a>
            </li>
            <li className="sh-footer-mapa-item">
              <a href="#sh_vantagens" className="sh-mapa-link">Vantágens</a>
            </li>
            <li className="sh-footer-mapa-item">
              <a href="#sh_comecar" className="sh-mapa-link">Como começar</a>
            </li>
            <li className="sh-footer-mapa-item">
              <a href="#sh_profissionais_emDestaque" className="sh-mapa-link">Profissionais em destaque</a>
            </li>
            <li className="sh-footer-mapa-item">
              <Link to='/sobrenos' className="sh-mapa-link">Sobre nós</Link>
            </li>
            <li className="sh-footer-mapa-item">
              <Link to='/duvidas' className="sh-mapa-link">Dúvidas</Link>
            </li>
            <li className="sh-footer-mapa-item">
              <Link to='/login' className="sh-mapa-link">Login</Link>
            </li>
            <li className="sh-footer-mapa-item">
              <Link to='/cadastro-cliente' className="sh-mapa-link">Ser Cliente</Link>
            </li>
            <li className="sh-footer-mapa-item">
              <Link to='/cadastro-freelancer' className="sh-mapa-link">Ser Freelancer</Link>
            </li>
          </ul>
        </li>
      </ul>

      <article className="sh-footer-copyright">
        Sabedoria é saber que sempre seremos eternos aprendizes | Skillhub - {year} | &copy; - Todos os direitos reservados
      </article>
    </section>
  )
};

export default Footer;