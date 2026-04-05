'use client'

import React from 'react';
import { db } from '@/lib/firebase';
import { deleteField, doc, setDoc } from "firebase/firestore";
import { GAME_FIELDS, PLAYER_IDS } from '@/lib/padel';

const ResetDatos = () => {

  const resetData = async () => {
    for (const jugador of PLAYER_IDS) {
      // Resetear valores en localStorage
      for (const gameField of GAME_FIELDS) {
        localStorage.setItem(`${jugador}-juego${gameField.slice(1)}`, '0');
      }
      localStorage.removeItem(`currentInput${jugador.charAt(0).toUpperCase() + jugador.slice(1)}`);

      // Resetear valores en Firestore
      try {
        const jugadorRef = doc(db, "padel", jugador);
        await setDoc(jugadorRef, {
          ...GAME_FIELDS.reduce(
            (accumulator, field) => ({ ...accumulator, [field]: deleteField() }),
            {},
          ),
        }, { merge: true });
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
