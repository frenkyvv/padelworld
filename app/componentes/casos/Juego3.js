'use client'

import React, { useState } from 'react';
import { db } from '../../../firebase'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo
import { doc, runTransaction } from "firebase/firestore";

const Juego3 = ({ jugadores }) => {
  const [resultados, setResultados] = useState({
    jugador1: '',
    jugador2: '',
    jugador3: '',
    jugador4: '',
    jugador5: '',
    jugador6: '',
    jugador7: '',
    jugador8: ''
  });

  const handleChange = (e, jugador) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Solo permite números enteros
      setResultados({
        ...resultados,
        [jugador]: value
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await runTransaction(db, async (transaction) => {
        for (const jugador in resultados) {
          if (resultados[jugador] !== '') {
            const jugadorRef = doc(db, "padel", jugador);
            transaction.update(jugadorRef, { j3: Number(resultados[jugador]) }); // Guardar en el campo correcto 'j3'
          }
        }
      });
      alert('Puntos registrados correctamente');
      window.location.reload();
    } catch (error) {
      console.error("Error al registrar los puntos: ", error);
    }
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="5" className="text-center">Cancha 1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{jugadores.jugador1 || 'jugador1'}</td>
            <td className="text-center">
              <input
                type="number"
                value={resultados.jugador1}
                onChange={(e) => handleChange(e, 'jugador1')}
                style={{ width: '60px' }}
              />
            </td>
            <td className="text-center">VS</td>
            <td className="text-center">
              <input
                type="number"
                value={resultados.jugador6}
                onChange={(e) => handleChange(e, 'jugador6')}
                style={{ width: '60px' }}
              />
            </td>
            <td className="text-center">{jugadores.jugador6 || 'jugador6'}</td>
          </tr>
          <tr>
            <td className="text-center">{jugadores.jugador4 || 'jugador4'}</td>
            <td className="text-center">
              <input
                type="number"
                value={resultados.jugador4}
                onChange={(e) => handleChange(e, 'jugador4')}
                style={{ width: '60px' }}
              />
            </td>
            <td className="text-center">VS</td>
            <td className="text-center">
              <input
                type="number"
                value={resultados.jugador7}
                onChange={(e) => handleChange(e, 'jugador7')}
                style={{ width: '60px' }}
              />
            </td>
            <td className="text-center">{jugadores.jugador7 || 'jugador7'}</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="5" className="text-center">Cancha 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{jugadores.jugador2 || 'jugador2'}</td>
            <td className="text-center">
              <input
                type="number"
                value={resultados.jugador2}
                onChange={(e) => handleChange(e, 'jugador2')}
                style={{ width: '60px' }}
              />
            </td>
            <td className="text-center">VS</td>
            <td className="text-center">
              <input
                type="number"
                value={resultados.jugador5}
                onChange={(e) => handleChange(e, 'jugador5')}
                style={{ width: '60px' }}
              />
            </td>
            <td className="text-center">{jugadores.jugador5 || 'jugador5'}</td>
          </tr>
          <tr>
            <td className="text-center">{jugadores.jugador3 || 'jugador3'}</td>
            <td className="text-center">
              <input
                type="number"
                value={resultados.jugador3}
                onChange={(e) => handleChange(e, 'jugador3')}
                style={{ width: '60px' }}
              />
            </td>
            <td className="text-center">VS</td>
            <td className="text-center">
              <input
                type="number"
                value={resultados.jugador8}
                onChange={(e) => handleChange(e, 'jugador8')}
                style={{ width: '60px' }}
              />
            </td>
            <td className="text-center">{jugadores.jugador8 || 'jugador8'}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>Registrar Puntos</button>
    </div>
  );
};

export default Juego3;
