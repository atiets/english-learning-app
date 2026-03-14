import type { Request, Response } from "express";
import express from "express";
import { connectDB } from "./utils/db.js";
import flashcardRouter from "./routes/flashcard.routes.js";

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
    res.json({ status: "OK" });
});

app.use("/api/flashcards", flashcardRouter);

export default app;