/* Поиск первой свободной клетки, нужен для autoTurn */ 

import { Box } from "../structures/match.struct";
export function findFirstFreeBox(board: Box[]): Box | undefined { return board.find(b => !b.openedBy); }