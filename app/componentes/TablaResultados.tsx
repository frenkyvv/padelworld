"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  GAME_FIELDS,
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
            {GAME_FIELDS.map((gameField) => (
              <th key={gameField}>{gameField.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {GAME_FIELDS.map((gameField) => (
              <td key={gameField}>{player[gameField] ?? 0}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={GAME_FIELDS.length} style={{ fontWeight: "bold" }}>
              Total de Puntos: {getTotalPoints(player)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
