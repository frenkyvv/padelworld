import Link from "next/link";
import JuegoSelector from "@/app/componentes/JuegoSelector";
import SvgBackground from "@/app/componentes/SvgBackground";
import { TOURNAMENT_CONFIG } from "@/lib/padel";
import "../styles.css";

export default function RolPage() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Rol de Juegos</div>
      <div className="subtitulo">
        Cada cancha se abre como una tarjeta individual. Cuando alguien guarda
        el resultado, ese partido queda bloqueado para los otros jugadores.
      </div>
      <div className="subtitulo">
        {TOURNAMENT_CONFIG.totalPlayers} jugadores,{" "}
        {TOURNAMENT_CONFIG.totalCourts} canchas,{" "}
        {TOURNAMENT_CONFIG.roundCount} rondas
      </div>
      <div className="tablaTotal">
        <JuegoSelector />
      </div>
      <div className="botones">
        <Link href="/resultados" className="btn btn-outline-primary">
          Ver resultados
        </Link>
        <Link href="/" className="btn btn-link">
          Inicio
        </Link>
      </div>
    </div>
  );
}
