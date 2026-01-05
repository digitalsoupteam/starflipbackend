import { rC } from "../storage/activeStorage";

export async function generateId(): Promise<string> {
  let id: string;
  let exists: boolean;

  do {
    id = '';
    for (let i = 0; i < 12; i++) {
      id += Math.floor(Math.random() * 10);
    }

    // Проверяем, есть ли такой матч в Redis
    const waiting = await rC.exists(`waiting:match:${id}`);
    const active = await rC.exists(`match:${id}`);
    exists = !!waiting || !!active;
  } while (exists);

  return id;
}