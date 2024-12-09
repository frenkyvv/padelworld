'use client'

import '../app/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import TablaTodosJugadores from "../app/componentes/TablaTodosJugadores"; // Importar el componente correcto

export default function Home() {
  return (
    <div className="topcontainer">
      <div className="titulo">Padel Score Americanas</div>
      
      <div className="tablaTotal">
        <TablaTodosJugadores />
      </div> 
      <div className="tablaTotal">
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <table className="table table-bordered text-center">
              <tbody>
                <tr>
                  <td><Link href="/jugador1" className="d-block">Jugador 1</Link></td>
                  <td><Link href="/jugador2" className="d-block">Jugador 2</Link></td>
                </tr>
                <tr>
                  <td><Link href="/jugador3" className="d-block">Jugador 3</Link></td>
                  <td><Link href="/jugador4" className="d-block">Jugador 4</Link></td>
                </tr>
                <tr>
                  <td><Link href="/jugador5" className="d-block">Jugador 5</Link></td>
                  <td><Link href="/jugador6" className="d-block">Jugador 6</Link></td>
                </tr>
                <tr>
                  <td><Link href="/jugador7" className="d-block">Jugador 7</Link></td>
                  <td><Link href="/jugador8" className="d-block">Jugador 8</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
