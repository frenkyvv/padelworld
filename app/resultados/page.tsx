import Link from "next/link";
import AppTabs from "@/app/componentes/AppTabs";
import SvgBackground from "@/app/componentes/SvgBackground";
import TablaTodosJugadores from "@/app/componentes/TablaTodosJugadores";
import "../styles.css";

export default function ResultadosPage() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Tabla General</div>
      <AppTabs />
      <div className="subtitulo">
        Consulta los puntos acumulados y el lugar actual de cada jugador.
      </div>
      <div className="tablaTotal">
        <TablaTodosJugadores />
      </div>
      <div className="botones compact-buttons">
        <Link
          href="/roles-fijos/americanas-abril/resultados"
          className="btn btn-outline-success"
        >
          Ver resultados del rol fijo
        </Link>
        <Link href="/" className="btn btn-link">
          Inicio
        </Link>
      </div>
    </div>
  );
}
