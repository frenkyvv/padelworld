"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, doc, getDocs, runTransaction } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  PLAYER_IDS,
  getDefaultPlayerName,
  getDisplayPlayerName,
  getPlayerAssignments,
  getTotalPoints,
  normalizePlayerName,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

const SESSION_STORAGE_KEY = "padel-player-session";

interface PlayerSession {
  playerId: PlayerId;
  playerName: string;
}

interface RankedPlayer {
  id: PlayerId;
  displayName: string;
  totalPuntos: number;
}

export default function PlayerAccess() {
  const [name, setName] = useState("");
  const [session, setSession] = useState<PlayerSession | null>(null);
  const [playerDocuments, setPlayerDocuments] = useState<
    Partial<Record<PlayerId, PlayerDocument>>
  >({});
  const [rankedPlayers, setRankedPlayers] = useState<RankedPlayer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentPlayerDocument = session
    ? playerDocuments[session.playerId]
    : undefined;
  const assignments = useMemo(
    () => (session ? getPlayerAssignments(session.playerId) : []),
    [session],
  );

  const fetchPlayers = async () => {
    const querySnapshot = await getDocs(collection(db, "padel"));
    const playersById = new Map<string, PlayerDocument>();

    querySnapshot.forEach((playerDoc) => {
      playersById.set(playerDoc.id, playerDoc.data() as PlayerDocument);
    });

    const playerDocumentsMap = PLAYER_IDS.reduce((accumulator, playerId) => {
      const player = playersById.get(playerId);
      return {
        ...accumulator,
        [playerId]: player,
      };
    }, {} as Partial<Record<PlayerId, PlayerDocument>>);

    setPlayerDocuments(playerDocumentsMap);
    setRankedPlayers(
      PLAYER_IDS.map((playerId) => {
        const playerData = playersById.get(playerId) ?? {};

        return {
          id: playerId,
          displayName: getDisplayPlayerName(playerId, playerData),
          totalPuntos: getTotalPoints(playerData),
        };
      }).sort((leftPlayer, rightPlayer) => {
        if (rightPlayer.totalPuntos !== leftPlayer.totalPuntos) {
          return rightPlayer.totalPuntos - leftPlayer.totalPuntos;
        }

        return leftPlayer.displayName.localeCompare(rightPlayer.displayName);
      }),
    );
  };

  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession) as PlayerSession);
      } catch (parseError) {
        console.error("No se pudo leer la sesion guardada: ", parseError);
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }

    void fetchPlayers();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim().replace(/\s+/g, " ");
    if (!trimmedName) {
      setError("Escribe tu nombre para entrar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const playerSession = await runTransaction(db, async (transaction) => {
        const playerRefs = PLAYER_IDS.map((playerId) => doc(db, "padel", playerId));
        const playerSnapshots = await Promise.all(
          playerRefs.map((playerRef) => transaction.get(playerRef)),
        );

        const normalizedName = normalizePlayerName(trimmedName);
        const existingIndex = playerSnapshots.findIndex((snapshot) => {
          const existingName = snapshot.data()?.nombre;
          return (
            typeof existingName === "string" &&
            normalizePlayerName(existingName) === normalizedName
          );
        });

        if (existingIndex >= 0) {
          return {
            playerId: PLAYER_IDS[existingIndex],
            playerName:
              playerSnapshots[existingIndex].data()?.nombre?.trim() || trimmedName,
          } satisfies PlayerSession;
        }

        const availableIndex = playerSnapshots.findIndex((snapshot) => {
          const currentName = snapshot.data()?.nombre;
          return typeof currentName !== "string" || currentName.trim() === "";
        });

        if (availableIndex < 0) {
          throw new Error("Ya no hay lugares disponibles para nuevos jugadores.");
        }

        transaction.set(
          playerRefs[availableIndex],
          {
            nombre: trimmedName,
          },
          { merge: true },
        );

        return {
          playerId: PLAYER_IDS[availableIndex],
          playerName: trimmedName,
        } satisfies PlayerSession;
      });

      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
      setSession(playerSession);
      setName("");
      await fetchPlayers();
    } catch (submitError) {
      console.error("Error al registrar al jugador: ", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo registrar tu nombre.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setSession(null);
    setName("");
    setError("");
  };

  const currentPlayerPosition = session
    ? rankedPlayers.findIndex((player) => player.id === session.playerId) + 1
    : 0;

  if (!session) {
    return (
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h4 mb-3">Entrar al torneo</h2>
            <p className="text-muted">
              Escribe tu nombre para ocupar un lugar disponible y ver tus juegos
              asignados.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="playerName" className="form-label">
                  Nombre del jugador
                </label>
                <input
                  id="playerName"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ejemplo: Carlos"
                  autoComplete="name"
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <button className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Entrando..." : "Entrar con mi nombre"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 960 }}>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
            <div>
              <h2 className="h4 mb-1">
                Hola,{" "}
                {getDisplayPlayerName(
                  session.playerId,
                  currentPlayerDocument,
                )}
              </h2>
              <p className="mb-1 text-muted">
                Tu lugar asignado es {getDefaultPlayerName(session.playerId)}.
              </p>
              <p className="mb-0 text-muted">
                Vas en lugar {currentPlayerPosition || "-"} con{" "}
                {getTotalPoints(currentPlayerDocument ?? {})} puntos.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <Link href="/resultados" className="btn btn-outline-primary">
                Ver tabla general
              </Link>
              <button className="btn btn-link" onClick={handleLogout}>
                Cambiar de jugador
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="h5 mb-3">Tus juegos</h3>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Juego</th>
                  <th className="text-center">Cancha</th>
                  <th className="text-center">Pareja</th>
                  <th className="text-center">Rivales</th>
                  <th className="text-center">Tarjeta</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={`${assignment.gameNumber}-${assignment.courtNumber}`}>
                    <td className="text-center">{assignment.gameNumber}</td>
                    <td className="text-center">{assignment.courtLabel}</td>
                    <td className="text-center">
                      {getDisplayPlayerName(
                        assignment.partnerId,
                        playerDocuments[assignment.partnerId],
                      )}
                    </td>
                    <td className="text-center">
                      {getDisplayPlayerName(
                        assignment.opponentIds[0],
                        playerDocuments[assignment.opponentIds[0]],
                      )}
                      {" / "}
                      {getDisplayPlayerName(
                        assignment.opponentIds[1],
                        playerDocuments[assignment.opponentIds[1]],
                      )}
                    </td>
                    <td className="text-center">
                      <Link
                        href={`/rol/juego/${assignment.gameNumber}/cancha/${assignment.courtNumber}`}
                        className="btn btn-sm btn-primary"
                      >
                        Abrir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
