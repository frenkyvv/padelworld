"use client";

import Link from "next/link";
import {
  GAME_SCHEDULES,
  getCourtSubmissionStatus,
  getDefaultPlayerName,
  type GameNumber,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

interface RoundCourtCardsProps {
  gameNumber: GameNumber;
  players: Partial<Record<PlayerId, string>>;
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>;
  courts?: ReturnType<typeof getCourtsFallback>;
  buildCourtHref?: (gameNumber: GameNumber, courtNumber: number) => string;
}

function getCourtsFallback(gameNumber: GameNumber) {
  return GAME_SCHEDULES[gameNumber] ?? [];
}

export default function RoundCourtCards({
  gameNumber,
  players,
  playerDocuments,
  courts = getCourtsFallback(gameNumber),
  buildCourtHref = (selectedGameNumber, courtNumber) =>
    `/rol/juego/${selectedGameNumber}/cancha/${courtNumber}`,
}: RoundCourtCardsProps) {
  return (
    <div className="row g-3">
      {courts.map((court, index) => {
        const playerIds = [...court.teamA, ...court.teamB] as PlayerId[];
        const submissionStatus = getCourtSubmissionStatus(
          playerDocuments,
          gameNumber,
          playerIds,
        );
        const isSubmitted = submissionStatus === "complete";

        return (
          <div
            className="col-12 col-sm-6 col-lg-4 col-xl-3 role-card-column"
            key={court.courtLabel}
          >
            <div className="card h-100 shadow-sm role-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">{court.courtLabel}</h5>
                  <span
                    className={`badge ${
                      submissionStatus === "complete"
                        ? "text-bg-success"
                        : submissionStatus === "partial"
                          ? "text-bg-danger"
                          : "text-bg-warning"
                    }`}
                  >
                    {submissionStatus === "complete"
                      ? "Cargado"
                      : submissionStatus === "partial"
                        ? "Parcial"
                        : "Pendiente"}
                  </span>
                </div>
                <p className="card-text text-center mb-1">
                  {players[court.teamA[0]] || getDefaultPlayerName(court.teamA[0])}
                  {" / "}
                  {players[court.teamA[1]] || getDefaultPlayerName(court.teamA[1])}
                </p>
                <p className="card-text text-center fw-bold">VS</p>
                <p className="card-text text-center">
                  {players[court.teamB[0]] || getDefaultPlayerName(court.teamB[0])}
                  {" / "}
                  {players[court.teamB[1]] || getDefaultPlayerName(court.teamB[1])}
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 pt-0">
                <Link
                  href={buildCourtHref(gameNumber, index + 1)}
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
