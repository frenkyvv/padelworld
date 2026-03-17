import Link from "next/link";
import BorrarTodosNombres from "@/app/componentes/BorrarTodosNombres";
import ModificarPuntuacion from "@/app/componentes/ModificarPuntuacion";
import NombreJugador from "@/app/componentes/NombreJugador";
import ResetDatos from "@/app/componentes/ResetDatos";
import { PLAYER_IDS, getDefaultPlayerName } from "@/lib/padel";
import "../styles.css";

export default function Config() {
  return (
    <div className="topcontainer">
      <div className="titulo">Configuración</div>

      <ResetDatos />
      <div className="padd">
        <NombreJugador />
      </div>
      <div className="borrar">
        <BorrarTodosNombres />
      </div>
      <div className="subtitulo">
        <ModificarPuntuacion />
        <div className="subtitulo">
          <div className="d-grid gap-2">
            {PLAYER_IDS.map((playerId) => (
              <Link href={`/${playerId}`} key={playerId}>
                <button className="btn btn-primary">
                  {getDefaultPlayerName(playerId)}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
