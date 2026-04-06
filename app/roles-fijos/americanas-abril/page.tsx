import Link from "next/link";
import AppTabs from "@/app/componentes/AppTabs";
import FixedAmericanasAbrilCatalog from "@/app/componentes/FixedAmericanasAbrilCatalog";
import SvgBackground from "@/app/componentes/SvgBackground";
import {
  FIXED_AMERICANAS_ABRIL_GAME_NUMBERS,
  FIXED_AMERICANAS_ABRIL_PLAYERS,
  FIXED_AMERICANAS_ABRIL_TITLE,
} from "@/lib/fixedAmericanasAbril";
import "@/app/styles.css";

export default function FixedAmericanasAbrilPage() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">{FIXED_AMERICANAS_ABRIL_TITLE}</div>
      <AppTabs />
      <div className="subtitulo fixed-event-copy">
        Este rol ya viene precargado con los jugadores del Excel. Aquí solo se
        abren las tarjetas para capturar resultados.
      </div>
      <div className="subtitulo">
        {Object.keys(FIXED_AMERICANAS_ABRIL_PLAYERS).length} jugadores, 5
        canchas, {FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.length} juegos
      </div>
      <div className="tablaTotal">
        <FixedAmericanasAbrilCatalog />
      </div>
      <div className="botones compact-buttons">
        <Link
          href="/roles-fijos/americanas-abril/resultados"
          className="btn btn-outline-primary"
        >
          Ver tabla general
        </Link>
        <Link href="/" className="btn btn-link">
          Inicio
        </Link>
      </div>
    </div>
  );
}
