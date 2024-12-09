'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { doc, getDoc } from "firebase/firestore";

const SumaPuntos = ({ jugador }) => {
  const [totalPuntos, setTotalPuntos] = useState(0);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jugadorRef = doc(db, "padel", jugador);
        const docSnap = await getDoc(jugadorRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const total = (data.j1 || 0) + (data.j2 || 0) + (data.j3 || 0) + (data.j4 || 0) + (data.j5 || 0) + (data.j6 || 0) + (data.j7 || 0) + (data.j8 || 0);
          setTotalPuntos(total);
          if (data.nombre) {
            setNombre(data.nombre);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error al obtener los puntos: ", error);
      }
    };

    fetchData();
  }, [jugador]);

  return (
    <div className="total-puntos">
      <h5>Total de {nombre || jugador.charAt(0).toUpperCase() + jugador.slice(1)}: {totalPuntos}</h5>
    </div>
  );
};

export default SumaPuntos;
