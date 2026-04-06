import Link from "next/link";
import AppTabs from "@/app/componentes/AppTabs";
import PlayerAccess from "@/app/componentes/PlayerAccess";
import SvgBackground from "@/app/componentes/SvgBackground";
import { TOURNAMENT_CONFIG } from "@/lib/padel";
import "./styles.css";

export default function Home() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Padel Score Americanas</div>
      <AppTabs />
      <div className="subtitulo">
        {TOURNAMENT_CONFIG.totalPlayers} jugadores,{" "}
        {TOURNAMENT_CONFIG.totalCourts} canchas,{" "}
        {TOURNAMENT_CONFIG.roundCount} rondas configuradas
      </div>
      <PlayerAccess />
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card shadow-sm mb-4 fixed-event-card">
          <div className="card-body text-center">
            <h2 className="h4 mb-2">Rol fijo para el próximo domingo</h2>
            <p className="text-muted mb-3">
              Ya cargamos el rol de juegos del Excel con sus jugadores. Solo
              falta abrir cada tarjeta y capturar el resultado.
            </p>
            <Link
              href="/roles-fijos/americanas-abril"
              className="btn btn-primary"
            >
              Abrir rol fijo
            </Link>
          </div>
        </div>
      </div>
      <div className="botones compact-buttons">
        <Link href="/rol" className="btn btn-outline-primary">
          Ver rol completo
        </Link>
        <Link href="/resultados" className="btn btn-outline-secondary">
          Ver resultados
        </Link>
        <Link
          href="/roles-fijos/americanas-abril/resultados"
          className="btn btn-outline-success"
        >
          Resultados rol fijo
        </Link>
      </div>
    </div>
  );
}
