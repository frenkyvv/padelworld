"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  getDefaultPlayerName,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";
import TablaResultados from "@/app/componentes/TablaResultados";
import TablaTodosJugadores from "@/app/componentes/TablaTodosJugadores";
import "@/app/styles.css";

interface PlayerPageProps {
  playerId: PlayerId;
}

export default function PlayerPage({ playerId }: PlayerPageProps) {
  const [player, setPlayer] = useState<PlayerDocument>({});
  const fallbackName = useMemo(() => getDefaultPlayerName(playerId), [playerId]);

  useEffect(() => {
    let isMounted = true;

    const fetchPlayer = async () => {
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

    void fetchPlayer();

    return () => {
      isMounted = false;
    };
  }, [playerId]);

  return (
    <div className="topcontainer">
      <div className="titulo">{player.nombre?.trim() || fallbackName}</div>
      <div className="subtitulo">
        <TablaResultados playerId={playerId} />
      </div>
      <TablaTodosJugadores />
      <div className="link">
        <Link href="/resultados">Volver a resultados</Link>
      </div>
    </div>
  );
}
