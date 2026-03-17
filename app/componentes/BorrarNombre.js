'use client'

import '../styles.css';
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { PLAYER_IDS } from '@/lib/padel';

const BorrarNombre = () => {
  const [selectedJugador, setSelectedJugador] = useState(PLAYER_IDS[0]);
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
          {PLAYER_IDS.map((jugador) => (
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
