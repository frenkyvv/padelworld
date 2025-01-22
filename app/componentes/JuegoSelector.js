'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import Juego1 from './casos/Juego1'; 
import Juego2 from './casos/Juego2';
import Juego3 from './casos/Juego3';
import Juego4 from './casos/Juego4';
import Juego5 from './casos/Juego5';
import Juego6 from './casos/Juego6';
import Juego7 from './casos/Juego7';
import Juego8 from './casos/Juego8';

const JuegoSelector = () => {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState('Juego 1');
  const [jugadores, setJugadores] = useState({});

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "padel"));
        const jugadoresData = {};
        querySnapshot.forEach(doc => {
          jugadoresData[doc.id] = doc.data().nombre || doc.id;
        });
        setJugadores(jugadoresData);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    fetchJugadores();
  }, []);

  const handleJuegoChange = (e) => {
    setJuegoSeleccionado(e.target.value);
  };

  const renderTabla = () => {
    switch (juegoSeleccionado) {
      case 'Juego 1':
        return <Juego1 jugadores={jugadores} />;
      case 'Juego 2':
        return <Juego2 jugadores={jugadores} />;
      case 'Juego 3':
        return <Juego3 jugadores={jugadores} />;
      case 'Juego 4':
        return <Juego4 jugadores={jugadores} />;
      case 'Juego 5':
          return <Juego5 jugadores={jugadores} />;
      case 'Juego 6':
        return <Juego6 jugadores={jugadores} />;
      case 'Juego 7':
        return <Juego7 jugadores={jugadores} />;
      case 'Juego 8':
        return <Juego8 jugadores={jugadores} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <label htmlFor="juegoSelect" className="form-label">Selecciona un juego</label>
          <select className="form-select" id="juegoSelect" value={juegoSeleccionado} onChange={handleJuegoChange}>
            <option value="Juego 1">Juego 1</option>
            <option value="Juego 2">Juego 2</option>
            <option value="Juego 3">Juego 3</option>
            <option value="Juego 4">Juego 4</option>
            <option value="Juego 5">Juego 5</option>
            <option value="Juego 6">Juego 6</option>
            <option value="Juego 7">Juego 7</option>
            <option value="Juego 8">Juego 8</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          {renderTabla()}
        </div>
      </div>
    </div>
  );
};

export default JuegoSelector;
