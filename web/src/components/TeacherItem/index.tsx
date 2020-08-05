import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item" >
      <header>
        <img src="https://avatars2.githubusercontent.com/u/1106206?s=460&u=9416ae1c58cca0b8c42b9b9006b6bf41119bc9df&v=4" alt="Avatar"/>
        <div>
          <strong>Nome Professor</strong>
          <span>Nada</span>
        </div>
      </header>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Eum voluptates obcaecati ipsam iste eos sit a odit maxime tempore quam? Suscipit atque pariatur ut temporibus minima saepe architecto placeat praesentium?
      </p>
      <footer>
        <p>
          Preço/Hora
          <strong>R$5,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whats"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;