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
  mins_played: NumPair;
  goals: NumPair;
  goal_assist: NumPair;
  offtarget_att_assist: NumPair;
  pen_area_entries: NumPair;
  penalty_won: NumPair;
  penalty_save: NumPair;
  saves: NumPair;
  effective_clearance: NumPair;
  penalty_failed: NumPair;
  own_goals: NumPair;
  goals_conceded: NumPair;
  yellow_card: NumPair;
  second_yellow_card: NumPair;
  red_card: NumPair;
  total_scoring_att: NumPair;
  won_contest: NumPair;
  ball_recovery: NumPair;
  poss_lost_all: NumPair;
  penalty_conceded: NumPair;
  marca_points: NumPair;
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
