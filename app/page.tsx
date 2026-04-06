import Link from "next/link";
import AppTabs from "@/app/componentes/AppTabs";
import FixedAmericanasAbrilCurrentRound from "@/app/componentes/FixedAmericanasAbrilCurrentRound";
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
              Aquí se publica un juego a la vez. Cuando se completan todas las
              canchas del juego actual, la app libera automáticamente el
              siguiente.
            </p>
            <div className="botones compact-buttons top-actions">
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
            <FixedAmericanasAbrilCurrentRound />
          </div>
        </div>
      </div>
    </div>
  );
}
