import Link from "next/link";
import ResetDatos from "@/app/componentes/ResetDatos";
import ResetFixedAmericanasAbrilData from "@/app/componentes/ResetFixedAmericanasAbrilData";
import SvgBackground from "@/app/componentes/SvgBackground";
import "../styles.css";

export default function Config() {
  return (
    <div className="topcontainer">
      <SvgBackground />
      <div className="titulo">Configuración</div>
      <div className="container config-panels">
        <div className="card shadow-sm config-card">
          <div className="card-body text-center">
            <h2 className="h4 mb-3">Rol fijo Americanas Abril</h2>
            <p className="text-muted mb-3">
              Desde aquí puedes borrar sus marcadores o entrar a las pantallas
              donde se corrigen juegos pendientes y terminados.
            </p>
            <div className="botones compact-buttons config-actions">
              <ResetFixedAmericanasAbrilData />
              <Link
                href="/roles-fijos/americanas-abril"
                className="btn btn-outline-primary"
              >
                Modificar juegos pendientes
              </Link>
              <Link
                href="/roles-fijos/americanas-abril/terminados"
                className="btn btn-outline-secondary"
              >
                Modificar juegos terminados
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

        <div className="card shadow-sm config-card">
          <div className="card-body text-center">
            <h2 className="h4 mb-3">Limpieza del torneo anterior</h2>
            <p className="text-muted mb-3">
              Este botón deja disponible el reinicio completo de los datos
              viejos por si todavía lo necesitas.
            </p>
            <div className="botones compact-buttons config-actions">
              <ResetDatos />
              <Link href="/" className="btn btn-link">
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
