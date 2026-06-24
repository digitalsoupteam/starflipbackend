export interface Box {
  id: number;
  value: string;
  openedBy?: string;
}

export interface Match {
  matchId: string;

  createdAt: number;
  creator: string;

  players: string[];

  bid: string;       // per-player charge in USDT, at most one decimal place
  fee: string;       // per-player service fee in USDT
  total: string;     // game pot in USDT = (bid - fee) * 2
  count: number;     // static 12

  board: Box[];
  boardHash?: string;
  balances: Record<string, string>;

  currentTurn?: string;
  lastMoveId?: string;
  turnStartedAt: number;

  status: "waiting" | "active" | "finished";
}

export interface MoveResult {
  match?: Match;
  error?: string;
}
