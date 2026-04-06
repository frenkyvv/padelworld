import AppTabs from "@/app/componentes/AppTabs";
import ConfigModifierResultsPage from "@/app/componentes/ConfigModifierResultsPage";
import SvgBackground from "@/app/componentes/SvgBackground";
import "@/app/styles.css";

export default function ConfigModificarResultadosRoute() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Modificador de puntos</div>
      <AppTabs />
      <ConfigModifierResultsPage />
    </div>
  );
}
