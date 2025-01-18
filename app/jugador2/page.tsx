'use client'

import '../styles.css';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import JugadorGen from '../componentes/JugadorGen'; // Asegúrate de ajustar la ruta según sea necesario

export default function Jugador2() {
  const [currentInput, setCurrentInput] = useState('Juego 1');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const savedNombre = window.localStorage.getItem('nombreJugador2');
    if (savedNombre) {
      setNombre(savedNombre);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('nombreJugador2', nombre);
  }, [nombre]);

  const handleNombreComplete = (nombre: string) => {
    setNombre(nombre);
  };

  const handleJuegoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleComplete = () => {
    alert('Juego completado');
  };

  return (
    <div className="topcontainer">
      <div className="titulo">{nombre || 'Jugador 2'}</div> {/* Mostrar el nombre */}
      <JugadorGen 
        numero={2} 
        currentInput={currentInput}
        nombre={nombre}
        onNombreComplete={handleNombreComplete}
        onJuegoChange={handleJuegoChange}
        onComplete={handleComplete}
      />
      <div className="link"><Link href="/">Rol de Juegos</Link></div>
    </div>
  );
}
