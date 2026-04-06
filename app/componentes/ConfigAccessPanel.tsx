"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ResetDatos from "@/app/componentes/ResetDatos";
import ResetFixedAmericanasAbrilData from "@/app/componentes/ResetFixedAmericanasAbrilData";
import {
  CONFIG_ACCESS_PIN,
  CONFIG_SESSION_STORAGE_KEY,
} from "@/lib/padel";

export default function ConfigAccessPanel() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const savedSession =
      typeof window !== "undefined"
        ? localStorage.getItem(CONFIG_SESSION_STORAGE_KEY)
        : null;

    if (savedSession === "authorized") {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pin !== CONFIG_ACCESS_PIN) {
      setError("La clave de configuración no es correcta.");
      return;
    }

    localStorage.setItem(CONFIG_SESSION_STORAGE_KEY, "authorized");
    setIsAuthorized(true);
    setPin("");
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem(CONFIG_SESSION_STORAGE_KEY);
    setIsAuthorized(false);
    setPin("");
    setError("");
  };

  if (!isAuthorized) {
    return (
      <div className="container config-login-wrap">
        <div className="card shadow-sm config-card">
          <div className="card-body text-center">
            <h2 className="h4 mb-3">Entrar a configuración</h2>
            <p className="text-muted mb-3">
              Ingresa la clave de 4 dígitos para administrar el rol fijo.
            </p>
            <form onSubmit={handleSubmit} className="config-login-form">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                className="form-control text-center"
                value={pin}
                onChange={(event) =>
                  setPin(event.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="Clave de 4 dígitos"
                autoComplete="off"
              />
              {error && (
                <div className="alert alert-danger mb-0" role="alert">
                  {error}
                </div>
              )}
              <button className="btn btn-primary" type="submit">
                Entrar a cofig
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container config-panels">
      <div className="card shadow-sm config-card">
        <div className="card-body text-center">
          <h2 className="h4 mb-3">Rol fijo Americanas Abril</h2>
          <p className="text-muted mb-3">
            Modo administrador activo. Desde aquí puedes borrar marcadores y
            entrar a corregir tanto juegos pendientes como juegos terminados.
          </p>
          <div className="botones compact-buttons config-actions">
            <ResetFixedAmericanasAbrilData />
            <Link
              href="/cofig/modificar-resultados"
              className="btn btn-outline-primary"
            >
              Modificar resultados
            </Link>
            <Link
              href="/roles-fijos/americanas-abril/resultados"
              className="btn btn-outline-success"
            >
              Ver tabla general
            </Link>
            <button className="btn btn-link" onClick={handleLogout}>
              Cerrar sesión de cofig
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow-sm config-card">
        <div className="card-body text-center">
          <h2 className="h4 mb-3">Limpieza del torneo anterior</h2>
          <p className="text-muted mb-3">
            Este botón deja disponible el reinicio completo de los datos viejos
            por si todavía lo necesitas.
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
  );
}
