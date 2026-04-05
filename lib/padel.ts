const DEFAULT_ROUND_COUNT = 8;
const PLAYERS_PER_COURT = 4;

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
}

export const TOURNAMENT_CONFIG = {
  totalPlayers: 20,
  totalCourts: 5,
  roundCount: parsePositiveInteger(
    process.env.NEXT_PUBLIC_PADEL_ROUND_COUNT,
    DEFAULT_ROUND_COUNT,
  ),
} as const;

export type PlayerId = string;
export type GameNumber = number;
export type GameField = `j${number}`;
export type PlayerDocument = {
  nombre?: string | null;
} & Partial<Record<GameField, number | null>>;

export interface CourtDefinition {
  courtLabel: string;
  teamA: [PlayerId, PlayerId];
  teamB: [PlayerId, PlayerId];
}

export interface PlayerAssignment {
  gameNumber: GameNumber;
  courtNumber: number;
  courtLabel: string;
  partnerId: PlayerId;
  opponentIds: [PlayerId, PlayerId];
}

export type CourtSubmissionStatus = "empty" | "partial" | "complete";

interface RawCourtDefinition {
  teamA: [number, number];
  teamB: [number, number];
}

// Base optimizada para 20 jugadores, 5 canchas y 8 rondas:
// evita repetir companeros y deja solo 4 cruces repetidos como rivales.
const OPTIMIZED_STANDARD_SCHEDULE: RawCourtDefinition[][] = [
  [
    { teamA: [4, 10], teamB: [14, 19] },
    { teamA: [1, 20], teamB: [9, 11] },
    { teamA: [2, 5], teamB: [12, 16] },
    { teamA: [3, 7], teamB: [8, 18] },
    { teamA: [6, 17], teamB: [13, 15] },
  ],
  [
    { teamA: [6, 8], teamB: [16, 19] },
    { teamA: [7, 15], teamB: [10, 20] },
    { teamA: [9, 18], teamB: [12, 14] },
    { teamA: [1, 17], teamB: [3, 5] },
    { teamA: [2, 11], teamB: [4, 13] },
  ],
  [
    { teamA: [3, 20], teamB: [4, 16] },
    { teamA: [6, 18], teamB: [10, 11] },
    { teamA: [2, 9], teamB: [7, 19] },
    { teamA: [1, 13], teamB: [8, 12] },
    { teamA: [5, 14], teamB: [15, 17] },
  ],
  [
    { teamA: [7, 11], teamB: [16, 17] },
    { teamA: [5, 18], teamB: [19, 20] },
    { teamA: [4, 15], teamB: [8, 9] },
    { teamA: [1, 14], teamB: [2, 6] },
    { teamA: [3, 10], teamB: [12, 13] },
  ],
  [
    { teamA: [2, 10], teamB: [8, 17] },
    { teamA: [9, 13], teamB: [16, 18] },
    { teamA: [4, 5], teamB: [6, 7] },
    { teamA: [3, 15], teamB: [11, 19] },
    { teamA: [1, 12], teamB: [14, 20] },
  ],
  [
    { teamA: [3, 9], teamB: [5, 6] },
    { teamA: [1, 19], teamB: [7, 13] },
    { teamA: [4, 17], teamB: [12, 18] },
    { teamA: [8, 14], teamB: [11, 20] },
    { teamA: [2, 16], teamB: [10, 15] },
  ],
  [
    { teamA: [1, 18], teamB: [15, 16] },
    { teamA: [6, 19], teamB: [12, 20] },
    { teamA: [5, 9], teamB: [10, 13] },
    { teamA: [2, 7], teamB: [3, 11] },
    { teamA: [4, 8], teamB: [14, 17] },
  ],
  [
    { teamA: [3, 13], teamB: [14, 15] },
    { teamA: [2, 17], teamB: [9, 20] },
    { teamA: [5, 12], teamB: [8, 11] },
    { teamA: [1, 16], teamB: [4, 19] },
    { teamA: [6, 10], teamB: [7, 18] },
  ],
];

function buildPlayerIds(totalPlayers: number): PlayerId[] {
  return Array.from({ length: totalPlayers }, (_, index) => `jugador${index + 1}`);
}

function buildGameNumbers(roundCount: number): GameNumber[] {
  return Array.from({ length: roundCount }, (_, index) => index + 1);
}

function buildGameFields(gameNumbers: GameNumber[]): GameField[] {
  return gameNumbers.map((gameNumber) => getGameField(gameNumber));
}

function buildOptimizedStandardSchedule(
  playerIds: PlayerId[],
  totalCourts: number,
  gameNumbers: GameNumber[],
): Record<GameNumber, CourtDefinition[]> | null {
  if (
    playerIds.length !== 20 ||
    totalCourts !== 5 ||
    gameNumbers.length !== OPTIMIZED_STANDARD_SCHEDULE.length
  ) {
    return null;
  }

  return Object.fromEntries(
    OPTIMIZED_STANDARD_SCHEDULE.map((round, roundIndex) => [
      gameNumbers[roundIndex],
      round.map((court, courtIndex) => ({
        courtLabel: `Cancha ${courtIndex + 1}`,
        teamA: [
          playerIds[court.teamA[0] - 1],
          playerIds[court.teamA[1] - 1],
        ] as [PlayerId, PlayerId],
        teamB: [
          playerIds[court.teamB[0] - 1],
          playerIds[court.teamB[1] - 1],
        ] as [PlayerId, PlayerId],
      })),
    ]),
  ) as Record<GameNumber, CourtDefinition[]>;
}

function rotatePlayers(playerIds: PlayerId[], offset: number): PlayerId[] {
  const normalizedOffset = ((offset % playerIds.length) + playerIds.length) % playerIds.length;
  return playerIds
    .slice(normalizedOffset)
    .concat(playerIds.slice(0, normalizedOffset));
}

function createTeamsForCourt(
  players: [PlayerId, PlayerId, PlayerId, PlayerId],
  roundIndex: number,
): Pick<CourtDefinition, "teamA" | "teamB"> {
  switch (roundIndex % 3) {
    case 1:
      return {
        teamA: [players[0], players[2]],
        teamB: [players[1], players[3]],
      };
    case 2:
      return {
        teamA: [players[0], players[3]],
        teamB: [players[1], players[2]],
      };
    default:
      return {
        teamA: [players[0], players[1]],
        teamB: [players[2], players[3]],
      };
  }
}

function buildSchedules(
  playerIds: PlayerId[],
  totalCourts: number,
  gameNumbers: GameNumber[],
): Record<GameNumber, CourtDefinition[]> {
  const playersPerRound = totalCourts * PLAYERS_PER_COURT;

  if (playerIds.length !== playersPerRound) {
    throw new Error(
      `La configuracion actual requiere ${playersPerRound} jugadores para ${totalCourts} canchas.`,
    );
  }

  const optimizedSchedule = buildOptimizedStandardSchedule(
    playerIds,
    totalCourts,
    gameNumbers,
  );

  if (optimizedSchedule) {
    return optimizedSchedule;
  }

  return Object.fromEntries(
    gameNumbers.map((gameNumber, roundIndex) => {
      const rotatedPlayers = rotatePlayers(playerIds, roundIndex * 3);
      const courts = Array.from({ length: totalCourts }, (_, courtIndex) => {
        const startIndex = courtIndex * PLAYERS_PER_COURT;
        const courtPlayers = rotatedPlayers.slice(
          startIndex,
          startIndex + PLAYERS_PER_COURT,
        ) as [PlayerId, PlayerId, PlayerId, PlayerId];
        const teams = createTeamsForCourt(courtPlayers, roundIndex + courtIndex);

        return {
          courtLabel: `Cancha ${courtIndex + 1}`,
          ...teams,
        };
      });

      return [gameNumber, courts];
    }),
  ) as Record<GameNumber, CourtDefinition[]>;
}

export const PLAYER_IDS = buildPlayerIds(TOURNAMENT_CONFIG.totalPlayers);
export const GAME_NUMBERS = buildGameNumbers(TOURNAMENT_CONFIG.roundCount);
export const GAME_FIELDS = buildGameFields(GAME_NUMBERS);
export const GAME_SCHEDULES = buildSchedules(
  PLAYER_IDS,
  TOURNAMENT_CONFIG.totalCourts,
  GAME_NUMBERS,
);

export function isPlayerId(value: string): value is PlayerId {
  return PLAYER_IDS.includes(value);
}

export function getPlayerNumber(playerId: string): number | null {
  const match = /^jugador(\d+)$/.exec(playerId);
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
  return `j${gameNumber}`;
}

export function getGameLabel(gameNumber: GameNumber): string {
  return `Juego ${gameNumber}`;
}

export function getScoreForGame(
  player: PlayerDocument,
  gameNumber: GameNumber,
): number {
  const score = player[getGameField(gameNumber)];
  return typeof score === "number" ? score : 0;
}

export function getTotalPoints(player: PlayerDocument): number {
  return GAME_NUMBERS.reduce(
    (total, gameNumber) => total + getScoreForGame(player, gameNumber),
    0,
  );
}

export function getPlayersForGame(gameNumber: GameNumber): PlayerId[] {
  return (GAME_SCHEDULES[gameNumber] ?? []).flatMap((court) => [
    ...court.teamA,
    ...court.teamB,
  ]);
}

export function hasSubmittedScore(
  player: PlayerDocument | undefined,
  gameNumber: GameNumber,
): boolean {
  return typeof player?.[getGameField(gameNumber)] === "number";
}

export function getCourtSubmissionStatus(
  playerDocuments: Partial<Record<PlayerId, PlayerDocument>>,
  gameNumber: GameNumber,
  playerIds: PlayerId[],
): CourtSubmissionStatus {
  const submittedCount = playerIds.filter((playerId) =>
    hasSubmittedScore(playerDocuments[playerId], gameNumber),
  ).length;

  if (submittedCount === 0) {
    return "empty";
  }

  if (submittedCount === playerIds.length) {
    return "complete";
  }

  return "partial";
}

export function getCourtForGame(
  gameNumber: GameNumber,
  courtNumber: number,
): CourtDefinition | null {
  const courts = GAME_SCHEDULES[gameNumber] ?? [];
  return courts[courtNumber - 1] ?? null;
}

export function normalizePlayerName(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("es");
}

export function getPlayerAssignments(playerId: PlayerId): PlayerAssignment[] {
  return GAME_NUMBERS.flatMap((gameNumber) => {
    const courts = GAME_SCHEDULES[gameNumber] ?? [];

    return courts.flatMap((court, index) => {
      if (court.teamA.includes(playerId)) {
        return [
          {
            gameNumber,
            courtNumber: index + 1,
            courtLabel: court.courtLabel,
            partnerId: court.teamA.find((id) => id !== playerId) as PlayerId,
            opponentIds: court.teamB,
          },
        ];
      }

      if (court.teamB.includes(playerId)) {
        return [
          {
            gameNumber,
            courtNumber: index + 1,
            courtLabel: court.courtLabel,
            partnerId: court.teamB.find((id) => id !== playerId) as PlayerId,
            opponentIds: court.teamA,
          },
        ];
      }

      return [];
    });
  });
}
