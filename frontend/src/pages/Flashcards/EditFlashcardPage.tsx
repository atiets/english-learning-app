import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFlashcardById, updateFlashcard } from "../../services/api";
import PageContainer from "../../components/layouts/PageContainer";
import {
  primaryButton,
  secondaryButton
} from "../../styles/button";
import {
  Edit,
  AlertTriangle,
  CheckCircle,
  Sparkles
} from "lucide-react";

const EditFlashcardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getFlashcardById(id!);
        setWord(data.word);
        setMeaning(data.meaning);
      } catch (err) {
        setError("Failed to load flashcard");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!word || !meaning) {
      setError("Please fill all fields");
      return;
    }

    setShowConfirm(true);
  };

  const confirmUpdate = async () => {
    try {
      setUpdating(true);
      await updateFlashcard(id!, { word, meaning });
      navigate("/flashcards");
    } catch (err) {
      setError("Failed to update");
    } finally {
      setUpdating(false);
      setShowConfirm(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="max-w-md mx-auto p-4">
          <div className="w-full h-64 border-4 border-darkBorder bg-cardBg shadow-[8px_8px_0_0_rgba(43,43,43,1)] animate-pulse rounded-[32px]" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-4 border-darkBorder p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(43,43,43,1)] space-y-5 max-w-sm w-full animate-in fade-in zoom-in-95 duration-150 text-left">
            <div className="flex items-center gap-2 text-primaryGreen font-black text-xl uppercase tracking-tight">
              <CheckCircle className="w-6 h-6 text-primaryGreen fill-green-100" />
              <span>Confirm Save</span>
            </div>
            
            <p className="text-sm font-bold text-textPrimary leading-relaxed">
              Are you sure you want to save these changes to the flashcard?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className={secondaryButton}
              >
                Cancel
              </button>

              <button
                onClick={confirmUpdate}
                disabled={updating}
                className={`${primaryButton} disabled:opacity-50`}
              >
                {updating ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-3xl font-black mb-8 text-textPrimary uppercase tracking-tight flex items-center gap-3 pb-4 border-b-2 border-dashed border-darkBorder/20">
        <div className="bg-primaryRed text-white p-2 rounded-xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] flex items-center justify-center">
          <Edit className="w-6 h-6" />
        </div>
        <h1>Edit Flashcard</h1>
      </div>

      <div className="bg-cardBg border-4 border-darkBorder rounded-[32px] p-8 shadow-[8px_8px_0px_0px_rgba(43,43,43,1)] space-y-6 max-w-xl mx-auto my-6 text-left">
        {error && (
          <div className="border-2 border-darkBorder bg-red-100 text-primaryRed p-3 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-textPrimary uppercase tracking-wider mb-2 ml-1">
              Word / Phrase
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter word"
              className="w-full bg-beige border-2 border-darkBorder rounded-2xl px-5 py-3.5 text-lg font-bold text-textPrimary placeholder:text-textSoft/50 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(43,43,43,1)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-textPrimary uppercase tracking-wider mb-2 ml-1">
              Meaning / Definition
            </label>
            <textarea
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="Enter meaning"
              rows={4}
              className="w-full bg-beige border-2 border-darkBorder rounded-2xl px-5 py-3.5 text-lg font-bold text-textPrimary placeholder:text-textSoft/50 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(43,43,43,1)] transition-all resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/flashcards")}
              className={secondaryButton}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`${primaryButton} flex items-center justify-center gap-1.5`}
            >
              <Sparkles className="w-4 h-4 text-accentYellow fill-accentYellow" />
              <span>Update Flashcard</span>
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default EditFlashcardPage;