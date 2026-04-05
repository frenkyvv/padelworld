"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RoundCourtCards from "@/app/componentes/RoundCourtCards";
import {
  GAME_NUMBERS,
  PLAYER_IDS,
  getGameLabel,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

export default function TournamentRoleCatalog() {
  const [players, setPlayers] = useState<Partial<Record<PlayerId, string>>>({});
  const [playerDocuments, setPlayerDocuments] = useState<
    Partial<Record<PlayerId, PlayerDocument>>
  >({});

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "padel"));
        const playersById = new Map<string, PlayerDocument>();

        querySnapshot.forEach((playerDoc) => {
          playersById.set(playerDoc.id, playerDoc.data() as PlayerDocument);
        });

        setPlayers(
          PLAYER_IDS.reduce((accumulator, playerId) => {
            const player = playersById.get(playerId);
            return {
              ...accumulator,
              [playerId]: player?.nombre?.trim() || undefined,
            };
          }, {} as Partial<Record<PlayerId, string>>),
        );
        setPlayerDocuments(
          PLAYER_IDS.reduce((accumulator, playerId) => {
            const player = playersById.get(playerId);
            return {
              ...accumulator,
              [playerId]: player,
            };
          }, {} as Partial<Record<PlayerId, PlayerDocument>>),
        );
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    void fetchPlayers();
  }, []);

  return (
    <div className="catalog-grid">
      {GAME_NUMBERS.map((gameNumber) => (
        <section key={gameNumber} className="catalog-section">
          <div className="catalog-section-header">{getGameLabel(gameNumber)}</div>
          <RoundCourtCards
            gameNumber={gameNumber}
            players={players}
            playerDocuments={playerDocuments}
          />
        </section>
      ))}
    </div>
  );
}
