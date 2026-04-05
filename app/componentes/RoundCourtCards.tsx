"use client";

import Link from "next/link";
import {
  GAME_SCHEDULES,
  getDefaultPlayerName,
  hasSubmittedScore,
  type GameNumber,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

interface RoundCourtCardsProps {
  gameNumber: GameNumber;
  players: Partial<Record<PlayerId, string>>;
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>;
}

export default function RoundCourtCards({
  gameNumber,
  players,
  playerDocuments,
}: RoundCourtCardsProps) {
  const courts = GAME_SCHEDULES[gameNumber] ?? [];

  return (
    <div className="row g-3">
      {courts.map((court, index) => {
        const playerIds = [...court.teamA, ...court.teamB] as PlayerId[];
        const isSubmitted = playerIds.every((playerId) =>
          hasSubmittedScore(playerDocuments[playerId], gameNumber),
        );

        return (
          <div className="col-12 col-md-6 col-xl-4" key={court.courtLabel}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">{court.courtLabel}</h5>
                  <span
                    className={`badge ${
                      isSubmitted ? "text-bg-success" : "text-bg-warning"
                    }`}
                  >
                    {isSubmitted ? "Cargado" : "Pendiente"}
                  </span>
                </div>
                <p className="card-text mb-1">
                  {players[court.teamA[0]] || getDefaultPlayerName(court.teamA[0])}
                  {" / "}
                  {players[court.teamA[1]] || getDefaultPlayerName(court.teamA[1])}
                </p>
                <p className="card-text text-center fw-bold">VS</p>
                <p className="card-text">
                  {players[court.teamB[0]] || getDefaultPlayerName(court.teamB[0])}
                  {" / "}
                  {players[court.teamB[1]] || getDefaultPlayerName(court.teamB[1])}
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 pt-0">
                <Link
                  href={`/rol/juego/${gameNumber}/cancha/${index + 1}`}
                  className={`btn w-100 ${
                    isSubmitted ? "btn-outline-secondary" : "btn-primary"
                  }`}
                >
                  {isSubmitted ? "Ver tarjeta" : "Abrir tarjeta"}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
