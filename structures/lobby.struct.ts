
/* структура игрового лобби */

export interface Lobby {
  id: string // айди лобби, далее матча
  creator: string  // айди создателя матча
  opponent?: string // айди оппонента 
  bid: number // базовая ставка от одного игрока 
  status: 'open' | 'matched' // статус лобби 
  createdAt: number //timestamp 
}
