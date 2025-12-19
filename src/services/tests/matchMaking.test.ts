import { findOrCreateMatch } from '../matchMaking.service';
import { waitingMatches } from '../../../storage/storage';

// Очищаем хранилище перед тестом
waitingMatches.clear();

console.log('--- Тест 1: Создание нового лобби ---');
const match1 = findOrCreateMatch('player1', 50);
console.log('Создан матч:', match1);
console.log('Ожидающие матчи:', Array.from(waitingMatches.values()).map(m => m.id));

console.log('\n--- Тест 2: Присоединение второго игрока ---');
const match2 = findOrCreateMatch('player2', 50);
console.log('Присоединился матч:', match2);
console.log('Ожидающие матчи после join:', Array.from(waitingMatches.values()).map(m => m.id));

// что оба игрока в одном матче
console.log('\nПроверка игроков в матче:', match2.players);
console.log('Статус матча:', match2.status);
console.log('Игровое поле:', match2.board);
