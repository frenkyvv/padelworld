'use client'

import '../styles.css';
import React from 'react';
import InputJuego from "../componentes/InputJuego";
import SumaPuntos from "../componentes/SumaPuntos";
import NombreJugador from "../componentes/NombreJugador";
import { GAME_NUMBERS, getGameLabel } from '@/lib/padel';

const JugadorGen = ({ numero, currentInput, nombre, onNombreComplete, onJuegoChange, onComplete }) => {
  const selectedGameNumber =
    GAME_NUMBERS.find((gameNumber) => getGameLabel(gameNumber) === currentInput) || 1;

  return (
    <>
      <NombreJugador jugador={`jugador${numero}`} onComplete={onNombreComplete} /> {/* Incluir el componente */}
      
      <div className="dropdown">
        <label htmlFor={`juegoSelect${numero}`} className="form-label">Selecciona un juego</label>
        <select className="form-select" id={`juegoSelect${numero}`} value={currentInput} onChange={onJuegoChange}>
          {GAME_NUMBERS.map((gameNumber) => (
            <option key={gameNumber} value={getGameLabel(gameNumber)}>
              {getGameLabel(gameNumber)}
            </option>
          ))}
        </select>
      </div>

      <div className="subtitulo">
        <div className="inputs">
          <InputJuego
            jugador={`jugador${numero}`}
            onComplete={onComplete}
            gameNumber={selectedGameNumber}
            key={`${nombre}-input${selectedGameNumber}`}
          />
        </div>
      </div>

      <SumaPuntos jugador={`jugador${numero}`} />
      
    </>
  );
};

export default JugadorGen;
