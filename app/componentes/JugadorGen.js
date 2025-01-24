'use client'

import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import InputJuego1 from "../componentes/InputJuego1";
import InputJuego2 from "../componentes/InputJuego2";
import InputJuego3 from "../componentes/InputJuego3";
import InputJuego4 from "../componentes/InputJuego4";
import InputJuego5 from "../componentes/InputJuego5";
import InputJuego6 from "../componentes/InputJuego6";
import InputJuego7 from "../componentes/InputJuego7";
import InputJuego8 from "../componentes/InputJuego8";
import SumaPuntos from "../componentes/SumaPuntos";
import NombreJugador from "../componentes/NombreJugador";

const JugadorGen = ({ numero, currentInput, nombre, onNombreComplete, onJuegoChange, onComplete }) => {
  return (
    <>
      <NombreJugador jugador={`jugador${numero}`} onComplete={onNombreComplete} /> {/* Incluir el componente */}
      
      <div className="dropdown">
        <label htmlFor={`juegoSelect${numero}`} className="form-label">Selecciona un juego</label>
        <select className="form-select" id={`juegoSelect${numero}`} value={currentInput} onChange={onJuegoChange}>
          <option value="Juego 1">Juego 1</option>
          <option value="Juego 2">Juego 2</option>
          <option value="Juego 3">Juego 3</option>
          <option value="Juego 4">Juego 4</option>
          <option value="Juego 5">Juego 5</option>
          <option value="Juego 6">Juego 6</option>
          <option value="Juego 7">Juego 7</option>
          <option value="Juego 8">Juego 8</option>
        </select>
      </div>

      <div className="subtitulo">
        {currentInput === 'Juego 1' && <div className="inputs"><InputJuego1 jugador={`jugador${numero}`} onComplete={onComplete} key={`${nombre}-input1`} /></div>}
        {currentInput === 'Juego 2' && <div className="inputs"><InputJuego2 jugador={`jugador${numero}`} onComplete={onComplete} key={`${nombre}-input2`} /></div>}
        {currentInput === 'Juego 3' && <div className="inputs"><InputJuego3 jugador={`jugador${numero}`} onComplete={onComplete} key={`${nombre}-input3`} /></div>}
        {currentInput === 'Juego 4' && <div className="inputs"><InputJuego4 jugador={`jugador${numero}`} onComplete={onComplete} key={`${nombre}-input4`} /></div>}
        {currentInput === 'Juego 5' && <div className="inputs"><InputJuego5 jugador={`jugador${numero}`} onComplete={onComplete} key={`${nombre}-input5`} /></div>}
        {currentInput === 'Juego 6' && <div className="inputs"><InputJuego6 jugador={`jugador${numero}`} onComplete={onComplete} key={`${nombre}-input6`} /></div>}
        {currentInput === 'Juego 7' && <div className="inputs"><InputJuego7 jugador={`jugador${numero}`} onComplete={onComplete} key={`${nombre}-input7`} /></div>}
        {currentInput === 'Juego 8' && <div className="inputs"><InputJuego8 jugador={`jugador${numero}`} onComplete={onComplete} key={`${nombre}-input8`} /></div>}
      </div>

      <SumaPuntos jugador={`jugador${numero}`} />
      
    </>
  );
};

export default JugadorGen;
