'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { doc, updateDoc, getDoc } from "firebase/firestore";

const NombreJugador = ({ jugador, onComplete }) => {
  const [nombre, setNombre] = useState('');
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    const checkNombre = async () => {
      const jugadorRef = doc(db, "padel", jugador);
      const docSnap = await getDoc(jugadorRef);
      if (docSnap.exists() && docSnap.data().nombre) {
        onComplete(docSnap.data().nombre);
        setShowInput(false);
      } else {
        setShowInput(true);
      }
    };

    checkNombre();
  }, [jugador, onComplete]);

  const handleSave = async () => {
    if (nombre.trim() === '') {
      alert('Por favor, ingrese un nombre válido.');
      return;
    }

    try {
      const jugadorRef = doc(db, "padel", jugador);
      await updateDoc(jugadorRef, { nombre });
      onComplete(nombre);
      setShowInput(false);
    } catch (error) {
      console.error("Error al guardar el nombre: ", error);
      alert('Error al guardar el nombre.');
    }
  };

  return (
    <>
      {showInput && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ingrese su nombre</h5>
              </div>
              <div className="modal-body">
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

NombreJugador.propTypes = {
  jugador: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default NombreJugador;
