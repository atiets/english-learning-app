import { useState } from "react";
import FlashcardCard from "../../components/ui/FlashcardCard";
import { Flashcard } from "../../types/flashcard";

const mockFlashcards: Flashcard[] = [
    {
        id: "1",
        term: "Ebullient",
        definition: "Cheerful and full of energy",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        term: "Laconic",
        definition: "Using very few words",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        term: "Obfuscate",
        definition: "To render obscure, unclear, or unintelligible",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const FlashcardsPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = ()=> {
        setCurrentIndex((prev) => (prev + 1) % mockFlashcards.length);
    }

    const prevCard = () => {
        setCurrentIndex((prev) => prev === 0 ? mockFlashcards.length - 1 : prev - 1);
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <FlashcardCard flashcard={mockFlashcards[currentIndex]} />
            <div className="flex justify-between mt-4">
                <button onClick={prevCard} className="border px-4 py-2 rounded">
                    Prev
                </button>
                <button onClick={nextCard} className="border px-4 py-2 rounded">
                    Next
                </button>
            </div>
        </div>
    )
}

export default FlashcardsPage;