import { useState } from "react";
import { Flashcard } from "../../types/flashcard";
import { Sparkles } from "lucide-react";

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
      className="bg-cardBg border-4 border-darkBorder rounded-[32px] shadow-[8px_8px_0px_0px_rgba(43,43,43,1)] min-h-[260px] p-8 md:p-10 flex flex-col justify-center items-center transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(43,43,43,1)] cursor-pointer select-none relative overflow-hidden group"
    >
      {/* Small top label */}
      <span className="absolute top-4 left-6 text-[10px] font-black uppercase tracking-widest text-textSoft/60 border border-darkBorder/30 rounded px-2 py-0.5">
        Vocabulary Card
      </span>

      <p className="text-3xl md:text-4xl font-black tracking-normal text-textPrimary text-center leading-snug max-w-md my-4">
        {isFlipped ? flashcard.word : flashcard.meaning}
      </p>

      <div className="mt-6 px-4 py-1.5 bg-primaryGreen text-white text-xs font-black uppercase tracking-widest rounded-xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] flex items-center gap-1.5 group-hover:scale-105 transition-transform duration-200">
        <Sparkles className="w-3.5 h-3.5 text-accentYellow fill-accentYellow animate-pulse" />
        <span>{isFlipped ? "Tap to hide" : "Tap to flip"}</span>
      </div>
    </div>
  );
};

export default FlashcardCard;
