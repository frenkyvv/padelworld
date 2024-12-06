'use client'

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { doc, updateDoc } from "firebase/firestore";

const ResetDatos = () => {

  const resetData = async () => {
    const jugadores = ['jugador1', 'jugador2', 'jugador3', 'jugador4', 'jugador5', 'jugador6', 'jugador7', 'jugador8']; // Añade más jugadores si es necesario

    for (const jugador of jugadores) {
      // Resetear valores en localStorage
      for (let i = 1; i <= 8; i++) {
        localStorage.setItem(`${jugador}-juego${i}`, '0');
      }
      localStorage.removeItem(`currentInput${jugador.charAt(0).toUpperCase() + jugador.slice(1)}`);

      // Resetear valores en Firestore
      try {
        const jugadorRef = doc(db, "padel", jugador);
        await updateDoc(jugadorRef, {
          j1: 0,
          j2: 0,
          j3: 0,
          j4: 0,
          j5: 0,
          j6: 0,
          j7: 0,
          j8: 0,
        });
      } catch (error) {
        console.error("Error al resetear los datos: ", error);
      }
    }
    alert('Datos de todos los jugadores reseteados correctamente');
  };

  return (
    <button className="btn btn-danger mt-3" onClick={resetData}>
      Reset Data
    </button>
  );
};

export default ResetDatos;
