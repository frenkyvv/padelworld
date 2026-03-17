export const PLAYER_IDS = [
  "jugador1",
  "jugador2",
  "jugador3",
  "jugador4",
  "jugador5",
  "jugador6",
  "jugador7",
  "jugador8",
] as const;

export const GAME_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const GAME_FIELDS = [
  "j1",
  "j2",
  "j3",
  "j4",
  "j5",
  "j6",
  "j7",
  "j8",
] as const;

export type PlayerId = (typeof PLAYER_IDS)[number];
export type GameNumber = (typeof GAME_NUMBERS)[number];
export type GameField = (typeof GAME_FIELDS)[number];

export interface PlayerDocument {
  nombre?: string | null;
  j1?: number;
  j2?: number;
  j3?: number;
  j4?: number;
  j5?: number;
  j6?: number;
  j7?: number;
  j8?: number;
}

export interface CourtDefinition {
  courtLabel: string;
  teamA: [PlayerId, PlayerId];
  teamB: [PlayerId, PlayerId];
}

export const GAME_SCHEDULES: Record<GameNumber, CourtDefinition[]> = {
  1: [
    {
      courtLabel: "Cancha 1",
      teamA: ["jugador1", "jugador2"],
      teamB: ["jugador3", "jugador4"],
    },
    {
      courtLabel: "Cancha 2",
      teamA: ["jugador5", "jugador6"],
      teamB: ["jugador7", "jugador8"],
    },
  ],
  2: [
    {
      courtLabel: "Cancha 1",
      teamA: ["jugador1", "jugador3"],
      teamB: ["jugador5", "jugador7"],
    },
    {
      courtLabel: "Cancha 2",
      teamA: ["jugador2", "jugador4"],
      teamB: ["jugador6", "jugador8"],
    },
  ],
  3: [
    {
      courtLabel: "Cancha 1",
      teamA: ["jugador1", "jugador4"],
      teamB: ["jugador6", "jugador7"],
    },
    {
      courtLabel: "Cancha 2",
      teamA: ["jugador2", "jugador3"],
      teamB: ["jugador5", "jugador8"],
    },
  ],
  4: [
    {
      courtLabel: "Cancha 1",
      teamA: ["jugador1", "jugador2"],
      teamB: ["jugador5", "jugador6"],
    },
    {
      courtLabel: "Cancha 2",
      teamA: ["jugador3", "jugador4"],
      teamB: ["jugador7", "jugador8"],
    },
  ],
  5: [
    {
      courtLabel: "Cancha 1",
      teamA: ["jugador1", "jugador3"],
      teamB: ["jugador6", "jugador8"],
    },
    {
      courtLabel: "Cancha 2",
      teamA: ["jugador2", "jugador4"],
      teamB: ["jugador7", "jugador5"],
    },
  ],
  6: [
    {
      courtLabel: "Cancha 1",
      teamA: ["jugador1", "jugador2"],
      teamB: ["jugador7", "jugador8"],
    },
    {
      courtLabel: "Cancha 2",
      teamA: ["jugador3", "jugador4"],
      teamB: ["jugador5", "jugador6"],
    },
  ],
  7: [
    {
      courtLabel: "Cancha 1",
      teamA: ["jugador1", "jugador4"],
      teamB: ["jugador8", "jugador7"],
    },
    {
      courtLabel: "Cancha 2",
      teamA: ["jugador2", "jugador3"],
      teamB: ["jugador5", "jugador6"],
    },
  ],
  8: [
    {
      courtLabel: "Cancha 1",
      teamA: ["jugador2", "jugador5"],
      teamB: ["jugador4", "jugador7"],
    },
    {
      courtLabel: "Cancha 2",
      teamA: ["jugador1", "jugador6"],
      teamB: ["jugador3", "jugador8"],
    },
  ],
};

export function isPlayerId(value: string): value is PlayerId {
  return PLAYER_IDS.includes(value as PlayerId);
}

export function getPlayerNumber(playerId: string): number | null {
  const match = /^jugador([1-8])$/.exec(playerId);
  return match ? Number(match[1]) : null;
}

export function getDefaultPlayerName(playerId: PlayerId | string): string {
  const playerNumber = getPlayerNumber(playerId);
  return playerNumber ? `Jugador ${playerNumber}` : playerId;
}

export function getDisplayPlayerName(
  playerId: PlayerId,
  player?: PlayerDocument,
): string {
  const customName = player?.nombre?.trim();
  return customName || getDefaultPlayerName(playerId);
}

export function getGameField(gameNumber: GameNumber): GameField {
  return `j${gameNumber}` as GameField;
}

export function getGameLabel(gameNumber: GameNumber): string {
  return `Juego ${gameNumber}`;
}

export function getTotalPoints(player: PlayerDocument): number {
  return GAME_FIELDS.reduce((total, field) => total + (player[field] ?? 0), 0);
}
