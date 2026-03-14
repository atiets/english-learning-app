import { Router } from "express";
import { createFlashcard, getFlashcards } from "../controllers/flashcard.controller.js";

const router = Router();

router.post("/", createFlashcard);
router.get("/", getFlashcards);

export default router;