import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import { Flashcard } from "../../types/flashcard";

const FlashcardCard = ({ flashcard }: { flashcard: Flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => setIsFlipped(false), [flashcard.id]);
  const flip = () => setIsFlipped((value) => !value);

  return (
    <div className="retro-card vocab-card" role="button" tabIndex={0} aria-pressed={isFlipped} aria-label={`${isFlipped ? "Definition" : "Word"}: ${isFlipped ? flashcard.meaning : flashcard.word}. Press Enter or Space to ${isFlipped ? "show the word" : "reveal the definition"}.`} onClick={flip} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); flip(); } }}>
      <span className="technical-label card-tab">VOCABULARY / INDEX</span>
      <span className="technical-label card-face-label">{isFlipped ? "SIDE B / DEFINITION" : "SIDE A / WORD"}</span>
      {isFlipped ? <p className="vocab-meaning">{flashcard.meaning}</p> : <p className="vocab-word">{flashcard.word}</p>}
      <span className="card-cue technical-label"><RotateCw size={15} aria-hidden="true" />{isFlipped ? "Show word" : "Reveal meaning"}</span>
    </div>
  );
};

export default FlashcardCard;
