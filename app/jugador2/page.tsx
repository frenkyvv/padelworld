'use client'

import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import TablaResultados from '../componentes/TablaResultados'; // Asegúrate de ajustar la ruta según sea necesario
import TablaTodosJugadores from '../componentes/TablaTodosJugadores';
import Link from 'next/link';
import { db } from '../../firebase'; // Asegúrate de ajustar la ruta según sea necesario
import { doc, getDoc } from "firebase/firestore";

export default function Jugador1() {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const fetchNombre = async () => {
      const jugadorRef = doc(db, 'padel', 'jugador2');
      const jugadorSnap = await getDoc(jugadorRef);
      if (jugadorSnap.exists()) {
        setNombre(jugadorSnap.data().nombre);
      } else {
        console.log("No such document!");
      }
    };

    fetchNombre();
  }, []);

  return (
    <div className="topcontainer">
      <div className="titulo">{nombre || 'Jugador 2'}</div> 
        <div className="subtitulo">
          <TablaResultados numero={2}/>
        </div>
      <TablaTodosJugadores/>
      <div className="link"><Link href="/">Rol de Juegos</Link></div>
    </div>
  );
}
