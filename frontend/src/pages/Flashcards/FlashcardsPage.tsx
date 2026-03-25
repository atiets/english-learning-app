import { useState, useEffect } from "react";
import FlashcardCard from "../../components/ui/FlashcardCard";
import { Flashcard } from "../../types/flashcard";
import { getFlashcards } from "../../services/api";

const FlashcardsPage = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }

    const prevCard = () => {
        setCurrentIndex((prev) => prev === 0 ? flashcards.length - 1 : prev - 1);
    }


    useEffect(() => {
        const loadFlashcards = async () => {
            try {
                const data = await getFlashcards();
                setFlashcards(data);
            } catch (error) {
                setError("Failed to fetch flashcards");
            } finally {
                setLoading(false);
            }
        }
        loadFlashcards();
    }, []);

    if (flashcards.length === 0) return;

    if (loading) {
        return (
            <div className="max-w-md mx-auto p-4">
                <div className="w-full h-64 border-2 border-black bg-[#fef3c7] shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col items-center justify-center p-6 animate-pulse">
                    <div className="w-1/2 h-8 bg-black/20 mb-4"></div>
                    <div className="w-3/4 h-4 bg-black/20"></div>
                </div>

                <div className="flex justify-between mt-8">
                    <div className="w-20 h-10 border-2 border-black bg-black/10 animate-pulse shadow-[3px_3px_0_0_rgba(0,0,0,1)]"></div>
                    <div className="w-20 h-10 border-2 border-black bg-black/10 animate-pulse shadow-[3px_3px_0_0_rgba(0,0,0,1)]"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-4">
                <div className="w-full h-64 border-2 border-black bg-[#fef3c7] shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col items-center justify-center p-6">
                    <div className="w-1/2 h-8 bg-black/20 mb-4"></div>
                    <div className="w-3/4 h-4 bg-black/20"></div>
                </div>

                <div className="flex justify-between mt-8">
                    <div className="w-20 h-10 border-2 border-black bg-black/10 shadow-[3px_3px_0_0_rgba(0,0,0,1)]"></div>
                    <div className="w-20 h-10 border-2 border-black bg-black/10 shadow-[3px_3px_0_0_rgba(0,0,0,1)]"></div>
                </div>
            </div>
        )
    }

    if (flashcards.length === 0) {
        return (
            <div className="max-w-md mx-auto p-4">
                <div className="w-full h-64 border-2 border-black bg-[#fef3c7] shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col items-center justify-center p-6">
                    <div className="w-1/2 h-8 bg-black/20 mb-4"></div>
                    <div className="w-3/4 h-4 bg-black/20"></div>
                </div>

                <div className="flex justify-between mt-8">
                    <div className="w-20 h-10 border-2 border-black bg-black/10 shadow-[3px_3px_0_0_rgba(0,0,0,1)]"></div>
                    <div className="w-20 h-10 border-2 border-black bg-black/10 shadow-[3px_3px_0_0_rgba(0,0,0,1)]"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <FlashcardCard flashcard={flashcards[currentIndex]} />
            <p className="text-center mt-4 text-sm border border-black inline-block px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {currentIndex + 1} / {flashcards.length}
            </p>
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