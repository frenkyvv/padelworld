'use client'

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import { GAME_FIELDS, PLAYER_IDS, getDefaultPlayerName } from '@/lib/padel';

const ModificarPuntuacion = () => {
  const [selectedJugador, setSelectedJugador] = useState(PLAYER_IDS[0]);
  const [selectedJuego, setSelectedJuego] = useState(GAME_FIELDS[0]);
  const [cantidad, setCantidad] = useState('');

  const handleUpdate = async () => {
    if (cantidad === '' || isNaN(cantidad)) {
      alert('Por favor, ingrese una cantidad válida.');
      return;
    }

    try {
      const jugadorRef = doc(db, "padel", selectedJugador);
      await setDoc(jugadorRef, {
        [selectedJuego]: Number(cantidad)
      }, { merge: true });
      alert(`Puntos actualizados para ${selectedJugador.toUpperCase()} en ${selectedJuego.toUpperCase()}: ${cantidad}`);
      setCantidad('');
    } catch (error) {
      console.error("Error al actualizar los puntos: ", error);
      alert('Error al actualizar los puntos.');
    }
  };

  return (
    <div className="subtitulo">
    <div className="container mt-5">
      <h3>Modificar Puntuación</h3>
      <div className="mb-3">
        <label htmlFor="jugadorSelect" className="form-label">Seleccionar Jugador</label>
        <select 
          id="jugadorSelect" 
          className="form-select"
          value={selectedJugador}
          onChange={(e) => setSelectedJugador(e.target.value)}
        >
          {PLAYER_IDS.map((jugador) => (
            <option key={jugador} value={jugador}>
              {getDefaultPlayerName(jugador)}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="juegoSelect" className="form-label">Seleccionar Juego</label>
        <select 
          id="juegoSelect" 
          className="form-select"
          value={selectedJuego}
          onChange={(e) => setSelectedJuego(e.target.value)}
        >
          {GAME_FIELDS.map((juego) => (
            <option key={juego} value={juego}>
              {juego.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="cantidadInput" className="form-label">Cantidad</label>
        <input 
          type="text" 
          id="cantidadInput" 
          className="form-control" 
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ingrese la cantidad"
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>Actualizar Puntos</button>
    </div>
    </div>
  );
};

export default ModificarPuntuacion;
