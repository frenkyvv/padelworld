'use client'

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { PLAYER_IDS } from '@/lib/padel';

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
      await updateDoc(jugadorRef, { nombre });
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
                  <option value="jugador1">Jugador 1</option>
                  <option value="jugador2">Jugador 2</option>
                  <option value="jugador3">Jugador 3</option>
                  <option value="jugador4">Jugador 4</option>
                  <option value="jugador5">Jugador 5</option>
                  <option value="jugador6">Jugador 6</option>
                  <option value="jugador7">Jugador 7</option>
                  <option value="jugador8">Jugador 8</option>
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
