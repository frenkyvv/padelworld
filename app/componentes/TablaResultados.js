'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { doc, getDoc } from "firebase/firestore";

const TablaResultados = ({ jugador }) => {
  const [resultados, setResultados] = useState({
    j1: 0,
    j2: 0,
    j3: 0,
    j4: 0,
    j5: 0,
    j6: 0,
    j7: 0,
    j8: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jugadorRef = doc(db, "padel", jugador);
        const docSnap = await getDoc(jugadorRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const filteredData = {
            j1: data.j1 || 0,
            j2: data.j2 || 0,
            j3: data.j3 || 0,
            j4: data.j4 || 0,
            j5: data.j5 || 0,
            j6: data.j6 || 0,
            j7: data.j7 || 0,
            j8: data.j8 || 0,
          };
          setResultados(filteredData);
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
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center">Jugador</th>
            {Object.keys(resultados).map((juego) => (
              <th scope="col" className="text-center" key={juego}>{juego.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{jugador.charAt(0).toUpperCase() + jugador.slice(1)}</td>
            {Object.values(resultados).map((puntos, index) => (
              <td className="text-center" key={index}>{puntos}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaResultados;
