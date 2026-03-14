import Flashcard from "../models/Flashcard.js";

export const createFlashcardService = async (data: any) => {
    return await Flashcard.create(data);
}

export const getFlashcardsService = async () => {
    return await Flashcard.find();
}

export const getFlashcardsByDeckIdService = async (deckId: string) => {
  return Flashcard.find({ deckId });
};

export const getFlashcardByIdService = async (id: string) => {
  return Flashcard.findById(id);
};

export const updateFlashcardService = async (id: string, data: any) => {
  return Flashcard.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFlashcardService = async (id: string) => {
  return Flashcard.findByIdAndDelete(id);
};