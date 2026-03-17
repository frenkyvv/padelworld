"use client";

import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  getGameField,
  getGameLabel,
  type GameNumber,
  type PlayerId,
} from "@/lib/padel";

interface InputJuegoProps {
  gameNumber: GameNumber;
  jugador: PlayerId;
  onComplete?: () => void;
}

export default function InputJuego({
  gameNumber,
  jugador,
  onComplete,
}: InputJuegoProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedValue = localStorage.getItem(`${jugador}-juego${gameNumber}`);
    if (savedValue) {
      setValue(savedValue);
    }
  }, [gameNumber, jugador]);

  const handleChange = (nextValue: string) => {
    if (/^\d*$/.test(nextValue)) {
      setValue(nextValue);
      setError("");
      return;
    }

    setError("Por favor, ingrese solo numeros.");
  };

  const handleSubmit = async () => {
    if (value === "") {
      setError("Por favor, ingrese un valor.");
      return;
    }

    try {
      await updateDoc(doc(db, "padel", jugador), {
        [getGameField(gameNumber)]: Number(value),
      });

      localStorage.setItem(`${jugador}-juego${gameNumber}`, value);
      alert(`Puntos registrados: ${value}`);
      setValue("");
      setError("");
      onComplete?.();
      window.location.reload();
    } catch (submitError) {
      console.error("Error al registrar los puntos: ", submitError);
      setError("Error al registrar los puntos.");
    }
  };

  const inputId = `juego${gameNumber}`;

  return (
    <div className="container">
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor={inputId} className="col-form-label">
            {getGameLabel(gameNumber)}
          </label>
        </div>
        <div className="col-auto">
          <input
            type="text"
            id={inputId}
            className="form-control"
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            placeholder="Ingrese los puntos"
            aria-describedby={`${inputId}-help`}
          />
        </div>
        <div className="col-auto">
          {error && (
            <div
              className="alert alert-danger"
              role="alert"
              id={`${inputId}-help`}
            >
              {error}
            </div>
          )}
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Registrar Puntos
          </button>
        </div>
      </div>
    </div>
  );
}
