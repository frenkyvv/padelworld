'use client'

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { deleteField, doc, setDoc } from "firebase/firestore";
import { GAME_FIELDS, PLAYER_IDS } from '@/lib/padel';

const ResetDatos = () => {
  const [loading, setLoading] = useState(false);

  const resetData = async () => {
    const confirmed = window.confirm(
      'Esto borrará nombres, puntajes y la sesión guardada en este navegador. ¿Deseas continuar?'
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    for (const jugador of PLAYER_IDS) {
      for (const gameField of GAME_FIELDS) {
        localStorage.removeItem(`${jugador}-juego${gameField.slice(1)}`);
      }
      localStorage.removeItem(`currentInput${jugador.charAt(0).toUpperCase() + jugador.slice(1)}`);
      localStorage.removeItem("padel-player-session");

      try {
        const jugadorRef = doc(db, "padel", jugador);
        await setDoc(jugadorRef, {
          nombre: deleteField(),
          ...GAME_FIELDS.reduce(
            (accumulator, field) => ({ ...accumulator, [field]: deleteField() }),
            {},
          ),
        }, { merge: true });
      } catch (error) {
        console.error("Error al resetear los datos: ", error);
      }
    }
    setLoading(false);
    alert('Torneo reseteado. Ya puedes probar desde cero.');
    window.location.href = "/";
  };

  return (
    <button className="btn btn-danger mt-3" onClick={resetData} disabled={loading}>
      {loading ? 'Reiniciando...' : 'Reiniciar torneo completo'}
    </button>
  );
};

export default ResetDatos;
