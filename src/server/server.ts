import express from "express"
import { gameRouter } from "./routes/game.routes";

const app = express()
const PORT = 3000;

const jsonMiddleware = express.json()

/* обработка запросов */
app.use(jsonMiddleware)
app.use("/game", gameRouter)
app.listen(PORT)