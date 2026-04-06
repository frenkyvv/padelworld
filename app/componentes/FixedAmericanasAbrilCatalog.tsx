"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import RoundCourtCards from "@/app/componentes/RoundCourtCards";
import { db } from "@/lib/firebase";
import { type PlayerDocument, type PlayerId } from "@/lib/padel";
import {
  FIXED_AMERICANAS_ABRIL_EVENT_ID,
  FIXED_AMERICANAS_ABRIL_GAME_NUMBERS,
  FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH,
  FIXED_AMERICANAS_ABRIL_PLAYERS,
  FIXED_AMERICANAS_ABRIL_SCHEDULES,
  getFixedAmericanasAbrilPlayerDocumentsMap,
} from "@/lib/fixedAmericanasAbril";

export default function FixedAmericanasAbrilCatalog() {
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

  return (
    <div className="catalog-grid">
      {FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.map((gameNumber) => (
        <section key={gameNumber} className="catalog-section">
          <div className="catalog-section-header">Juego {gameNumber}</div>
          <RoundCourtCards
            gameNumber={gameNumber}
            courts={FIXED_AMERICANAS_ABRIL_SCHEDULES[gameNumber]}
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
