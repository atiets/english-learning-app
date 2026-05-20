import { useState } from "react";
import { Flashcard } from "../../types/flashcard";

type FlashcardCardProps = {
  flashcard: Flashcard;
};

const FlashcardCard = ({ flashcard }: FlashcardCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleFlip}
className=" bg-cardBg border-2 border-darkBorder rounded-[32px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] min-h-[240px] p-8 flex flex-col justify-center items-center transition-all duration-200 hover:translate-y-[2px] cursor-pointer"    >
      <p className="text-4xl font-bold tracking-wide text-textPrimary">
        {isFlipped ? flashcard.word : flashcard.meaning}
      </p>
      <p className="mt-6 text-sm italic text-primaryGreen">tap to reveal ✨</p>
    </div>
  );
};

export default FlashcardCard;
