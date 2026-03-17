"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  PLAYER_IDS,
  getDisplayPlayerName,
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
              Jugador
            </th>
            <th scope="col" className="text-center">
              1
            </th>
            <th scope="col" className="text-center">
              2
            </th>
            <th scope="col" className="text-center">
              3
            </th>
            <th scope="col" className="text-center">
              4
            </th>
            <th scope="col" className="text-center">
              5
            </th>
            <th scope="col" className="text-center">
              6
            </th>
            <th scope="col" className="text-center">
              7
            </th>
            <th scope="col" className="text-center">
              8
            </th>
            <th scope="col" className="text-center">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="text-center">
                <Link href={`/${player.id}`}>{player.displayName}</Link>
              </td>
              <td className="text-center">{player.j1 ?? 0}</td>
              <td className="text-center">{player.j2 ?? 0}</td>
              <td className="text-center">{player.j3 ?? 0}</td>
              <td className="text-center">{player.j4 ?? 0}</td>
              <td className="text-center">{player.j5 ?? 0}</td>
              <td className="text-center">{player.j6 ?? 0}</td>
              <td className="text-center">{player.j7 ?? 0}</td>
              <td className="text-center">{player.j8 ?? 0}</td>
              <td className="text-center">{player.totalPuntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
