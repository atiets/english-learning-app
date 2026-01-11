import FlashcardCard from "../../components/ui/FlashcardCard";
import { Flashcard } from "../../types/flashcard";

const mockFlashcards: Flashcard[] = [
    {
        id: "1",
        term: "Ebullient",
        definition: "Cheerful and full of energy",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]

const FlashcardsPage = () => {
    return (
        <div className="max-w-md mx-auto p-4">
            <FlashcardCard flashcard={mockFlashcards[0]} />
        </div>
    )
}

export default FlashcardsPage;