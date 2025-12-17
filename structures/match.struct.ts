/* Структура матча и сопутствующих сущностей */

/* игрокая клетка и ее свойства */ 
export interface Box {
id: number, 
value: number, // поинты внутри клетки
openedBy?: string // кто открыл клетку
}

/* структура матча */
export interface Match {
  id: string,
  players: [string, string]  
  board: Box[],
  balances: Record<string, number> // балансы игроков 
  currentTurn: string // чей ход
  total: number, // суммарный баланс в игре
  count: number, // количество боксов
  status: 'waiting' | 'active' | 'finished' //статус игрового матча
}

/* структура результата хода */
export interface MoveResult {
  match: Match
  error?: string
}