'use client'

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from "firebase/firestore";
import { getDefaultPlayerName, getTotalPoints } from '@/lib/padel';

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
          const total = getTotalPoints(data);
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
      <h5>Total de {nombre || getDefaultPlayerName(jugador)}: {totalPuntos}</h5>
    </div>
  );
};

export default SumaPuntos;
