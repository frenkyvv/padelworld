"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  getScoreForGame,
  getTotalPointsForGames,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";
import {
  FIXED_AMERICANAS_ABRIL_GAME_NUMBERS,
  FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH,
  FIXED_AMERICANAS_ABRIL_PLAYER_IDS,
  FIXED_AMERICANAS_ABRIL_PLAYERS,
} from "@/lib/fixedAmericanasAbril";

interface FixedPlayerRow extends PlayerDocument {
  id: PlayerId;
  displayName: string;
  totalPuntos: number;
}

export default function FixedAmericanasAbrilResultsTable() {
  const [players, setPlayers] = useState<FixedPlayerRow[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
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

        setPlayers(
          FIXED_AMERICANAS_ABRIL_PLAYER_IDS.map((playerId) => {
            const playerData = playersById.get(playerId) ?? {};

            return {
              id: playerId,
              displayName: FIXED_AMERICANAS_ABRIL_PLAYERS[playerId],
              totalPuntos: getTotalPointsForGames(
                playerData,
                FIXED_AMERICANAS_ABRIL_GAME_NUMBERS,
              ),
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
        console.error("Error al obtener la tabla general del rol fijo: ", error);
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
            {FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.map((gameNumber) => (
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
              <td className="text-center">{player.displayName}</td>
              {FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.map((gameNumber) => (
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
