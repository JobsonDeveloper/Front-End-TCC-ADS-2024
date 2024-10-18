import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

// Components
import WhatsAppImg from '../../assets/index/icons/icon-whatsapp.png';
import InstagramImg from '../../assets/index/icons/icon-instagram.png';

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <section className="sh-footer-element">
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

        <li className="sh-footer-info-item sh-footer-faleConosco">
          <h5 className="sh-faleConosco-title">Fale conosco</h5>
          <p className="sh-faleConosco-text">skillhub@gmail.com</p>
          <div className="sh-faleConosco-redesSociais">
            <img src={InstagramImg} alt="Foto de instagram da skillhub" className="sh-footer-redesSociais-img" />
            <img src={WhatsAppImg} alt="Foto de whatsapp da skillhub" className="sh-footer-redesSociais-img" />
          </div>
        </li>

        <li className="sh-footer-info-item sh-footer-mapa">
          <h5 className="sh-footer-mapa-title">Mapa</h5>

          <ul className="sh-footer-mapa-list">
            <li className="sh-footer-mapa-item">
              <a href="#sh_home_header" className="sh-mapa-link">Home</a>
              {/* <Link to='/' >Home</Link> */}
            </li>

            <li className="sh-footer-mapa-item">
              <a href="#sh_planos" className="sh-mapa-link">Planos</a>
            </li>

            <li className="sh-footer-mapa-item">
              <a href="#sh_profissionais_emDestaque" className="sh-mapa-link">Profissionais em destaque</a>
            </li>

            <li className="sh-footer-mapa-item">
              <a href="#sh_clientes_emDestaque" className="sh-mapa-link">Clientes em destaque</a>
            </li>

            <li className="sh-footer-mapa-item">
              <a href="#sh_vantagens" className="sh-mapa-link">Vantagens de ser nosso cliente</a>
            </li>

            <li className="sh-footer-mapa-item">
              <a href="#sh_ultimas_postagens" className="sh-mapa-link">Últimos serviços postados</a>
            </li>

            <li className="sh-footer-mapa-item">
              <a href="#sh_comecar" className="sh-mapa-link">Como começar</a>
            </li>
            
            <li className="sh-footer-mapa-item">
              <a href="#sh_sobre_a_skillhub" className="sh-mapa-link">Oque é a Skillhub</a>
            </li>
            
            <li className="sh-footer-mapa-item">
              <a href='#sh_duvidas' className="sh-mapa-link">Dúvidas frequentes</a>
            </li>

            <li className="sh-footer-mapa-item">
              <Link to='/login' className="sh-mapa-link">Login</Link>
            </li>

            <li className="sh-footer-mapa-item">
              <Link to='/cadastro-freelancer' className="sh-mapa-link">Tornar-se um Freelancer</Link>
            </li>

            <li className="sh-footer-mapa-item">
              <Link to='/cadastro-cliente' className="sh-mapa-link">Tornar-se um Cliente</Link>
            </li>
          </ul>
        </li>

      </ul>

      <article className="sh-footer-copyright">
        Skillhub - {year} | &copy; - Todos os direitos reservados
      </article>
    </section>
  )
};

export default Footer;