import React from 'react';

import whatsappIcone from "../../assets/images/icons/whatsapp.svg";

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img
                    src="https://avatars3.githubusercontent.com/u/39287513?s=400&u=df7b082967137ba18fa8a9bf8fd8a4ea99dfa405&v=4"
                    alt="Lucas Almeida"
                />
                <div>
                    <strong>Lucas Almeida</strong>
                    <span>Matemática</span>
                </div>
            </header>
            <p>
                Apaixonado por cálculos e em encontrar o valor de X.
                <br /> <br />
                Matématica tá muito presente na nossa vida e é muito importante, o objetivo é te mostrar isso ou te deixar louco!
            </p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 27,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcone} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;