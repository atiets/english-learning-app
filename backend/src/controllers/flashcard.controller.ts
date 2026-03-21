import { type Request, type Response, type NextFunction } from "express";
import {
    createFlashcardService,
    getFlashcardsService,
    getFlashcardsByDeckIdService,
    getFlashcardByIdService,
    updateFlashcardService,
    deleteFlashcardService
} from "../services/flashcard.service.js";

export const createFlashcard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const flashcard = await createFlashcardService(req.body);
        res.status(201).json(flashcard);
    } catch (error) {
        next(error);
    }
}

export const getFlashcards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { deckID } = req.query;
        let flashcards;
        if (deckID) {
            flashcards = await getFlashcardsByDeckIdService(deckID as string);
        } else {
            flashcards = await getFlashcardsService();
        }

        res.status(200).json(flashcards);
    } catch (error) {
        next(error);
    }
}

export const getFlashcardById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const flashcard = await getFlashcardByIdService(id as string);
        
        if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
        return res.status(200).json(flashcard);
    } catch (error) {
        next(error);
    }
}

export const updateFlashcard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const flashcard = await updateFlashcardService(id as string, data);
        
        if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
        return res.status(200).json(flashcard);
    } catch (error) {
        next(error);
    }
}

export const deleteFlashCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const flashcard = await deleteFlashcardService(id as string);
        
        if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
        return res.status(200).json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        next(error);
    }
}