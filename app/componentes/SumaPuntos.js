'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { doc, getDoc } from "firebase/firestore";

const SumaPuntos = ({ jugador }) => {
  const [totalPuntos, setTotalPuntos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jugadorRef = doc(db, "padel", jugador);
        const docSnap = await getDoc(jugadorRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const total = data.j1 + data.j2 + data.j3 + data.j4 + data.j5 + data.j6 + data.j7 + data.j8;
          setTotalPuntos(total);
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
      <h5>Total: {totalPuntos}</h5>
    </div>
  );
};

export default SumaPuntos;
