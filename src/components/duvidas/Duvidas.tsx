import 'Duvidads.css';
import { Accordion } from 'react-bootstrap';
import React from "react";


const Duvidas = ({usuario}:any) => {
    <div>
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

            { usuario === 0 && <Accordion.Item eventKey="2" className='sh-duvidas-acordeon-item'>
                <Accordion.Header className='sh-duvidas-header'>Os clientes pagam para se cadastrar?</Accordion.Header>
                <Accordion.Body className='sh-acordeon-body'>
                    Para os clientes, a utilização da plataforma é 100%
                    gratuíta, o pagameto só será realizado ao freelancer
                    ao qual você deseja contratar para um determinado serviço.
                    O valor da remuneração do serviço é definido pelo cliente
                    no momento da postagem do mesmo.
                </Accordion.Body>
            </Accordion.Item>}

            <Accordion.Item eventKey="3" className='sh-duvidas-acordeon-item'>
                <Accordion.Header className='sh-duvidas-header'>Quais são os meios de pagamento para aderir a um plano?</Accordion.Header>
                <Accordion.Body className='sh-acordeon-body'>
                    ...
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
}

export default Duvidas;