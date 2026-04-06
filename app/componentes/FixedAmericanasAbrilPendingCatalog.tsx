"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import RoundCourtCards from "@/app/componentes/RoundCourtCards";
import { db } from "@/lib/firebase";
import {
  getCourtSubmissionStatus,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";
import {
  FIXED_AMERICANAS_ABRIL_EVENT_ID,
  FIXED_AMERICANAS_ABRIL_GAME_NUMBERS,
  FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH,
  FIXED_AMERICANAS_ABRIL_PLAYERS,
  FIXED_AMERICANAS_ABRIL_SCHEDULES,
  getFixedAmericanasAbrilPlayerDocumentsMap,
  getFixedAmericanasCurrentGameNumber,
} from "@/lib/fixedAmericanasAbril";

interface FixedAmericanasAbrilPendingCatalogProps {
  scope?: "all" | "current";
}

export default function FixedAmericanasAbrilPendingCatalog({
  scope = "all",
}: FixedAmericanasAbrilPendingCatalogProps) {
  const [playerDocuments, setPlayerDocuments] = useState<
    Partial<Record<PlayerId, PlayerDocument>>
  >({});

  useEffect(() => {
    let isMounted = true;

    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, ...FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH),
        );
        const playersById = new Map<string, PlayerDocument>();

        querySnapshot.forEach((playerDoc) => {
          playersById.set(playerDoc.id, playerDoc.data() as PlayerDocument);
        });

        if (!isMounted) {
          return;
        }

        setPlayerDocuments(getFixedAmericanasAbrilPlayerDocumentsMap(playersById));
      } catch (error) {
        console.error("Error al obtener el rol fijo: ", error);
      }
    };

    void fetchPlayers();

    return () => {
      isMounted = false;
    };
  }, []);

  const pendingSections = FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.map((gameNumber) => {
    const courts = (FIXED_AMERICANAS_ABRIL_SCHEDULES[gameNumber] ?? []).filter(
      (court) => {
        const playerIds = [...court.teamA, ...court.teamB] as PlayerId[];
        return (
          getCourtSubmissionStatus(playerDocuments, gameNumber, playerIds) !==
          "complete"
        );
      },
    );

    return { gameNumber, courts };
  }).filter((section) => section.courts.length > 0);

  const currentGameNumber = getFixedAmericanasCurrentGameNumber(playerDocuments);
  const visibleSections =
    scope === "current" && currentGameNumber !== null
      ? pendingSections.filter((section) => section.gameNumber === currentGameNumber)
      : pendingSections;

  if (visibleSections.length === 0) {
    return (
      <div className="empty-catalog-state">
        Todos los juegos ya tienen marcador. Ahora los puedes consultar en la
        página de juegos terminados.
      </div>
    );
  }

  return (
    <div className="catalog-grid">
      {visibleSections.map(({ gameNumber, courts }) => (
        <section key={gameNumber} className="catalog-section">
          <div className="catalog-section-header">Juego {gameNumber}</div>
          <RoundCourtCards
            gameNumber={gameNumber}
            courts={courts}
            players={FIXED_AMERICANAS_ABRIL_PLAYERS}
            playerDocuments={playerDocuments}
            buildCourtHref={(selectedGameNumber, courtNumber) =>
              `/roles-fijos/${FIXED_AMERICANAS_ABRIL_EVENT_ID}/juego/${selectedGameNumber}/cancha/${courtNumber}`
            }
          />
        </section>
      ))}
    </div>
  );
}
