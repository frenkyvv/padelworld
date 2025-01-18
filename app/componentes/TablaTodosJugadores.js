'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { collection, getDocs } from "firebase/firestore";
import Link from 'next/link';

const TablaTodosJugadores = () => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "padel"));
        const data = querySnapshot.docs.map((doc, index) => {
          const jugadorData = doc.data();
          const totalPuntos = [
            jugadorData.j1 || 0,
            jugadorData.j2 || 0,
            jugadorData.j3 || 0,
            jugadorData.j4 || 0,
            jugadorData.j5 || 0,
            jugadorData.j6 || 0,
            jugadorData.j7 || 0,
            jugadorData.j8 || 0
          ].reduce((acc, puntos) => acc + puntos, 0);

          return {
            nombre: doc.id ? doc.id.charAt(0).toUpperCase() + doc.id.slice(1) : `Jugador ${index + 1}`,
            ...jugadorData,
            totalPuntos
          };
        });
        setResultados(data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center">Jugador</th>
            <th scope="col" className="text-center"> 1</th>
            <th scope="col" className="text-center"> 2</th>
            <th scope="col" className="text-center"> 3</th>
            <th scope="col" className="text-center"> 4</th>
            <th scope="col" className="text-center"> 5</th>
            <th scope="col" className="text-center"> 6</th>
            <th scope="col" className="text-center"> 7</th>
            <th scope="col" className="text-center"> 8</th>
            <th scope="col" className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((jugador, index) => (
            <tr key={jugador.nombre || `jugador-${index}`}>
              <td className="text-center">
                <Link href={`/jugador${index + 1}`}>
                  {jugador.nombre || `J ${index + 1}`}
                </Link>
              </td>
              <td className="text-center">{jugador.j1 || 0}</td>
              <td className="text-center">{jugador.j2 || 0}</td>
              <td className="text-center">{jugador.j3 || 0}</td>
              <td className="text-center">{jugador.j4 || 0}</td>
              <td className="text-center">{jugador.j5 || 0}</td>
              <td className="text-center">{jugador.j6 || 0}</td>
              <td className="text-center">{jugador.j7 || 0}</td>
              <td className="text-center">{jugador.j8 || 0}</td>
              <td className="text-center">{jugador.totalPuntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaTodosJugadores;
