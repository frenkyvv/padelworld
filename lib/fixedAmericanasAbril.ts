import {
  getCourtSubmissionStatus,
  getScoreForGame,
  type CourtDefinition,
  type GameNumber,
  type PlayerDocument,
  type PlayerId,
} from "@/lib/padel";

export const FIXED_AMERICANAS_ABRIL_EVENT_ID = "americanas-abril";
export const FIXED_AMERICANAS_ABRIL_TITLE = "Rol fijo Americanas Abril";
export const FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH = [
  "padelEvents",
  "americanas-abril-v2",
  "players",
] as const;

export const FIXED_AMERICANAS_ABRIL_PLAYERS: Record<PlayerId, string> = {
  victor: "VICTOR",
  gaspar: "GASPAR",
  obed: "OBED",
  fresh: "FRESH",
  johan: "JOHAN",
  dany: "DANY",
  rola: "ROLA",
  memo: "MEMO",
  omar: "OMAR",
  rodrigo: "RODRIGO",
  fanny: "FANNY",
  mario: "MARIO",
  tono: "TOÑO",
  angel: "ANGEL",
  misa: "MISA",
  orly: "ORLY",
  samy: "SAMY",
  edwin: "EDWIN",
  checo: "CHECO",
  alex: "ALEX",
};

export const FIXED_AMERICANAS_ABRIL_GAME_NUMBERS: GameNumber[] = [
  1, 2, 3, 4, 5, 6, 7,
];

export const FIXED_AMERICANAS_ABRIL_SCHEDULES: Record<
  GameNumber,
  CourtDefinition[]
> = {
  1: [
    { courtLabel: "Cancha 1", teamA: ["victor", "obed"], teamB: ["gaspar", "fresh"] },
    { courtLabel: "Cancha 2", teamA: ["johan", "dany"], teamB: ["rola", "memo"] },
    { courtLabel: "Cancha 3", teamA: ["omar", "rodrigo"], teamB: ["fanny", "mario"] },
    { courtLabel: "Cancha 4", teamA: ["tono", "angel"], teamB: ["misa", "orly"] },
    { courtLabel: "Cancha 5", teamA: ["samy", "edwin"], teamB: ["checo", "alex"] },
  ],
  2: [
    { courtLabel: "Cancha 1", teamA: ["gaspar", "victor"], teamB: ["obed", "johan"] },
    { courtLabel: "Cancha 2", teamA: ["fresh", "dany"], teamB: ["mario", "memo"] },
    { courtLabel: "Cancha 3", teamA: ["omar", "rola"], teamB: ["fanny", "rodrigo"] },
    { courtLabel: "Cancha 4", teamA: ["tono", "angel"], teamB: ["samy", "misa"] },
    { courtLabel: "Cancha 5", teamA: ["orly", "checo"], teamB: ["alex", "edwin"] },
  ],
  3: [
    { courtLabel: "Cancha 1", teamA: ["omar", "fresh"], teamB: ["rodrigo", "obed"] },
    { courtLabel: "Cancha 2", teamA: ["rola", "mario"], teamB: ["johan", "misa"] },
    { courtLabel: "Cancha 3", teamA: ["victor", "dany"], teamB: ["fanny", "memo"] },
    { courtLabel: "Cancha 4", teamA: ["edwin", "checo"], teamB: ["alex", "orly"] },
    { courtLabel: "Cancha 5", teamA: ["angel", "tono"], teamB: ["samy", "gaspar"] },
  ],
  4: [
    { courtLabel: "Cancha 1", teamA: ["fresh", "johan"], teamB: ["rola", "dany"] },
    { courtLabel: "Cancha 2", teamA: ["omar", "gaspar"], teamB: ["mario", "rodrigo"] },
    { courtLabel: "Cancha 3", teamA: ["memo", "victor"], teamB: ["samy", "obed"] },
    { courtLabel: "Cancha 4", teamA: ["tono", "fanny"], teamB: ["misa", "orly"] },
    { courtLabel: "Cancha 5", teamA: ["alex", "angel"], teamB: ["edwin", "checo"] },
  ],
  5: [
    { courtLabel: "Cancha 1", teamA: ["edwin", "rola"], teamB: ["misa", "rodrigo"] },
    { courtLabel: "Cancha 2", teamA: ["gaspar", "memo"], teamB: ["fresh", "obed"] },
    { courtLabel: "Cancha 3", teamA: ["victor", "johan"], teamB: ["dany", "omar"] },
    { courtLabel: "Cancha 4", teamA: ["angel", "tono"], teamB: ["fanny", "mario"] },
    { courtLabel: "Cancha 5", teamA: ["checo", "alex"], teamB: ["samy", "orly"] },
  ],
  6: [
    { courtLabel: "Cancha 1", teamA: ["victor", "fresh"], teamB: ["omar", "samy"] },
    { courtLabel: "Cancha 2", teamA: ["fanny", "checo"], teamB: ["alex", "edwin"] },
    { courtLabel: "Cancha 3", teamA: ["memo", "rola"], teamB: ["dany", "mario"] },
    { courtLabel: "Cancha 4", teamA: ["johan", "orly"], teamB: ["rodrigo", "angel"] },
    { courtLabel: "Cancha 5", teamA: ["gaspar", "tono"], teamB: ["misa", "obed"] },
  ],
  7: [
    { courtLabel: "Cancha 1", teamA: ["johan", "mario"], teamB: ["obed", "misa"] },
    { courtLabel: "Cancha 2", teamA: ["rola", "gaspar"], teamB: ["fresh", "fanny"] },
    { courtLabel: "Cancha 3", teamA: ["victor", "rodrigo"], teamB: ["omar", "memo"] },
    { courtLabel: "Cancha 4", teamA: ["orly", "edwin"], teamB: ["alex", "checo"] },
    { courtLabel: "Cancha 5", teamA: ["tono", "angel"], teamB: ["samy", "dany"] },
  ],
};

export const FIXED_AMERICANAS_ABRIL_PLAYER_IDS = Object.keys(
  FIXED_AMERICANAS_ABRIL_PLAYERS,
) as PlayerId[];

export function getFixedAmericanasAbrilCourt(
  gameNumber: GameNumber,
  courtNumber: number,
): CourtDefinition | null {
  return FIXED_AMERICANAS_ABRIL_SCHEDULES[gameNumber]?.[courtNumber - 1] ?? null;
}

export function getFixedAmericanasAbrilPlayerName(playerId: PlayerId): string {
  return FIXED_AMERICANAS_ABRIL_PLAYERS[playerId] ?? playerId;
}

export function getFixedAmericanasAbrilPlayerDocumentsMap(
  playersById: Map<string, PlayerDocument>,
): Partial<Record<PlayerId, PlayerDocument>> {
  return FIXED_AMERICANAS_ABRIL_PLAYER_IDS.reduce((accumulator, playerId) => {
    const player = playersById.get(playerId);
    return {
      ...accumulator,
      [playerId]: player,
    };
  }, {} as Partial<Record<PlayerId, PlayerDocument>>);
}

export function getFixedAmericanasAbrilTeamScoreLabel(
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>,
  gameNumber: GameNumber,
  team: [PlayerId, PlayerId],
): string {
  const scores = team.map((playerId) => {
    const playerDocument = playerDocuments[playerId];
    return playerDocument ? getScoreForGame(playerDocument, gameNumber) : 0;
  });
  const uniqueScores = [...new Set(scores)];

  return uniqueScores.length === 1
    ? String(uniqueScores[0])
    : uniqueScores.join(" / ");
}

export function isFixedAmericanasRoundComplete(
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>,
  gameNumber: GameNumber,
): boolean {
  const courts = FIXED_AMERICANAS_ABRIL_SCHEDULES[gameNumber] ?? [];

  return courts.every((court) => {
    const playerIds = [...court.teamA, ...court.teamB] as PlayerId[];

    return (
      getCourtSubmissionStatus(playerDocuments, gameNumber, playerIds) ===
      "complete"
    );
  });
}

export function getFixedAmericanasCurrentGameNumber(
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>,
): GameNumber | null {
  return (
    FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.find(
      (gameNumber) => !isFixedAmericanasRoundComplete(playerDocuments, gameNumber),
    ) ?? null
  );
}
