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

  useEffect(() => {
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
              {/* <table className="table table-bordered text-center">
                <tbody>
                  <tr>
                    <td>
                      <Link href="/jugador1" className="d-block">
                        {nombres.jugador1}
                      </Link>
                    </td>
                    <td>
                      <Link href="/jugador2" className="d-block">
                        {nombres.jugador2}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link href="/jugador3" className="d-block">
                        {nombres.jugador3}
                      </Link>
                    </td>
                    <td>
                      <Link href="/jugador4" className="d-block">
                        {nombres.jugador4}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link href="/jugador5" className="d-block">
                        {nombres.jugador5}
                      </Link>
                    </td>
                    <td>
                      <Link href="/jugador6" className="d-block">
                        {nombres.jugador6}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link href="/jugador7" className="d-block">
                        {nombres.jugador7}
                      </Link>
                    </td>
                    <td>
                      <Link href="/jugador8" className="d-block">
                        {nombres.jugador8}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
