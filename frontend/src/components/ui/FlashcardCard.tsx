
import { useState } from "react";
import { Flashcard } from "../../types/flashcard";

type FlashcardCardProps = {
    flashcard: Flashcard;
}

const FlashcardCard = ({ flashcard}: FlashcardCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }
    
    return (
        <div 
        onClick = {handleFlip}
        className="border border-black rounded-xl text-center p-8 cursor-pointer bg-amber-50 hover:bg-amber-100 transition min-h-[160px] flex flex-col justify-center"
        >
        <p className="text-xl font-serif">
            {isFlipped ? flashcard.definition : flashcard.term}
        </p>
        <p className="text-xs text-gray-500 mt-4">
            Click to Flip
        </p>
        </div>
    )
}

export default FlashcardCard;   