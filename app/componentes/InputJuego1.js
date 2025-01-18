'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase';
import { doc, updateDoc } from "firebase/firestore";

const InputJuego1 = ({ onComplete, jugador }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(`${jugador}-juego1`);
      if (savedValue) {
        setValue(savedValue);
      }
    }
  }, [jugador]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setValue(newValue);
      setError('');
    } else {
      setError('Por favor, ingrese solo números.');
    }
  };

  const handleSubmit = async () => {
    if (value === '') {
      setError('Por favor, ingrese un valor.');
    } else {
      try {
        const jugadorRef = doc(db, "padel", jugador);

        await updateDoc(jugadorRef, { j1: Number(value) });
        if (typeof window !== 'undefined') {
          localStorage.setItem(`${jugador}-juego1`, value);
        }
        alert('Puntos registrados: ' + value);
        setValue('');
        setError('');
        onComplete();
        window.location.reload();
      } catch (error) {
        console.error("Error al registrar los puntos: ", error);
        setError('Error al registrar los puntos.');
      }
    }
  };

  return (
    <div className="container">
      <div className="col g-3 align-items-center">
        <div className="col-auto align-items-center">
          <label htmlFor="juego1" className="col-form-label alig-items-center">Juego 1</label>
        </div>
        <div className="col-auto">
          <input 
            type="text" 
            id="juego1" 
            className="form-control" 
            value={value} 
            onChange={handleChange} 
            placeholder="Ingrese los puntos"
            aria-describedby="inputHelpInline"
          />
        </div>
        <div className="col-auto">
          {error && <div className="alert alert-danger" role="alert" id="inputHelpInline">{error}</div>}
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>Registrar Puntos</button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-4">
        </div>
      </div>
    </div>
  );
};

export default InputJuego1;
