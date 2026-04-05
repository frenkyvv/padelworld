import Link from "next/link";
import AppTabs from "@/app/componentes/AppTabs";
import SvgBackground from "@/app/componentes/SvgBackground";
import TournamentRoleCatalog from "@/app/componentes/TournamentRoleCatalog";
import { TOURNAMENT_CONFIG } from "@/lib/padel";
import "../styles.css";

export default function RolPage() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Rol de Juegos</div>
      <AppTabs />
      <div className="subtitulo">
        Aquí ves el torneo completo, juego por juego, con las 5 canchas de cada
        ronda.
      </div>
      <div className="subtitulo">
        {TOURNAMENT_CONFIG.totalPlayers} jugadores,{" "}
        {TOURNAMENT_CONFIG.totalCourts} canchas,{" "}
        {TOURNAMENT_CONFIG.roundCount} rondas
      </div>
      <div className="tablaTotal">
        <TournamentRoleCatalog />
      </div>
      <div className="botones compact-buttons">
        <Link href="/" className="btn btn-link">
          Inicio
        </Link>
      </div>
    </div>
  );
}
