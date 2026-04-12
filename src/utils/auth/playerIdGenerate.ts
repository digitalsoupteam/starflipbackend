import { db } from "../../storage/playersDataBase";

function generateDisplayId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `#${random}`;
}

export function playerDisplayIdGenerates(): string {
  const checkStmt = db.prepare(`
    SELECT 1 FROM players WHERE displayId = ?
  `);

  let id: string;
  let exists = true;

  while (exists) {
    id = generateDisplayId();
    exists = !!checkStmt.get(id);
  }

  return id!;
}