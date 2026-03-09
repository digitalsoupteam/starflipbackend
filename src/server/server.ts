import express from "express";
import { gameRouter } from "./routes/game.routes";
import cors from "cors";

export function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(
    cors({
      origin: "*",
    }),
  );
  app.use(express.json());
  app.use("/game", gameRouter);

  app.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
  });
}
