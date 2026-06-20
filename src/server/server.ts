import express from "express";
import { gameRouter } from "./routes/game.routes";
import { authRouter } from "./routes/auth.routes";
import cors from "cors";

export function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT ?? 3000);
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use("/game", gameRouter);
  app.use("/auth", authRouter);
  app.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
  });
}
