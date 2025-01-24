"use client";

import "../app/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { db } from "../firebase"; // Ajusta la ruta según la ubicación de tu archivo
import { doc, getDoc } from "firebase/firestore";
import TablaTodosJugadores from "../app/componentes/TablaTodosJugadores"; // Importar el componente correcto
import SvgBackground from "../app/componentes/SvgBackground"; // Importar el componente SVG
import JuegoSelector from "../app/componentes/JuegoSelector"

interface Nombres {
  jugador1: string;
  jugador2: string;
  jugador3: string;
  jugador4: string;
  jugador5: string;
  jugador6: string;
  jugador7: string;
  jugador8: string;
}

const jugadores = [
  "jugador1",
  "jugador2",
  "jugador3",
  "jugador4",
  "jugador5",
  "jugador6",
  "jugador7",
  "jugador8",
];

export default function Home() {
  const [nombres, setNombres] = useState<Nombres>({
    jugador1: "Jugador 1",
    jugador2: "Jugador 2",
    jugador3: "Jugador 3",
    jugador4: "Jugador 4",
    jugador5: "Jugador 5",
    jugador6: "Jugador 6",
    jugador7: "Jugador 7",
    jugador8: "Jugador 8",
  });

  const fetchNombres = async () => {
    const nombresTemp = { ...nombres };
    for (const jugador of jugadores) {
      const jugadorRef = doc(db, "padel", jugador);
      const docSnap = await getDoc(jugadorRef);
      if (docSnap.exists() && docSnap.data().nombre) {
        nombresTemp[jugador as keyof Nombres] = docSnap.data().nombre;
      }
    }
    setNombres(nombresTemp);
  };

  useEffect(() => {
    fetchNombres();
  }, []);

  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Padel Score Americanas</div>
      
      <div className="tablaTotal">
        <JuegoSelector/>
        <TablaTodosJugadores />
      </div>
      <div className="tablaTotal">
        <div className="container mt-5">
          <div className="row">
            <div className="col">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
