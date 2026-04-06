"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  getCourtSubmissionStatus,
  type CourtDefinition,
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
  getFixedAmericanasAbrilTeamScoreLabel,
} from "@/lib/fixedAmericanasAbril";

interface CompletedCourtCardProps {
  court: CourtDefinition;
  courtNumber: number;
  gameNumber: number;
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>;
}

function CompletedCourtCard({
  court,
  courtNumber,
  gameNumber,
  playerDocuments,
}: CompletedCourtCardProps) {
  const teamAScore = getFixedAmericanasAbrilTeamScoreLabel(
    playerDocuments,
    gameNumber,
    court.teamA,
  );
  const teamBScore = getFixedAmericanasAbrilTeamScoreLabel(
    playerDocuments,
    gameNumber,
    court.teamB,
  );

  return (
    <div className="col-6 col-lg-4 col-xl-3 role-card-column">
      <div className="card h-100 shadow-sm role-card completed-role-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">{court.courtLabel}</h5>
            <span className="badge text-bg-success">Finalizado</span>
          </div>
          <div className="completed-team-row">
            <span className="completed-team-names">
              {FIXED_AMERICANAS_ABRIL_PLAYERS[court.teamA[0]]}
              {" / "}
              {FIXED_AMERICANAS_ABRIL_PLAYERS[court.teamA[1]]}
            </span>
            <span className="completed-team-score">{teamAScore}</span>
          </div>
          <p className="card-text text-center fw-bold my-2">VS</p>
          <div className="completed-team-row">
            <span className="completed-team-names">
              {FIXED_AMERICANAS_ABRIL_PLAYERS[court.teamB[0]]}
              {" / "}
              {FIXED_AMERICANAS_ABRIL_PLAYERS[court.teamB[1]]}
            </span>
            <span className="completed-team-score">{teamBScore}</span>
          </div>
        </div>
        <div className="card-footer bg-transparent border-0 pt-0">
          <Link
            href={`/roles-fijos/${FIXED_AMERICANAS_ABRIL_EVENT_ID}/juego/${gameNumber}/cancha/${courtNumber}`}
            className="btn btn-outline-secondary w-100"
          >
            Ver tarjeta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FixedAmericanasAbrilCompletedCatalog() {
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
        console.error("Error al obtener los juegos terminados: ", error);
      }
    };

    void fetchPlayers();

    return () => {
      isMounted = false;
    };
  }, []);

  const completedSections = FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.map((gameNumber) => {
    const courts = (FIXED_AMERICANAS_ABRIL_SCHEDULES[gameNumber] ?? [])
      .map((court, index) => ({ court, courtNumber: index + 1 }))
      .filter(({ court }) => {
        const playerIds = [...court.teamA, ...court.teamB] as PlayerId[];
        return (
          getCourtSubmissionStatus(playerDocuments, gameNumber, playerIds) ===
          "complete"
        );
      });

    return { gameNumber, courts };
  }).filter((section) => section.courts.length > 0);

  if (completedSections.length === 0) {
    return (
      <div className="empty-catalog-state">
        Todavía no hay juegos terminados. Cuando se cierre una cancha, aparecerá
        aquí con su marcador.
      </div>
    );
  }

  return (
    <div className="catalog-grid">
      {completedSections.map(({ gameNumber, courts }) => (
        <section key={gameNumber} className="catalog-section">
          <div className="catalog-section-header">Juego {gameNumber}</div>
          <div className="row g-3">
            {courts.map(({ court, courtNumber }) => (
              <CompletedCourtCard
                key={`${gameNumber}-${courtNumber}`}
                court={court}
                courtNumber={courtNumber}
                gameNumber={gameNumber}
                playerDocuments={playerDocuments}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
