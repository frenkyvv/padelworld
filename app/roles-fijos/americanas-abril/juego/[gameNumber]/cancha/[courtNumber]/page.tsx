import { notFound } from "next/navigation";
import FixedAmericanasAbrilCourtPageView from "@/app/componentes/FixedAmericanasAbrilCourtPageView";
import SvgBackground from "@/app/componentes/SvgBackground";
import {
  FIXED_AMERICANAS_ABRIL_GAME_NUMBERS,
  getFixedAmericanasAbrilCourt,
} from "@/lib/fixedAmericanasAbril";
import "@/app/styles.css";

interface FixedCourtRoutePageProps {
  params: Promise<{
    gameNumber: string;
    courtNumber: string;
  }>;
}

export default async function FixedCourtRoutePage({
  params,
}: FixedCourtRoutePageProps) {
  const { gameNumber, courtNumber } = await params;
  const parsedGameNumber = Number(gameNumber);
  const parsedCourtNumber = Number(courtNumber);

  if (
    !Number.isInteger(parsedGameNumber) ||
    !Number.isInteger(parsedCourtNumber) ||
    !FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.includes(parsedGameNumber)
  ) {
    notFound();
  }

  if (!getFixedAmericanasAbrilCourt(parsedGameNumber, parsedCourtNumber)) {
    notFound();
  }

  return (
    <>
      <SvgBackground />
      <FixedAmericanasAbrilCourtPageView
        gameNumber={parsedGameNumber}
        courtNumber={parsedCourtNumber}
      />
    </>
  );
}
