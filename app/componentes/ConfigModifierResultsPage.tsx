"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FixedAmericanasAbrilCompletedCatalog from "@/app/componentes/FixedAmericanasAbrilCompletedCatalog";
import {
  CONFIG_SESSION_STORAGE_KEY,
} from "@/lib/padel";

export default function ConfigModifierResultsPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedSession =
      typeof window !== "undefined"
        ? localStorage.getItem(CONFIG_SESSION_STORAGE_KEY)
        : null;

    setIsAuthorized(savedSession === "authorized");
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  if (!isAuthorized) {
    return (
      <div className="container config-login-wrap">
        <div className="card shadow-sm config-card">
          <div className="card-body text-center">
            <h2 className="h4 mb-3">Acceso restringido</h2>
            <p className="text-muted mb-3">
              Primero entra a <code>/cofig</code> con la clave de administrador
              para poder modificar resultados.
            </p>
            <div className="botones compact-buttons config-actions">
              <Link href="/cofig" className="btn btn-primary">
                Ir a cofig
              </Link>
              <Link href="/" className="btn btn-link">
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="topcontainer">
      <div className="subtitulo fixed-event-copy">
        Aquí aparecen solo los juegos ya grabados y cerrados, listos para
        corregir su marcador.
      </div>
      <div className="botones compact-buttons top-actions">
        <Link href="/cofig" className="btn btn-outline-primary">
          Volver a cofig
        </Link>
        <Link
          href="/roles-fijos/americanas-abril/terminados"
          className="btn btn-outline-secondary"
        >
          Ver terminados públicos
        </Link>
      </div>
      <div className="tablaTotal">
        <FixedAmericanasAbrilCompletedCatalog
          ctaLabel="Modificar marcador"
          buildCourtHref={(gameNumber, courtNumber) =>
            `/roles-fijos/americanas-abril/juego/${gameNumber}/cancha/${courtNumber}?mode=admin`
          }
          emptyMessage="Todavía no hay juegos cerrados para modificar."
        />
      </div>
    </div>
  );
}
