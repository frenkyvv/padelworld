'use client'

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { doc, updateDoc } from "firebase/firestore";

const jugadores = [
  'jugador1', 'jugador2', 'jugador3', 'jugador4',
  'jugador5', 'jugador6', 'jugador7', 'jugador8'
];

const juegos = [
  'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8'
];

const ModificarPuntuacion = () => {
  const [selectedJugador, setSelectedJugador] = useState(jugadores[0]);
  const [selectedJuego, setSelectedJuego] = useState(juegos[0]);
  const [cantidad, setCantidad] = useState('');

  const handleUpdate = async () => {
    if (cantidad === '' || isNaN(cantidad)) {
      alert('Por favor, ingrese una cantidad válida.');
      return;
    }

    try {
      const jugadorRef = doc(db, "padel", selectedJugador);
      await updateDoc(jugadorRef, {
        [selectedJuego]: Number(cantidad)
      });
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
          {jugadores.map((jugador) => (
            <option key={jugador} value={jugador}>
              {jugador.charAt(0).toUpperCase() + jugador.slice(1)}
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
          {juegos.map((juego) => (
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
