import { rC } from "../../storage/activeStorage";
import { startMatch, moveInMatch, saveMatch } from "../match.service";
import { createBoard } from "../game.service";

// Мокаем контракта
jest.mock("../contracts/contract.service", () => ({
  createMatch_onContract: jest.fn().mockResolvedValue(42),
  finishMatch_onContract: jest.fn().mockResolvedValue(undefined),
  getMatchInfo: jest.fn().mockResolvedValue({
    players: ["player1_game0", "player2_game0"], 
  }),
}));

describe("5 игр подряд с проверкой балансов", () => {
  const STAKE = 100;

  beforeEach(async () => {
    await rC.flushDb();
  });

  afterEach(async () => {
    await rC.flushDb();
  });

  test("Баланс игроков не теряется при 5 последовательных играх", async () => {
    const GAME_COUNT = 5;

    for (let g = 0; g < GAME_COUNT; g++) {
      const player1 = `player1_game${g}_${Date.now()}`;
      const player2 = `player2_game${g}_${Date.now()}`;

      const board = createBoard(STAKE * 2, 12);

      // Создаем матч с заполнением всех обязательных полей
      let match = startMatch({
        id: `match_${g}_${Date.now()}`,
        players: [player1, player2],
        status: "active",
        board,
        balances: {},
        createdAt: Date.now(),
        creator: player1,
        bid: STAKE,
        total: STAKE * 2,
        count: 12,
        turnStartedAt: Date.now(),
        onChainId: `${g + 1}`,
      });

      await saveMatch(match);

      let currentPlayer = match.currentTurn!;
      let moveId = 0;

      // Делаем все 12 ходов
      for (let boxId = 0; boxId < 12; boxId++) {
        const result = await moveInMatch(
          match.id,
          currentPlayer,
          boxId,
          `move_${moveId}_${Date.now()}`
        );

        expect(result.error).toBeUndefined();

        match = result.match!;
        currentPlayer = match.currentTurn ?? currentPlayer;
        moveId++;


        // console.log(`Игра ${g + 1}, ход ${boxId + 1}:`, match.balances);
      }

      // Финальная проверка после игры
      const finalBalances = Object.values(match.balances);
      const finalSum = finalBalances.reduce((a, b) => a + b, 0);

      console.log(
        `Игра ${g + 1} завершена. Балансы:`,
        match.balances,
        "Сумма:", finalSum
      );

      expect(finalSum).toBe(STAKE * 2);        
      expect(match.status).toBe("finished");     // матч завершен
      expect(match.board.every((b) => b.openedBy)).toBe(true); // все клетки открыты
    }
  }, 20000); //  20 секунд на 5 игр
});
