"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import CourtResultCard from "@/app/componentes/CourtResultCard";
import { db } from "@/lib/firebase";
import { type GameNumber, type PlayerDocument, type PlayerId } from "@/lib/padel";
import {
  FIXED_AMERICANAS_ABRIL_EVENT_ID,
  FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH,
  FIXED_AMERICANAS_ABRIL_PLAYERS,
  FIXED_AMERICANAS_ABRIL_TITLE,
  getFixedAmericanasAbrilCourt,
  getFixedAmericanasAbrilPlayerDocumentsMap,
} from "@/lib/fixedAmericanasAbril";

interface FixedAmericanasAbrilCourtPageViewProps {
  gameNumber: GameNumber;
  courtNumber: number;
}

export default function FixedAmericanasAbrilCourtPageView({
  gameNumber,
  courtNumber,
}: FixedAmericanasAbrilCourtPageViewProps) {
  const [playerDocuments, setPlayerDocuments] = useState<
    Partial<Record<PlayerId, PlayerDocument>>
  >({});
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, ...FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH),
        );
        const playersById = new Map<string, PlayerDocument>();

        querySnapshot.forEach((playerDoc) => {
          playersById.set(playerDoc.id, playerDoc.data() as PlayerDocument);
        });

        setPlayerDocuments(getFixedAmericanasAbrilPlayerDocumentsMap(playersById));
      } catch (error) {
        console.error("Error al obtener los resultados del rol fijo: ", error);
      }
    };

    void fetchPlayers();
  }, [refreshToken]);

  const court = getFixedAmericanasAbrilCourt(gameNumber, courtNumber);

  if (!court) {
    return <div className="subtitulo">No se encontró la tarjeta solicitada.</div>;
  }

  return (
    <div className="topcontainer">
      <div className="titulo">
        {FIXED_AMERICANAS_ABRIL_TITLE} - Juego {gameNumber} - {court.courtLabel}
      </div>
      <div className="subtitulo">
        Este rol viene fijo desde el Excel del domingo. Aquí solo se captura el
        resultado de esta cancha.
      </div>
      <div className="container">
        <CourtResultCard
          court={court}
          gameNumber={gameNumber}
          players={FIXED_AMERICANAS_ABRIL_PLAYERS}
          playerDocuments={playerDocuments}
          canEdit
          playerCollectionPath={
            [...FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH] as [
              string,
              ...string[],
            ]
          }
          onSaved={() => setRefreshToken((currentValue) => currentValue + 1)}
        />
      </div>
      <div className="botones compact-buttons">
        <Link
          href={`/roles-fijos/${FIXED_AMERICANAS_ABRIL_EVENT_ID}`}
          className="btn btn-outline-primary"
        >
          Volver al rol fijo
        </Link>
        <Link
          href={`/roles-fijos/${FIXED_AMERICANAS_ABRIL_EVENT_ID}/resultados`}
          className="btn btn-outline-secondary"
        >
          Ver tabla general
        </Link>
      </div>
    </div>
  );
}
