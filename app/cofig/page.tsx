import ConfigAccessPanel from "@/app/componentes/ConfigAccessPanel";
import SvgBackground from "@/app/componentes/SvgBackground";
import "../styles.css";

export default function Config() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Configuración</div>
      <ConfigAccessPanel />
    </div>
  );
}
