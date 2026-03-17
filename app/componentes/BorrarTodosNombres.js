'use client'

import '../styles.css';
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { PLAYER_IDS } from '@/lib/padel';

const BorrarTodosNombres = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      for (const jugador of PLAYER_IDS) {
        const jugadorRef = doc(db, "padel", jugador);
        await updateDoc(jugadorRef, { nombre: null });
      }
      alert('Nombres borrados para todos los jugadores.');
    } catch (error) {
      console.error("Error al borrar los nombres: ", error);
      alert('Error al borrar los nombres.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-danger" onClick={handleDeleteAll} disabled={loading}>
        {loading ? 'Borrando...' : 'Borrar Todos los Nombres'}
      </button>
    </div>
  
  );
};

export default BorrarTodosNombres;
