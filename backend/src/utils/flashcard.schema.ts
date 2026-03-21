import { z } from "zod";

export const flashcardSchema = z.object({
    word: z.string().min(1, "Word is required"),
    meaning: z.string().min(1, "Meaning is required"),
    example: z.string().optional(),
    image: z.string().optional(),
    audio: z.string().optional(),
    category: z.string().optional(),
    level: z.string().optional(),
    tags: z.array(z.string()).optional(),
    userId: z.string().optional(),
    deckId: z.string().optional(),

    created_by: z.string().optional(),
    updated_by: z.string().optional(),
});
