import { type Request, type Response } from "express";
import Flashcard from "../models/Flashcard.js";

export const createFlashcard = async (req: Request, res: Response) => {
    try {
        const flashcard = await Flashcard.create(req.body);
        res.status(201).json(flashcard);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getFlashcards = async (req: Request, res: Response) => {
    try {
        const { deckID } = req.query;
        const flashcards = await Flashcard.find({ deckId: deckID });
        res.status(200).json(flashcards);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getFlashcardById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const flashcard = await Flashcard.findById(id);
        if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
        return res.status(200).json(flashcard);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateFlashcard = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const flashcard = await Flashcard.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
        )
        if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
        return res.status(200).json(flashcard);
    } catch (error) {
        return res.status(500).json({ message: "Update failed" });
    }
}

export const deleteFlashCard = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const flashcard = await Flashcard.findByIdAndDelete(id);
        if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
        return res.status(200).json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
}