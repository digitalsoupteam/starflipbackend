import axios from "axios";
import { loginWithTelegram } from "../../utils/auth/auth";
import { depositBalance } from "../../storage/playersDataBaseActions";
import { rC } from "../../storage/activeMatchesStorage";

const BASE = process.env.GAME_BASE_URL ?? "http://localhost:3000/game";
const BID = "25"; // fixed 25 USDT bid

function createPlayer(telegramId: string) {
  const { token, player } = loginWithTelegram(telegramId);
  return { token, playerId: player.playerId };
}

function auth(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getToken(response: any): string {
  return response.data.token;
}

describe("Game e2e", () => {
  let player1: { token: string; playerId: string };
  let player2: { token: string; playerId: string };
  let matchId: string;

  // Уникальный префикс для каждого запуска — чтобы не пересекаться с прошлыми данными в SQLite
  const uid = Date.now();

  beforeAll(async () => {
    // Чистим Redis перед тестами — убираем матчи от прошлых запусков
    await rC.flushDb();
  });

  afterAll(async () => {
    await rC.quit();
  });

  /* ===== AUTH ===== */
  describe("Auth", () => {
    test("Создаём двух игроков через Telegram логин", () => {
      // Уникальные telegramId при каждом запуске — иначе SQLite вернёт старого игрока с балансом
      player1 = createPlayer(`tg_${uid}_1`);
      player2 = createPlayer(`tg_${uid}_2`);

      expect(player1.token).toBeTruthy();
      expect(player2.token).toBeTruthy();
      expect(player1.playerId).not.toBe(player2.playerId);

      console.log("Player1:", player1.playerId);
      console.log("Player2:", player2.playerId);
    });

    test("Запрос без токена возвращает 401", async () => {
      const res = await axios.post(
        `${BASE}/join`,
        { bid: BID, token: "USDT" },
        { validateStatus: () => true },
      );
      expect(res.status).toBe(401);
    });

    test("Запрос с невалидным токеном возвращает 401", async () => {
      const res = await axios.post(
        `${BASE}/join`,
        { bid: BID, token: "USDT" },
        {
          headers: { Authorization: "Bearer invalid.token.here" },
          validateStatus: () => true,
        },
      );
      expect(res.status).toBe(401);
    });
  });

  /* ===== WALLET ===== */
  describe("Wallet", () => {
    test("У игрока при регистрации создался кошелёк", () => {
      // Достаём игрока из БД напрямую
      const {
        findPlayerById,
      } = require("../../storage/playersDataBaseActions");
      const record = findPlayerById(player1.playerId);

      console.log("Player1 wallet:", record.walletAddress);

      // Кошелёк должен существовать
      expect(record.walletAddress).toBeTruthy();
      expect(record.encryptedPrivateKey).toBeTruthy();

      // Адрес должен быть валидным EVM address (0x + 40 hex символов)
      expect(record.walletAddress).toMatch(/^0x[a-fA-F0-9]{40}$/);

      // У двух игроков должны быть разные кошельки
      const record2 = findPlayerById(player2.playerId);
      expect(record.walletAddress).not.toBe(record2.walletAddress);
    });

    test("Можно найти игрока по адресу кошелька — для зачисления депозита", () => {
      const {
        findPlayerById,
        findPlayerByWalletAddress,
      } = require("../../storage/playersDataBaseActions");
      const record = findPlayerById(player1.playerId);

      // Ищем игрока по его walletAddress — так будет работать мониторинг депозитов
      const foundPlayer = findPlayerByWalletAddress(record.walletAddress);

      console.log("Found by wallet:", foundPlayer.playerId);

      expect(foundPlayer).toBeTruthy();
      expect(foundPlayer.playerId).toBe(player1.playerId);
    });
  });

  /* ===== MATCHMAKING ===== */
  describe("Matchmaking", () => {
    test("Игрок без баланса не может войти в матч", async () => {
      const res = await axios.post(
        `${BASE}/join`,
        { bid: BID, token: "USDT" },
        { ...auth(player1.token), validateStatus: () => true },
      );
      expect(res.status).toBe(500);
      expect(res.data.error).toMatch(/insufficient balance/i);
    });

    test("Пополняем балансы игроков напрямую через БД", () => {
      depositBalance(player1.playerId, "200"); // 200 USDT
      depositBalance(player2.playerId, "200");
    });

    test("Два игрока находят друг друга и матч стартует", async () => {
      // Player1 входит первым — создаёт матч со статусом waiting
      const res1 = await axios.post(
        `${BASE}/join`,
        { bid: BID, token: "USDT" },
        auth(player1.token),
      );

      const createdMatchId = res1.data.match.matchId;
      console.log(
        "Player1 match:",
        createdMatchId,
        "status:",
        res1.data.match.status,
      );

      // Убеждаемся что Player1 создал матч и ждёт
      expect(res1.data.match.status).toBe("waiting");

      // Player2 входит — находит матч Player1
      const res2 = await axios.post(
        `${BASE}/join`,
        { bid: BID, token: "USDT" },
        auth(player2.token),
      );

      console.log("Player2 status:", res2.data.match.status);

      // Player2 должен попасть в матч Player1
      expect(res2.data.match.matchId).toBe(createdMatchId);
      expect(res2.data.match.status).toBe("active");

      // Обновляем токены
      player1.token = getToken(res1);
      player2.token = getToken(res2);

      // Player1 делает resume чтобы получить актуальное состояние (active)
      const resumeRes = await axios.post(
        `${BASE}/resume`,
        {},
        auth(player1.token),
      );
      player1.token = getToken(resumeRes);

      expect(resumeRes.data.match.status).toBe("active");

      matchId = createdMatchId;
      console.log("Match started:", matchId);
    }, 15000);
  });

  /* ===== RECONNECT ===== */
  describe("Reconnect", () => {
    test("Игрок может восстановить сессию через /resume", async () => {
      const res = await axios.post(`${BASE}/resume`, {}, auth(player1.token));

      player1.token = getToken(res);

      expect(res.data.match.matchId).toBe(matchId);
      expect(res.data.match.status).toBe("active");
      expect(res.data.message).toBe("session restored");
    });

    test("Неизвестный игрок получает no_active_match", async () => {
      // Уникальный stranger при каждом запуске
      const stranger = createPlayer(`tg_stranger_${uid}`);

      const res = await axios.post(
        `${BASE}/resume`,
        {},
        { ...auth(stranger.token), validateStatus: () => true },
      );

      expect(res.status).toBe(404);
      expect(res.data.reason).toBe("no_active_match");
    });
  });

  /* ===== GAMEPLAY ===== */
  describe("Gameplay", () => {
    test("Игрок не может сделать ход не в свою очередь", async () => {
      const matchRes = await axios.get(`${BASE}/match`, auth(player1.token));
      const currentTurn = matchRes.data.match.currentTurn;
      const wrongPlayer = currentTurn === player1.playerId ? player2 : player1;

      const res = await axios.post(
        `${BASE}/move`,
        { matchId, boxId: 0, clientMoveId: "move_wrong_1" },
        { ...auth(wrongPlayer.token), validateStatus: () => true },
      );

      expect(res.status).toBe(400);
      expect(res.data.error).toMatch(/not your turn/i);

      // 👇 ДОБАВИТЬ: ждём пока cooldown истечёт
      console.log("Waiting for cooldown...");
      await new Promise((r) => setTimeout(r, 15500));
    }, 20000); // таймаут теста 20 секунд

    test("Игроки по очереди открывают все 12 клеток — матч завершается", async () => {
      const matchRes = await axios.get(`${BASE}/match`, auth(player1.token));
      const firstTurn = matchRes.data.match.currentTurn;
      let currentPlayer1Turn = firstTurn === player1.playerId;

      for (let boxId = 0; boxId < 12; boxId++) {
        const currentPlayer = currentPlayer1Turn ? player1 : player2;

        const res = await axios.post(
          `${BASE}/move`,
          { matchId, boxId, clientMoveId: `move_${boxId}` },
          { ...auth(currentPlayer.token), validateStatus: () => true }, // 👈 не бросаем ошибку
        );

        // 👇 логируем что вернул сервер при ошибке
        if (res.status !== 200) {
          console.log(`Move boxId=${boxId} failed:`, res.status, res.data);
        }

        if (currentPlayer === player1) {
          player1.token = getToken(res);
        } else {
          player2.token = getToken(res);
        }

        expect(res.status).toBe(200);
        expect(res.data.match).toBeDefined();

        if (boxId === 11) {
          expect(res.data.match.status).toBe("finished");
          console.log("Final balances:", res.data.match.balances);
        }

        currentPlayer1Turn = !currentPlayer1Turn;
      }
    });

    test("Результат матча доступен через /result/:matchId", async () => {
      const res = await axios.get(
        `${BASE}/result/${matchId}`,
        auth(player1.token),
      );

      expect(res.data.match.status).toBe("finished");
      expect(res.data.match.board).toHaveLength(12);
      res.data.match.board.forEach((box: any) => {
        expect(box.value).toBeDefined();
        expect(box.openedBy).toBeDefined();
      });
    });
  });

  /* ===== AFK ===== */
  describe("AFK", () => {
    test("Игрок уходит в AFK — матч завершается по таймауту", async () => {
      // Новые игроки с уникальными ID
      const afkPlayer1 = createPlayer(`tg_afk_${uid}_1`);
      const afkPlayer2 = createPlayer(`tg_afk_${uid}_2`);

      depositBalance(afkPlayer1.playerId, "200");
      depositBalance(afkPlayer2.playerId, "200");

      // Player1 создаёт матч
      const r1 = await axios.post(
        `${BASE}/join`,
        { bid: BID, token: "USDT" },
        auth(afkPlayer1.token),
      );
      expect(r1.data.match.status).toBe("waiting");

      // Player2 присоединяется
      const r2 = await axios.post(
        `${BASE}/join`,
        { bid: BID, token: "USDT" },
        auth(afkPlayer2.token),
      );
      expect(r2.data.match.status).toBe("active");

      const afkMatchId = r1.data.match.matchId;
      expect(afkMatchId).toBeDefined();

      // Патчим turnStartedAt — симулируем что игрок не ходил 6 минут
      const raw = await rC.get(`match:${afkMatchId}`);
      const match = JSON.parse(raw!);
      match.turnStartedAt = Date.now() - 6 * 60 * 1000;
      await rC.set(`match:${afkMatchId}`, JSON.stringify(match));

      // Ждём следующую итерацию AFK watcher (15 секунд + запас)
      console.log("Waiting for AFK watcher...");
      await new Promise((r) => setTimeout(r, 16000));

      const res = await axios.get(`${BASE}/result/${afkMatchId}`, {
        ...auth(afkPlayer1.token),
        validateStatus: () => true,
      });

      expect(res.data.match.status).toBe("finished");
      console.log("AFK final balances:", res.data.match.balances);
    }, 30000);
  });
});
