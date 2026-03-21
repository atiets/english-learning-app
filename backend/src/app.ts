import type { Request, Response } from "express";
import express from "express";
import flashcardRouter from "./routes/flashcard.routes.js";
import { logger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req: Request, res: Response) => {
    res.json({ status: "OK" });
});

app.use("/api/flashcards", flashcardRouter);
app.use(errorHandler);

export default app;