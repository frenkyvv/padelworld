'use client'

import '../styles.css';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import InputJuego1 from "../componentes/InputJuego1";
import InputJuego2 from "../componentes/InputJuego2";
import InputJuego3 from "../componentes/InputJuego3";
import InputJuego4 from "../componentes/InputJuego4";
import InputJuego5 from "../componentes/InputJuego5";
import InputJuego6 from "../componentes/InputJuego6";
import InputJuego7 from "../componentes/InputJuego7";
import InputJuego8 from "../componentes/InputJuego8";
import SumaPuntos from "../componentes/SumaPuntos";
import TablaResultados from "../componentes/TablaResultados";
import TablaTodosJugadores from '../componentes/TablaTodosJugadores';

export default function Jugador2() {
  const [currentInput, setCurrentInput] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedInput = localStorage.getItem('currentInputJugador2');
      return savedInput ? parseInt(savedInput, 10) : 1;
    }
    return 1;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentInputJugador2', currentInput.toString());
    }
  }, [currentInput]);

  const handleCompleteJuego1 = () => {
    setCurrentInput(2);
  };

  const handleCompleteJuego2 = () => {
    setCurrentInput(3);
  };

  const handleCompleteJuego3 = () => {
    setCurrentInput(4);
  };

  const handleCompleteJuego4 = () => {
    setCurrentInput(5);
  };

  const handleCompleteJuego5 = () => {
    setCurrentInput(6);
  };

  const handleCompleteJuego6 = () => {
    setCurrentInput(7);
  };

  const handleCompleteJuego7 = () => {
    setCurrentInput(8);
  };

  const handleCompleteJuego8 = () => {
    alert('Todos los juegos registrados');
    setCurrentInput(1);
  };

  return (
    <div className="topcontainer">
      <div className="titulo">Jugador 2</div>
      <div className="subtitulo">
        {currentInput === 1 && <div className="inputs"><InputJuego1 jugador="jugador2" onComplete={handleCompleteJuego1} /></div>}
        {currentInput === 2 && <div className="inputs"><InputJuego2 jugador="jugador2" onComplete={handleCompleteJuego2} /></div>}
        {currentInput === 3 && <div className="inputs"><InputJuego3 jugador="jugador2" onComplete={handleCompleteJuego3} /></div>}
        {currentInput === 4 && <div className="inputs"><InputJuego4 jugador="jugador2" onComplete={handleCompleteJuego4} /></div>}
        {currentInput === 5 && <div className="inputs"><InputJuego5 jugador="jugador2" onComplete={handleCompleteJuego5} /></div>}
        {currentInput === 6 && <div className="inputs"><InputJuego6 jugador="jugador2" onComplete={handleCompleteJuego6} /></div>}
        {currentInput === 7 && <div className="inputs"><InputJuego7 jugador="jugador2" onComplete={handleCompleteJuego7} /></div>}
        {currentInput === 8 && <div className="inputs"><InputJuego8 jugador="jugador2" onComplete={handleCompleteJuego8} /></div>}
      </div>
      <SumaPuntos jugador="jugador2" />
      <TablaResultados jugador="jugador2" />
      <TablaTodosJugadores/>
      <div className="link"><Link href="/">Home</Link></div>
    </div>
  );
}
