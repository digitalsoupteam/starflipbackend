import express from "express";
import { gameRouter } from "./routes/game.routes";
import cors from "cors";

export function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
  );

  app.options("*", cors());
  app.use(express.json());
  app.use("/game", gameRouter);

  app.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
  });
}
