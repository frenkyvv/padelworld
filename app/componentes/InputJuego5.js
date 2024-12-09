'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación de tu archivo
import { doc, updateDoc } from "firebase/firestore";

const InputJuego3 = ({ onComplete, jugador }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedValue = localStorage.getItem(`${jugador}-juego5`);
    if (savedValue) {
      setValue(savedValue);
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

        // Actualiza el campo j3 del documento del jugador en Firestore
        await updateDoc(jugadorRef, {
          j5: Number(value)
        });
        localStorage.setItem(`${jugador}-juego5`, value); // Guardar el valor en localStorage
        alert('Puntos registrados: ' + value);
        setValue(''); // Limpiar el campo después de enviar los datos
        setError(''); // Limpiar el mensaje de error
        onComplete(); // Notificar al componente padre
        window.location.reload();
      } catch (error) {
        console.error("Error al registrar los puntos: ", error);
        setError('Error al registrar los puntos.');
      }
    }
  };

  return (
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label htmlFor="juego5" className="col-form-label">Juego 5</label>
      </div>
      <div className="col-auto">
        <input 
          type="text" 
          id="juego5" 
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
  );
};

export default InputJuego3;
