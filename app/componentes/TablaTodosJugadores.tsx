"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  GAME_NUMBERS,
  PLAYER_IDS,
  getDisplayPlayerName,
  getScoreForGame,
  getTotalPoints,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

interface PlayerRow extends PlayerDocument {
  id: PlayerId;
  displayName: string;
  totalPuntos: number;
}

export default function TablaTodosJugadores() {
  const [players, setPlayers] = useState<PlayerRow[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "padel"));
        const playersById = new Map<string, PlayerDocument>();

        querySnapshot.forEach((playerDoc) => {
          playersById.set(playerDoc.id, playerDoc.data() as PlayerDocument);
        });

        if (!isMounted) {
          return;
        }

        setPlayers(
          PLAYER_IDS.map((playerId) => {
            const playerData = playersById.get(playerId) ?? {};

            return {
              id: playerId,
              displayName: getDisplayPlayerName(playerId, playerData),
              totalPuntos: getTotalPoints(playerData),
              ...playerData,
            };
          }).sort((leftPlayer, rightPlayer) => {
            if (rightPlayer.totalPuntos !== leftPlayer.totalPuntos) {
              return rightPlayer.totalPuntos - leftPlayer.totalPuntos;
            }

            return leftPlayer.displayName.localeCompare(rightPlayer.displayName);
          }),
        );
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col" className="text-center">
              Jugador
            </th>
            {GAME_NUMBERS.map((gameNumber) => (
              <th key={gameNumber} scope="col" className="text-center">
                {gameNumber}
              </th>
            ))}
            <th scope="col" className="text-center">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">
                <Link href={`/${player.id}`}>{player.displayName}</Link>
              </td>
              {GAME_NUMBERS.map((gameNumber) => (
                <td className="text-center" key={`${player.id}-${gameNumber}`}>
                  {getScoreForGame(player, gameNumber)}
                </td>
              ))}
              <td className="text-center">{player.totalPuntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
