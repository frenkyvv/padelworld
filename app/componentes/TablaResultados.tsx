"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  GAME_NUMBERS,
  getGameField,
  getScoreForGame,
  getTotalPoints,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

interface TablaResultadosProps {
  playerId: PlayerId;
}

export default function TablaResultados({ playerId }: TablaResultadosProps) {
  const [player, setPlayer] = useState<PlayerDocument>({});

  useEffect(() => {
    let isMounted = true;

    const fetchResultados = async () => {
      const playerSnapshot = await getDoc(doc(db, "padel", playerId));

      if (!isMounted) {
        return;
      }

      if (playerSnapshot.exists()) {
        setPlayer(playerSnapshot.data() as PlayerDocument);
      } else {
        console.log("No such document!");
      }
    };

    void fetchResultados();

    return () => {
      isMounted = false;
    };
  }, [playerId]);

  return (
    <div>
      <h3>Resultados</h3>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            {GAME_NUMBERS.map((gameNumber) => (
              <th key={gameNumber}>{gameNumber}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {GAME_NUMBERS.map((gameNumber) => (
              <td key={getGameField(gameNumber)}>
                {getScoreForGame(player, gameNumber)}
              </td>
            ))}
          </tr>
          <tr>
            <td colSpan={GAME_NUMBERS.length} style={{ fontWeight: "bold" }}>
              Total de Puntos: {getTotalPoints(player)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
