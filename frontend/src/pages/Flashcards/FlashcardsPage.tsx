import { useState } from "react";
import { Flashcard } from "../../types/flashcard";
import CreateFlashcardForm from "../../components/ui/CreateFlashcardForm";


const FlashcardsPage = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    const addFlashcard = (flashcard: Flashcard) => {
        setFlashcards((prev) => [...prev, flashcard]);
    }

    return (
        <div className="max-w-md mx-auto p-4 space-y-4">
            <CreateFlashcardForm onAdd={addFlashcard} />
            <ul className="space-y-2">
                {flashcards.map((flashcard) => (
                    <li key={flashcard.id} className="border p-2 rounded">
                        <strong>{flashcard.term}</strong>
                        <p>{flashcard.definition}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FlashcardsPage;