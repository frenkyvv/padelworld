import Link from "next/link";
import AppTabs from "@/app/componentes/AppTabs";
import FixedAmericanasAbrilResultsTable from "@/app/componentes/FixedAmericanasAbrilResultsTable";
import SvgBackground from "@/app/componentes/SvgBackground";
import { FIXED_AMERICANAS_ABRIL_TITLE } from "@/lib/fixedAmericanasAbril";
import "@/app/styles.css";

export default function FixedAmericanasAbrilResultadosPage() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">{FIXED_AMERICANAS_ABRIL_TITLE} - Tabla general</div>
      <AppTabs />
      <div className="subtitulo fixed-event-copy">
        Consulta aquí cómo va el puntaje acumulado de este rol fijo.
      </div>
      <div className="tablaTotal">
        <FixedAmericanasAbrilResultsTable />
      </div>
      <div className="botones compact-buttons">
        <Link
          href="/roles-fijos/americanas-abril"
          className="btn btn-outline-primary"
        >
          Volver al rol fijo
        </Link>
        <Link href="/" className="btn btn-link">
          Inicio
        </Link>
      </div>
    </div>
  );
}
