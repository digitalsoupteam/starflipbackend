export interface Box {
id: number, 
value: string, 
openedBy?: string 
}

export interface Match {
  id: string                   
  onChainId?: string,           // id from contract 

  token?: string                   // ETH for start 
  createdAt: number;              
  creator: string;                

  players: string[];             

  bid: string;                    
  total: string;                  // (bid * 2)
  count: number;                  // static 12

  board: Box[];                   
  boardHash?: string;            
  balances: Record<string, string>; 

  currentTurn?: string;           
  lastMoveId?: string;           
  turnStartedAt: number;        


  status: 'waiting' | 'active' | 'finished'; //status 
}


export interface MoveResult {
  match?: Match
  error?: string
}

