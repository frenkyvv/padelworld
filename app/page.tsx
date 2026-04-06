import Link from "next/link";
import AppTabs from "@/app/componentes/AppTabs";
import SvgBackground from "@/app/componentes/SvgBackground";
import "./styles.css";

export default function Home() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Padel Score Americanas</div>
      <AppTabs />
      <div className="container fixed-home-wrap">
        <div className="card shadow-sm mb-4 fixed-event-card fixed-home-card">
          <div className="card-body text-center">
            <h2 className="h4 mb-2">Americanas del próximo domingo</h2>
            <p className="text-muted mb-3">
              Ya está cargado el rol fijo del Excel con todos sus jugadores.
              Desde aquí puedes abrir el rol de juegos o revisar la tabla
              general de este evento.
            </p>
            <div className="botones compact-buttons">
              <Link
                href="/roles-fijos/americanas-abril"
                className="btn btn-primary"
              >
                Ver rol fijo
              </Link>
              <Link
                href="/roles-fijos/americanas-abril/resultados"
                className="btn btn-outline-success"
              >
                Ver tabla general
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
