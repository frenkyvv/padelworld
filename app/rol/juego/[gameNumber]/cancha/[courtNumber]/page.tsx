import { notFound } from "next/navigation";
import SvgBackground from "@/app/componentes/SvgBackground";
import CourtPageView from "@/app/componentes/CourtPageView";
import { GAME_NUMBERS, getCourtForGame } from "@/lib/padel";
import "@/app/styles.css";

interface CourtRoutePageProps {
  params: Promise<{
    gameNumber: string;
    courtNumber: string;
  }>;
}

export default async function CourtRoutePage({ params }: CourtRoutePageProps) {
  const { gameNumber, courtNumber } = await params;
  const parsedGameNumber = Number(gameNumber);
  const parsedCourtNumber = Number(courtNumber);

  if (
    !Number.isInteger(parsedGameNumber) ||
    !Number.isInteger(parsedCourtNumber) ||
    !GAME_NUMBERS.includes(parsedGameNumber)
  ) {
    notFound();
  }

  if (!getCourtForGame(parsedGameNumber, parsedCourtNumber)) {
    notFound();
  }

  return (
    <>
      <SvgBackground />
      <CourtPageView
        gameNumber={parsedGameNumber}
        courtNumber={parsedCourtNumber}
      />
    </>
  );
}
