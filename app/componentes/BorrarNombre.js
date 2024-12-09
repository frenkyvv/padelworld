'use client'

import '../styles.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { doc, updateDoc } from "firebase/firestore";

const jugadores = [
  'jugador1', 'jugador2', 'jugador3', 'jugador4',
  'jugador5', 'jugador6', 'jugador7', 'jugador8'
];

const BorrarNombre = () => {
  const [selectedJugador, setSelectedJugador] = useState(jugadores[0]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const jugadorRef = doc(db, "padel", selectedJugador);
      await updateDoc(jugadorRef, { nombre: null });
      alert(`Nombre borrado para ${selectedJugador.toUpperCase()}`);
    } catch (error) {
      console.error("Error al borrar el nombre: ", error);
      alert('Error al borrar el nombre.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
    <div className="subtitulo">
      <h3>Borrar Nombre</h3>
      <div className="mb-3">
        <label htmlFor="jugadorSelect" className="form-label"></label>
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
      <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
        {loading ? 'Borrando...' : 'Borrar Nombre'}
      </button>
      </div>
    </div>
  );
};

export default BorrarNombre;
