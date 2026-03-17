"use client";

import { useState } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  GAME_SCHEDULES,
  PLAYER_IDS,
  getDefaultPlayerName,
  getGameField,
  type GameNumber,
  type PlayerId,
} from "@/lib/padel";

interface JuegoTableProps {
  gameNumber: GameNumber;
  players: Partial<Record<PlayerId, string>>;
}

function createInitialScores(): Record<PlayerId, string> {
  return PLAYER_IDS.reduce(
    (scores, playerId) => ({ ...scores, [playerId]: "" }),
    {} as Record<PlayerId, string>,
  );
}

export default function JuegoTable({
  gameNumber,
  players,
}: JuegoTableProps) {
  const [scores, setScores] = useState<Record<PlayerId, string>>(
    createInitialScores(),
  );

  const handleChange = (playerId: PlayerId, value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    setScores((currentScores) => ({
      ...currentScores,
      [playerId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await runTransaction(db, async (transaction) => {
        for (const playerId of PLAYER_IDS) {
          const score = scores[playerId];

          if (score === "") {
            continue;
          }

          transaction.update(doc(db, "padel", playerId), {
            [getGameField(gameNumber)]: Number(score),
          });
        }
      });

      alert("Puntos registrados correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al registrar los puntos: ", error);
    }
  };

  return (
    <div>
      {GAME_SCHEDULES[gameNumber].map((court) => (
        <table className="table table-bordered" key={court.courtLabel}>
          <thead>
            <tr>
              <th colSpan={5} className="text-center">
                {court.courtLabel}
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
                      value={scores[leftPlayer]}
                      onChange={(event) =>
                        handleChange(leftPlayer, event.target.value)
                      }
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td className="text-center">VS</td>
                  <td className="text-center">
                    <input
                      type="number"
                      value={scores[rightPlayer]}
                      onChange={(event) =>
                        handleChange(rightPlayer, event.target.value)
                      }
                      style={{ width: "60px" }}
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
      ))}
      <div className="botones">
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Registrar Puntos
        </button>
      </div>
    </div>
  );
}
