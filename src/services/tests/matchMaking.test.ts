import { joinOrCreateMatch } from "../matchMaking.service";
import { rC } from "../../../storage/activeStorage";
import { Match, Box } from "../../../structures/match.struct";
import { saveFinishedMatch } from "../utils/match.repository";

async function runTest() {
  console.log("Тест: создание нового матча");

  // очищаем Redis перед тестом
  await rC.flushAll();

  const player1 = "player1";
  const bid = 50;

  // создаём матч первым игроком
  const match1 = await joinOrCreateMatch(player1, bid);
  console.log("Матч создан:", match1.id);
  console.assert(match1.players.includes(player1), "Первый игрок должен быть в матче");
  console.assert(match1.status === "waiting", "Статус матча должен быть waiting");

  console.log("\nТест: присоединение второго игрока");

  const player2 = "player2";
  const match2 = await joinOrCreateMatch(player2, bid);

  console.log("Второй игрок присоединился к матчу:", match2.id);
  console.assert(match2.id === match1.id, "Игрок должен присоединиться к тому же матчу");
  console.assert(match2.players.includes(player2), "Второй игрок должен быть в матче");
  console.assert(match2.players.includes(player1), "Первый игрок должен остаться в матче");
  console.assert(match2.status === "active", "Статус матча должен стать active");

  console.log("\nТест: завершение матча");

  // для теста просто откроем все клетки по очереди
  const finishedMatch: Match = { ...match2 };
  finishedMatch.board = finishedMatch.board.map((box: Box, index) => ({
    ...box,
    openedBy: index % 2 === 0 ? player1 : player2
  }));
  finishedMatch.status = "finished";

  // вычисляем результат и сохраняем в БД
  await saveFinishedMatch(finishedMatch);

  console.log("Матч завершён и сохранён в базе:", finishedMatch.id);

  console.log("\nТест: третий игрок создаёт новый матч");

  const player3 = "player3";
  const match3 = await joinOrCreateMatch(player3, bid);

  console.log("Третий игрок получил новый матч:", match3.id);
  console.assert(match3.id !== match1.id, "Новый матч должен быть другим");
  console.assert(match3.players.includes(player3), "Третий игрок должен быть в новом матче");
  console.assert(match3.status === "waiting", "Статус нового матча должен быть waiting");

  console.log("\nВсе тесты пройдены ✅");
}

runTest().catch(err => console.error("Ошибка в тесте:", err));
