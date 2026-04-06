import Link from "next/link";
import AppTabs from "@/app/componentes/AppTabs";
import FixedAmericanasAbrilCompletedCatalog from "@/app/componentes/FixedAmericanasAbrilCompletedCatalog";
import SvgBackground from "@/app/componentes/SvgBackground";
import { FIXED_AMERICANAS_ABRIL_TITLE } from "@/lib/fixedAmericanasAbril";
import "@/app/styles.css";

export default function FixedAmericanasAbrilTerminadosPage() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">{FIXED_AMERICANAS_ABRIL_TITLE} - Juegos terminados</div>
      <AppTabs />
      <div className="subtitulo fixed-event-copy">
        Aquí se van acumulando las canchas que ya cerraron su marcador final.
      </div>
      <div className="botones compact-buttons top-actions">
        <Link
          href="/roles-fijos/americanas-abril"
          className="btn btn-outline-primary"
        >
          Volver a pendientes
        </Link>
        <Link
          href="/roles-fijos/americanas-abril/resultados"
          className="btn btn-outline-secondary"
        >
          Ver tabla general
        </Link>
      </div>
      <div className="tablaTotal">
        <FixedAmericanasAbrilCompletedCatalog />
      </div>
      <div className="botones compact-buttons">
        <Link
          href="/roles-fijos/americanas-abril"
          className="btn btn-outline-primary"
        >
          Volver a pendientes
        </Link>
        <Link
          href="/roles-fijos/americanas-abril/resultados"
          className="btn btn-outline-secondary"
        >
          Ver tabla general
        </Link>
      </div>
    </div>
  );
}
