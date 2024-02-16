interface Player {
  id: string;
  name: string;
  nickname: string;
  marketValue: number;
  teamId: number;
  playerStatus: string;
  points: number;
  averagePoints: number;
  lastSessionPoints: number;
  positionId: number;
  stats: PlayerStats[];
  historicalMarket: Value[];
}

interface PlayerStats {
  stats: Stats;
  weekNumber: number;
  totalPoints: number;
  isInIdealFormation: boolean;
}

interface Stats {
  minsPlayed: NumPair;
  goals: NumPair;
  goalAssist: NumPair;
  offtargetAttAssist: NumPair;
  penAreaEntries: NumPair;
  penaltyWon: NumPair;
  penaltySave: NumPair;
  saves: NumPair;
  effectiveClearance: NumPair;
  penaltyFailed: NumPair;
  ownGoals: NumPair;
  goalsConceded: NumPair;
  yellowCard: NumPair;
  secondYellowCard: NumPair;
  redCard: NumPair;
  totalScoringAtt: NumPair;
  wonContest: NumPair;
  ballRecovery: NumPair;
  possLostAll: NumPair;
  penaltyConceded: NumPair;
  marcaPoints: NumPair;
}

interface NumPair {
  first: number,
  second: number
}

interface Value {
  marketValue: number,
  date: string,
}

interface Team {
  id: number;
  name: string;
  slug: string;
  badgeColor: string;
  badgeWhite: string;
  badgeGray: string | null;
  shortName: string | null;
}

interface Match {
  id: number;
  local: Team;
  visitor: Team;
  localScore: number;
  visitorScore: number;
  date: string;
  time: string | null;
  matchState: number;
}

export {Player, PlayerStats, Stats, NumPair, Value, Match, Team}
