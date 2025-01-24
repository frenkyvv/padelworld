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

const BorrarTodosNombres = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      for (const jugador of jugadores) {
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
