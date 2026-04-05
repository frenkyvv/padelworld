'use client'

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import { PLAYER_IDS, getDefaultPlayerName } from '@/lib/padel';

const NombreJugador = ({ jugador = null, onComplete = undefined } = {}) => {
  const [nombre, setNombre] = useState('');
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(jugador || PLAYER_IDS[0]);
  const [showInput, setShowInput] = useState(false);

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleSave = async () => {
    if (nombre.trim() === '') {
      alert('Por favor, ingrese un nombre válido.');
      return;
    }

    try {
      const jugadorRef = doc(db, "padel", jugadorSeleccionado);
      await setDoc(jugadorRef, { nombre }, { merge: true });
      alert(`Nombre de ${jugadorSeleccionado} guardado: ${nombre}`);
      onComplete?.();
      window.location.reload();
      setShowInput(false);
    } catch (error) {
      console.error("Error al guardar el nombre: ", error);
      alert('Error al guardar el nombre.');
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShowInput}>Modificar Nombre del Jugador</button>

      {showInput && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seleccione el jugador e ingrese su nombre</h5>
              </div>
              <div className="modal-body">
                <select 
                  className="form-select mb-3"
                  value={jugadorSeleccionado}
                  onChange={(e) => setJugadorSeleccionado(e.target.value)}
                >
                  {PLAYER_IDS.map((playerId) => (
                    <option key={playerId} value={playerId}>
                      {getDefaultPlayerName(playerId)}
                    </option>
                  ))}
                </select>
                <input 
                  type="text" 
                  className="form-control" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  placeholder="Nombre"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NombreJugador;
