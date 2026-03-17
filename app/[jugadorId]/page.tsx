import { notFound } from "next/navigation";
import PlayerPage from "@/app/componentes/PlayerPage";
import { isPlayerId } from "@/lib/padel";

interface JugadorPageProps {
  params: Promise<{
    jugadorId: string;
  }>;
}

export default async function JugadorPage({ params }: JugadorPageProps) {
  const { jugadorId } = await params;

  if (!isPlayerId(jugadorId)) {
    notFound();
  }

  return <PlayerPage playerId={jugadorId} />;
}
