'use client'

import '../styles.css';
import ResetDatos from '../componentes/ResetDatos';
import ModificarPuntuacion from '../componentes/ModificarPuntuacion';
import BorrarNombre from '../componentes/BorrarNombre';
import BorrarTodosNombres from '../componentes/BorrarTodosNombres';
import Link from 'next/link';

export default function Config () {
    return (
    <div className="topcontainer">
    <div className="titulo">Configuration</div>
    <div className="botones">
    <ResetDatos />
    <BorrarTodosNombres/>
    <BorrarNombre />
    </div>
    <div className="subtitulo">
      <ModificarPuntuacion/>
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
        </div>
    </div>
    </div>
    )
}