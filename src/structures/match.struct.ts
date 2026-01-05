/* Структура матча и сопутствующих сущностей */

/* игрокая клетка и ее свойства */ 
export interface Box {
id: number, 
value: number, // поинты внутри клетки
openedBy?: string // кто открыл клетку
}

/* структура матча */
export interface Match {
  id: string                   // id матча
  createdAt: number;              // timestamp создания
  creator: string;                // создатель матча (players[0])

  players: string[];              // [player1] | [player1, player2]

  bid: number;                    // ставка одного игрока
  total: number;                  // общая сумма (bid * 2)
  count: number;                  // количество клеток (у нас базово 12)

  board: Box[];                   // игровое поле (пустое в waiting)
  boardHash?: string;            // хеш поля
  balances: Record<string, number>; // балансы игроков

  currentTurn?: string;           // чей ход (только при active)
  status: 'waiting' | 'active' | 'finished'; //status 
}


/* cтруктура результата хода */
export interface MoveResult {
  match?: Match
  error?: string
}

