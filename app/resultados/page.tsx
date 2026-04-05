import Link from "next/link";
import SvgBackground from "@/app/componentes/SvgBackground";
import TablaTodosJugadores from "@/app/componentes/TablaTodosJugadores";
import "../styles.css";

export default function ResultadosPage() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Resultados</div>
      <div className="subtitulo">
        Esta vista es solo de consulta para ver puntos acumulados y posiciones.
      </div>
      <div className="tablaTotal">
        <TablaTodosJugadores />
      </div>
      <div className="botones">
        <Link href="/rol" className="btn btn-outline-primary">
          Ir al rol
        </Link>
        <Link href="/" className="btn btn-link">
          Inicio
        </Link>
      </div>
    </div>
  );
}
