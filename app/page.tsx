import JuegoSelector from "@/app/componentes/JuegoSelector";
import SvgBackground from "@/app/componentes/SvgBackground";
import TablaTodosJugadores from "@/app/componentes/TablaTodosJugadores";
import "./styles.css";

export default function Home() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Padel Score Americanas</div>

      <div className="tablaTotal">
        <JuegoSelector />
        <TablaTodosJugadores />
      </div>
    </div>
  );
}
