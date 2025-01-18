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
import NombreJugador from "../componentes/NombreJugador";


export default function Jugador1() {
  const [currentInput, setCurrentInput] = useState(1);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const savedInput = window.localStorage.getItem('currentInputJugador1');
    if (savedInput) {
      setCurrentInput(parseInt(savedInput, 10));
    }

    const savedNombre = window.localStorage.getItem('nombreJugador1');
    if (savedNombre) {
      setNombre(savedNombre);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('currentInputJugador1', currentInput.toString());
  }, [currentInput]);

  useEffect(() => {
    window.localStorage.setItem('nombreJugador1', nombre);
  }, [nombre]);

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

  const handleNombreComplete = (nombre: string) => {
    setNombre(nombre);
  };

  return (
    <div className="topcontainer">
      <div className="titulo">{nombre || 'Jugador 1'}</div> {/* Mostrar el nombre */}
      <NombreJugador jugador="jugador1" onComplete={handleNombreComplete} /> {/* Incluir el componente */}
      <div className="subtitulo">
        {currentInput === 1 && <div className="inputs"><InputJuego1 jugador="jugador1" onComplete={handleCompleteJuego1} key={`${nombre}-input1`} /></div>}
        {currentInput === 2 && <div className="inputs"><InputJuego2 jugador="jugador1" onComplete={handleCompleteJuego2} key={`${nombre}-input2`} /></div>}
        {currentInput === 3 && <div className="inputs"><InputJuego3 jugador="jugador1" onComplete={handleCompleteJuego3} key={`${nombre}-input3`} /></div>}
        {currentInput === 4 && <div className="inputs"><InputJuego4 jugador="jugador1" onComplete={handleCompleteJuego4} key={`${nombre}-input4`} /></div>}
        {currentInput === 5 && <div className="inputs"><InputJuego5 jugador="jugador1" onComplete={handleCompleteJuego5} key={`${nombre}-input5`} /></div>}
        {currentInput === 6 && <div className="inputs"><InputJuego6 jugador="jugador1" onComplete={handleCompleteJuego6} key={`${nombre}-input6`} /></div>}
        {currentInput === 7 && <div className="inputs"><InputJuego7 jugador="jugador1" onComplete={handleCompleteJuego7} key={`${nombre}-input7`} /></div>}
        {currentInput === 8 && <div className="inputs"><InputJuego8 jugador="jugador1" onComplete={handleCompleteJuego8} key={`${nombre}-input8`} /></div>}
      </div>
      <SumaPuntos jugador="jugador1" />
      <TablaResultados jugador="jugador1" />
      <TablaTodosJugadores />
      <div className="link"><Link href="/">Home</Link></div>
    </div>
  );
}
