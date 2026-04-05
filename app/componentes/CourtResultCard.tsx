"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  getCourtSubmissionStatus,
  getDefaultPlayerName,
  getGameField,
  getScoreForGame,
  hasSubmittedScore,
  type CourtDefinition,
  type GameNumber,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

interface CourtResultCardProps {
  court: CourtDefinition;
  gameNumber: GameNumber;
  players: Partial<Record<PlayerId, string>>;
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>;
  onSaved?: () => Promise<void> | void;
}

type ScoreState = Record<PlayerId, string>;

function createInitialScores(
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>,
  gameNumber: GameNumber,
  playerIds: PlayerId[],
): ScoreState {
  return Object.fromEntries(
    playerIds.map((playerId) => {
      const player = playerDocuments[playerId];
      const score = player ? getScoreForGame(player, gameNumber) : 0;
      const hasScore = player ? hasSubmittedScore(player, gameNumber) : false;

      return [playerId, hasScore ? String(score) : ""];
    }),
  ) as ScoreState;
}

export default function CourtResultCard({
  court,
  gameNumber,
  players,
  playerDocuments,
  onSaved,
}: CourtResultCardProps) {
  const playerIds = useMemo(
    () => [...court.teamA, ...court.teamB] as PlayerId[],
    [court.teamA, court.teamB],
  );
  const [scores, setScores] = useState<ScoreState>({});
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setScores(createInitialScores(playerDocuments, gameNumber, playerIds));
    setError("");
  }, [gameNumber, playerDocuments, playerIds]);

  const submissionStatus = getCourtSubmissionStatus(
    playerDocuments,
    gameNumber,
    playerIds,
  );
  const isSubmitted = submissionStatus === "complete";

  const handleChange = (playerId: PlayerId, value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    setScores((currentScores) => ({
      ...currentScores,
      [playerId]: value,
    }));
    setError("");
  };

  const handleSubmit = async () => {
    const missingScores = playerIds.filter(
      (playerId) =>
        scores[playerId] === undefined || scores[playerId].trim() === "",
    );

    if (missingScores.length > 0) {
      setError(
        "Completa los 4 puntajes de esta cancha antes de guardar el resultado.",
      );
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await runTransaction(db, async (transaction) => {
        const gameField = getGameField(gameNumber);
        const playerRefs = playerIds.map((playerId) => doc(db, "padel", playerId));
        const playerSnapshots = await Promise.all(
          playerRefs.map((playerRef) => transaction.get(playerRef)),
        );
        const transactionPlayerDocuments = Object.fromEntries(
          playerSnapshots.map((snapshot, index) => [
            playerIds[index],
            snapshot.data() as PlayerDocument | undefined,
          ]),
        ) as Partial<Record<PlayerId, PlayerDocument>>;

        const currentStatus = getCourtSubmissionStatus(
          transactionPlayerDocuments,
          gameNumber,
          playerIds,
        );

        if (currentStatus === "complete") {
          throw new Error("Este resultado ya fue cargado por otro jugador.");
        }

        for (const [index, playerId] of playerIds.entries()) {
          transaction.set(
            playerRefs[index],
            {
              [gameField]: Number(scores[playerId]),
            },
            { merge: true },
          );
        }
      });

      await onSaved?.();
    } catch (submitError) {
      console.error("Error al registrar los puntos: ", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar el resultado de esta cancha.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mb-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan={5} className="text-center">
              {court.courtLabel}
              {submissionStatus === "complete"
                ? " - Resultado cargado"
                : submissionStatus === "partial"
                  ? " - Resultado parcial"
                  : " - Pendiente"}
            </th>
          </tr>
        </thead>
        <tbody>
          {[0, 1].map((rowIndex) => {
            const leftPlayer = court.teamA[rowIndex];
            const rightPlayer = court.teamB[rowIndex];

            return (
              <tr key={`${court.courtLabel}-${leftPlayer}-${rightPlayer}`}>
                <td className="text-center">
                  {players[leftPlayer] || getDefaultPlayerName(leftPlayer)}
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    value={scores[leftPlayer] ?? ""}
                    onChange={(event) =>
                      handleChange(leftPlayer, event.target.value)
                    }
                    style={{ width: "70px" }}
                    disabled={isSubmitted}
                  />
                </td>
                <td className="text-center">VS</td>
                <td className="text-center">
                  <input
                    type="number"
                    value={scores[rightPlayer] ?? ""}
                    onChange={(event) =>
                      handleChange(rightPlayer, event.target.value)
                    }
                    style={{ width: "70px" }}
                    disabled={isSubmitted}
                  />
                </td>
                <td className="text-center">
                  {players[rightPlayer] || getDefaultPlayerName(rightPlayer)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      {submissionStatus === "partial" && !error && (
        <div className="alert alert-warning text-center" role="alert">
          Esta cancha tiene un resultado parcial guardado. Puedes volver a
          guardar los 4 puntajes para completarlo.
        </div>
      )}

      <div className="botones">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isSubmitted || isSaving}
        >
          {isSubmitted
            ? "Resultado cerrado"
            : isSaving
              ? "Guardando..."
              : "Guardar resultado de esta cancha"}
        </button>
      </div>
    </div>
  );
}
