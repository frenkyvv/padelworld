import Link from "next/link";
import PlayerAccess from "@/app/componentes/PlayerAccess";
import SvgBackground from "@/app/componentes/SvgBackground";
import { TOURNAMENT_CONFIG } from "@/lib/padel";
import "./styles.css";

export default function Home() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Padel Score Americanas</div>
      <div className="subtitulo">
        {TOURNAMENT_CONFIG.totalPlayers} jugadores,{" "}
        {TOURNAMENT_CONFIG.totalCourts} canchas,{" "}
        {TOURNAMENT_CONFIG.roundCount} rondas configuradas
      </div>
      <PlayerAccess />
      <div className="botones">
        <Link href="/rol" className="btn btn-outline-primary">
          Ver rol completo
        </Link>
        <Link href="/resultados" className="btn btn-outline-secondary">
          Ver resultados
        </Link>
      </div>
    </div>
  );
}
