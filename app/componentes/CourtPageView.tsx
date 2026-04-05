"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import CourtResultCard from "@/app/componentes/CourtResultCard";
import { db } from "@/lib/firebase";
import {
  GAME_NUMBERS,
  PLAYER_IDS,
  getCourtForGame,
  getGameLabel,
  type GameNumber,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

interface CourtPageViewProps {
  gameNumber: GameNumber;
  courtNumber: number;
}

export default function CourtPageView({
  gameNumber,
  courtNumber,
}: CourtPageViewProps) {
  const [players, setPlayers] = useState<Partial<Record<PlayerId, string>>>({});
  const [playerDocuments, setPlayerDocuments] = useState<
    Partial<Record<PlayerId, PlayerDocument>>
  >({});
  const [refreshToken, setRefreshToken] = useState(0);

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
  }, [refreshToken]);

  const court = getCourtForGame(gameNumber, courtNumber);

  if (!court || !GAME_NUMBERS.includes(gameNumber)) {
    return (
      <div className="subtitulo">
        No se encontró la tarjeta solicitada.
      </div>
    );
  }

  return (
    <div className="topcontainer">
      <div className="titulo">
        {getGameLabel(gameNumber)} - {court.courtLabel}
      </div>
      <div className="subtitulo">
        Esta tarjeta muestra solo el partido de esta cancha.
      </div>
      <div className="container">
        <CourtResultCard
          court={court}
          gameNumber={gameNumber}
          players={players}
          playerDocuments={playerDocuments}
          onSaved={() => setRefreshToken((currentValue) => currentValue + 1)}
        />
      </div>
      <div className="botones">
        <Link href="/rol" className="btn btn-outline-primary">
          Volver al rol
        </Link>
      </div>
    </div>
  );
}
