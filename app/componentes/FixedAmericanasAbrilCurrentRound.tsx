"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import RoundCourtCards from "@/app/componentes/RoundCourtCards";
import { db } from "@/lib/firebase";
import { type PlayerDocument, type PlayerId } from "@/lib/padel";
import {
  FIXED_AMERICANAS_ABRIL_EVENT_ID,
  FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH,
  FIXED_AMERICANAS_ABRIL_PLAYERS,
  FIXED_AMERICANAS_ABRIL_SCHEDULES,
  getFixedAmericanasAbrilPlayerDocumentsMap,
  getFixedAmericanasCurrentGameNumber,
} from "@/lib/fixedAmericanasAbril";

export default function FixedAmericanasAbrilCurrentRound() {
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
        console.error("Error al obtener el juego activo: ", error);
      }
    };

    void fetchPlayers();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentGameNumber = getFixedAmericanasCurrentGameNumber(playerDocuments);

  if (currentGameNumber === null) {
    return (
      <div className="empty-catalog-state">
        Todos los juegos ya fueron publicados y cerrados. Puedes revisar los
        resultados finales o los juegos terminados.
        <div className="botones compact-buttons top-actions">
          <Link
            href={`/roles-fijos/${FIXED_AMERICANAS_ABRIL_EVENT_ID}/resultados`}
            className="btn btn-outline-success"
          >
            Ver tabla general
          </Link>
          <Link
            href={`/roles-fijos/${FIXED_AMERICANAS_ABRIL_EVENT_ID}/terminados`}
            className="btn btn-outline-secondary"
          >
            Ver juegos terminados
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-grid">
      <section className="catalog-section">
        <div className="catalog-section-header">Juego {currentGameNumber}</div>
        <RoundCourtCards
          gameNumber={currentGameNumber}
          courts={FIXED_AMERICANAS_ABRIL_SCHEDULES[currentGameNumber]}
          players={FIXED_AMERICANAS_ABRIL_PLAYERS}
          playerDocuments={playerDocuments}
          buildCourtHref={(selectedGameNumber, courtNumber) =>
            `/roles-fijos/${FIXED_AMERICANAS_ABRIL_EVENT_ID}/juego/${selectedGameNumber}/cancha/${courtNumber}`
          }
        />
      </section>
    </div>
  );
}
