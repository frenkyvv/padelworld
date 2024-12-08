'use client'

import '../app/styles.css';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetDatos from "../app/componentes/ResetDatos";
import TablaTodosJugadores from "../app/componentes/TablaTodosJugadores"; // Importar el componente correcto

export default function Home() {
  return (
    <div className="topcontainer">
      <div className="titulo">Bienvenidos a Padel World Americanas</div>
      <div className="subtitulo">
        <div className="d-grid gap-2">
          <Link href="/jugador1/" passHref>
            <button className="btn btn-primary">Jugador 1</button>
          </Link>
          <Link href="/jugador2/" passHref>
            <button className="btn btn-primary">Jugador 2</button>
          </Link>
          <Link href="/jugador3/" passHref>
            <button className="btn btn-primary">Jugador 3</button>
          </Link>
          <Link href="/jugador4/" passHref>
            <button className="btn btn-primary">Jugador 4</button>
          </Link>
          <Link href="/jugador5/" passHref>
            <button className="btn btn-primary">Jugador 5</button>
          </Link>
          <Link href="/jugador6/" passHref>
            <button className="btn btn-primary">Jugador 6</button>
          </Link>
          <Link href="/jugador7/" passHref>
            <button className="btn btn-primary">Jugador 7</button>
          </Link>
          <Link href="/jugador8/" passHref>
            <button className="btn btn-primary">Jugador 8</button>
          </Link>
        </div>
       <div className="tablaTotal">
        <TablaTodosJugadores />
        </div> 
      </div>
      <ResetDatos />
    </div>
  );
}
