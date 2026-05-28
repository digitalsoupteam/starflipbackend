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

  bid: string;       // per-player bid (WEI) — full amount deducted from balance
  fee: string;       // per-player service fee (WEI) = bid * 5% — taken when match starts
  total: string;     // game pot = (bid - fee) * 2 — what the board distributes
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
