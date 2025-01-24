'use client'

import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Asegúrate de ajustar la ruta según sea necesario
import { doc, getDoc } from "firebase/firestore";

const TablaResultados = ({ numero }) => {
  const [resultados, setResultados] = useState([]);
  const [totalPuntos, setTotalPuntos] = useState(0);

  useEffect(() => {
    const fetchResultados = async () => {
      const jugadorRef = doc(db, 'padel', `jugador${numero}`);
      const jugadorSnap = await getDoc(jugadorRef);

      if (jugadorSnap.exists()) {
        const data = jugadorSnap.data();
        const juegos = ['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8'];

        const results = juegos.map(juego => ({ juego, puntos: data[juego] || 0 }));
        setResultados(results);

        // Calcular la sumatoria de todos los puntos
        const total = results.reduce((acc, resultado) => acc + resultado.puntos, 0);
        setTotalPuntos(total);
      } else {
        console.log("No such document!");
      }
    };

    fetchResultados();
  }, [numero]);

  return (
    <div>
      <h3>Resultados de {numero}</h3>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            {resultados.map((resultado, index) => (
              <th key={index}>{resultado.juego.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {resultados.map((resultado, index) => (
              <td key={index}>{resultado.puntos}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={8} style={{ textAlign: 'center', fontWeight: 'bold' }}>Total de Puntos: {totalPuntos}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaResultados;
