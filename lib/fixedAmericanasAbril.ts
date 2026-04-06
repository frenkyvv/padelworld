import type { CourtDefinition, GameNumber, PlayerDocument, PlayerId } from "@/lib/padel";

export const FIXED_AMERICANAS_ABRIL_EVENT_ID = "americanas-abril";
export const FIXED_AMERICANAS_ABRIL_TITLE = "Rol fijo Americanas Abril";
export const FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH = [
  "padelEvents",
  FIXED_AMERICANAS_ABRIL_EVENT_ID,
  "players",
] as const;

export const FIXED_AMERICANAS_ABRIL_PLAYERS: Record<PlayerId, string> = {
  victor: "VICTOR",
  alan: "ALAN",
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
  george: "GEORGE",
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
    { courtLabel: "Cancha 1", teamA: ["victor", "obed"], teamB: ["alan", "fresh"] },
    { courtLabel: "Cancha 2", teamA: ["johan", "dany"], teamB: ["rola", "memo"] },
    { courtLabel: "Cancha 3", teamA: ["omar", "rodrigo"], teamB: ["fanny", "mario"] },
    { courtLabel: "Cancha 4", teamA: ["tono", "angel"], teamB: ["misa", "george"] },
    { courtLabel: "Cancha 5", teamA: ["samy", "edwin"], teamB: ["checo", "alex"] },
  ],
  2: [
    { courtLabel: "Cancha 1", teamA: ["alan", "victor"], teamB: ["obed", "johan"] },
    { courtLabel: "Cancha 2", teamA: ["fresh", "memo"], teamB: ["mario", "dany"] },
    { courtLabel: "Cancha 3", teamA: ["omar", "rola"], teamB: ["fanny", "rodrigo"] },
    { courtLabel: "Cancha 4", teamA: ["tono", "angel"], teamB: ["samy", "george"] },
    { courtLabel: "Cancha 5", teamA: ["misa", "checo"], teamB: ["alex", "edwin"] },
  ],
  3: [
    { courtLabel: "Cancha 1", teamA: ["omar", "fresh"], teamB: ["rodrigo", "obed"] },
    { courtLabel: "Cancha 2", teamA: ["rola", "mario"], teamB: ["johan", "alan"] },
    { courtLabel: "Cancha 3", teamA: ["victor", "dany"], teamB: ["fanny", "memo"] },
    { courtLabel: "Cancha 4", teamA: ["edwin", "checo"], teamB: ["alex", "george"] },
    { courtLabel: "Cancha 5", teamA: ["angel", "tono"], teamB: ["samy", "misa"] },
  ],
  4: [
    { courtLabel: "Cancha 1", teamA: ["fresh", "johan"], teamB: ["rola", "dany"] },
    { courtLabel: "Cancha 2", teamA: ["omar", "misa"], teamB: ["mario", "rodrigo"] },
    { courtLabel: "Cancha 3", teamA: ["memo", "victor"], teamB: ["alan", "obed"] },
    { courtLabel: "Cancha 4", teamA: ["tono", "fanny"], teamB: ["george", "samy"] },
    { courtLabel: "Cancha 5", teamA: ["alex", "angel"], teamB: ["edwin", "checo"] },
  ],
  5: [
    { courtLabel: "Cancha 1", teamA: ["edwin", "rola"], teamB: ["misa", "rodrigo"] },
    { courtLabel: "Cancha 2", teamA: ["alan", "memo"], teamB: ["fresh", "obed"] },
    { courtLabel: "Cancha 3", teamA: ["victor", "johan"], teamB: ["dany", "omar"] },
    { courtLabel: "Cancha 4", teamA: ["angel", "tono"], teamB: ["fanny", "mario"] },
    { courtLabel: "Cancha 5", teamA: ["checo", "alex"], teamB: ["george", "samy"] },
  ],
  6: [
    { courtLabel: "Cancha 1", teamA: ["victor", "fresh"], teamB: ["omar", "samy"] },
    { courtLabel: "Cancha 2", teamA: ["fanny", "checo"], teamB: ["alex", "edwin"] },
    { courtLabel: "Cancha 3", teamA: ["memo", "rola"], teamB: ["dany", "mario"] },
    { courtLabel: "Cancha 4", teamA: ["johan", "george"], teamB: ["rodrigo", "angel"] },
    { courtLabel: "Cancha 5", teamA: ["alan", "tono"], teamB: ["misa", "obed"] },
  ],
  7: [
    { courtLabel: "Cancha 1", teamA: ["memo", "mario"], teamB: ["obed", "misa"] },
    { courtLabel: "Cancha 2", teamA: ["rola", "alan"], teamB: ["fresh", "samy"] },
    { courtLabel: "Cancha 3", teamA: ["victor", "rodrigo"], teamB: ["omar", "johan"] },
    { courtLabel: "Cancha 4", teamA: ["fanny", "edwin"], teamB: ["alex", "checo"] },
    { courtLabel: "Cancha 5", teamA: ["tono", "angel"], teamB: ["george", "dany"] },
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
