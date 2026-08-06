import { useState } from "react";
import { createFlashcard } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { primaryButton } from "../../styles/button";
import { PlusCircle, Sparkles } from "lucide-react";

const CreateFlashcardForm = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createFlashcard({ word, meaning });
      setSuccess(true);
      setWord("");
      setMeaning("");
      setTimeout(() => {
        navigate("/flashcards");
      }, 1000);
    } catch (error) {
      alert("Failed to create flashcard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cardBg border-4 border-darkBorder rounded-[32px] p-8 shadow-[8px_8px_0px_0px_rgba(43,43,43,1)] space-y-6 max-w-xl mx-auto my-6 text-left">
      {success && (
        <div className="border-2 border-darkBorder bg-green-100 text-primaryGreen p-3 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] rounded-xl flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accentYellow fill-accentYellow" />
          <span>Flashcard created successfully! Redirecting...</span>
        </div>
      )}

      <div className="text-3xl font-black text-primaryRed uppercase tracking-tight flex items-center gap-2 justify-center pb-2 border-b-2 border-dashed border-darkBorder/30">
        <PlusCircle className="w-8 h-8" />
        <span>Create Flashcard</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-black text-textPrimary uppercase tracking-wider mb-2 ml-1">
            Word / Phrase
          </label>
          <input
            type="text"
            placeholder="e.g. Ephemeral"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full bg-beige border-2 border-darkBorder rounded-2xl px-5 py-3.5 text-lg font-bold text-textPrimary placeholder:text-textSoft/50 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(43,43,43,1)] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-textPrimary uppercase tracking-wider mb-2 ml-1">
            Meaning / Definition
          </label>
          <textarea
            placeholder="e.g. Lasting for a very short time"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            rows={4}
            className="w-full bg-beige border-2 border-darkBorder rounded-2xl px-5 py-3.5 text-lg font-bold text-textPrimary placeholder:text-textSoft/50 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(43,43,43,1)] transition-all resize-none"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={word.length === 0 || meaning.length === 0 || loading}
          className={`${primaryButton} w-full md:w-auto px-8 py-3 text-base uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <PlusCircle className="w-5 h-5" />
          <span>{loading ? "Adding..." : "Add Flashcard"}</span>
        </button>
      </div>
    </div>
  );
};

export default CreateFlashcardForm;
