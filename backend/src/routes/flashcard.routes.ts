import { Router } from "express";
import { createFlashcard, getFlashcards, getFlashcardById, updateFlashcard, deleteFlashCard } from "../controllers/flashcard.controller.js";

const router = Router();

router.post("/", createFlashcard);
router.get("/", getFlashcards);
router.get("/:id", getFlashcardById);
router.put("/:id", updateFlashcard);
router.delete("/:id", deleteFlashCard);

export default router;