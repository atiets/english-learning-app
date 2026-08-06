import { Router } from "express";
import {
  createFlashcard,
  getFlashcards,
  getDueFlashcards,
  getFlashcardById,
  updateFlashcard,
  deleteFlashCard,
  reviewFlashcard
} from "../controllers/flashcard.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { flashcardSchema } from "../utils/flashcard.schema.js";

const router = Router();

router.post("/", validate(flashcardSchema), createFlashcard);
router.get("/", getFlashcards);
router.get("/due", getDueFlashcards);
router.get("/:id", getFlashcardById);
router.put("/:id", validate(flashcardSchema), updateFlashcard);
router.delete("/:id", deleteFlashCard);
router.post("/:id/review", reviewFlashcard);

export default router;