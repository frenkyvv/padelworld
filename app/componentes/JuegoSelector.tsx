"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import JuegoTable from "@/app/componentes/JuegoTable";
import { db } from "@/lib/firebase";
import {
  GAME_NUMBERS,
  PLAYER_IDS,
  getGameLabel,
  type GameNumber,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

export default function JuegoSelector() {
  const [selectedGame, setSelectedGame] = useState<GameNumber>(1);
  const [players, setPlayers] = useState<Partial<Record<PlayerId, string>>>({});

  useEffect(() => {
    let isMounted = true;

    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "padel"));
        const playersById = new Map<string, PlayerDocument>();

        querySnapshot.forEach((playerDoc) => {
          playersById.set(playerDoc.id, playerDoc.data() as PlayerDocument);
        });

        if (!isMounted) {
          return;
        }

        setPlayers(
          PLAYER_IDS.reduce((accumulator, playerId) => {
            const player = playersById.get(playerId);
            return {
              ...accumulator,
              [playerId]: player?.nombre?.trim() || undefined,
            };
          }, {} as Partial<Record<PlayerId, string>>),
        );
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    void fetchPlayers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="titulo">
            <label htmlFor="juegoSelect" className="form-label">
              Selecciona un juego
            </label>
          </div>
          <select
            className="form-select"
            id="juegoSelect"
            value={selectedGame}
            onChange={(event) =>
              setSelectedGame(Number(event.target.value) as GameNumber)
            }
          >
            {GAME_NUMBERS.map((gameNumber) => (
              <option key={gameNumber} value={gameNumber}>
                {getGameLabel(gameNumber)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <JuegoTable gameNumber={selectedGame} players={players} />
        </div>
      </div>
    </div>
  );
}
