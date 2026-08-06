import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlashcardCard from "../../components/ui/FlashcardCard";
import { Flashcard } from "../../types/flashcard";
import { deleteFlashcard, getFlashcards } from "../../services/api";
import {
  dangerButton,
  secondaryButton,
  accentButton
} from "../../styles/button";
import PageContainer from "../../components/layouts/PageContainer";
import {
  Layers,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from "lucide-react";

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const handleDelete = async () => {
    const currentCard = flashcards[currentIndex];
    setDeleting(true);
    try {
      await deleteFlashcard(currentCard.id);
      setFlashcards((prev) => {
        const updated = prev.filter((f) => f.id !== currentCard.id);
        if (updated.length === 0) {
          return [];
        }
        setCurrentIndex((i) => Math.min(i, updated.length - 1));
        return updated;
      });
      setShowConfirm(false);
    } catch (error) {
      setError("Failed to delete flashcard");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    const current = flashcards[currentIndex];
    if (!current) return;

    navigate(`/flashcards/edit/${current.id}`);
  };

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
    };
    loadFlashcards();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <div className="max-w-md mx-auto p-4">
          <div className="w-full h-64 border-4 border-darkBorder bg-cardBg shadow-[8px_8px_0_0_rgba(43,43,43,1)] flex flex-col items-center justify-center p-6 animate-pulse rounded-[32px]">
            <div className="w-1/2 h-8 bg-darkBorder/20 mb-4 rounded-xl"></div>
            <div className="w-3/4 h-4 bg-darkBorder/20 rounded-xl"></div>
          </div>

          <div className="flex justify-between mt-8">
            <div className="w-24 h-10 border-2 border-darkBorder bg-darkBorder/10 animate-pulse shadow-[3px_3px_0_0_rgba(43,43,43,1)] rounded-full"></div>
            <div className="w-24 h-10 border-2 border-darkBorder bg-darkBorder/10 animate-pulse shadow-[3px_3px_0_0_rgba(43,43,43,1)] rounded-full"></div>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="max-w-md mx-auto p-4">
          <div className="w-full h-64 border-4 border-darkBorder bg-red-100 shadow-[8px_8px_0_0_rgba(43,43,43,1)] flex flex-col items-center justify-center p-6 rounded-[32px]">
            <AlertTriangle className="w-12 h-12 text-primaryRed mb-3" />
            <h3 className="font-black text-lg text-textPrimary mb-1">Error Loading Data</h3>
            <p className="text-xs text-textSoft font-bold">{error}</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (flashcards.length === 0) {
    return (
      <PageContainer>
        <div className="bg-cardBg border-4 border-darkBorder rounded-[32px] p-10 text-center shadow-[8px_8px_0px_0px_rgba(43,43,43,1)] max-w-xl mx-auto my-6">
          <div className="text-6xl mb-4">📭</div>

          <h2 className="text-3xl font-black text-primaryRed uppercase tracking-tight">
            No Flashcards Yet
          </h2>

          <p className="mt-3 text-sm font-bold text-textSoft leading-relaxed">
            Start building your vocabulary collection by creating your very first custom learning card!
          </p>

          <button
            onClick={() => navigate("/flashcards/new")}
            className="mt-8 bg-primaryGreen text-white px-8 py-3 rounded-full border-2 border-darkBorder shadow-[4px_4px_0px_0px_rgba(43,43,43,1)] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] active:translate-y-[2px] transition-all font-black text-sm uppercase tracking-wider cursor-pointer"
          >
            + Create First Flashcard
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm">
          <div className="bg-white border-4 border-darkBorder p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(43,43,43,1)] max-w-sm w-full space-y-5 animate-in fade-in zoom-in-95 duration-150 text-left">
            <div className="flex items-center gap-2 text-primaryRed font-black text-xl uppercase tracking-tight">
              <AlertTriangle className="w-6 h-6" />
              <span>Confirm Delete</span>
            </div>
            
            <p className="text-sm font-bold text-textPrimary leading-relaxed">
              Are you sure you want to permanently delete this flashcard? This action cannot be undone.
            </p>

            <div className="flex gap-3 pt-2 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className={secondaryButton}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className={dangerButton}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-3xl font-black mb-8 text-textPrimary uppercase tracking-tight flex items-center gap-3 pb-4 border-b-2 border-dashed border-darkBorder/20">
        <div className="bg-primaryRed text-white p-2 rounded-xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] flex items-center justify-center">
          <Layers className="w-6 h-6" />
        </div>
        <h1>Study Flashcards</h1>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <FlashcardCard flashcard={flashcards[currentIndex]} />
        
        {/* Progress indicator */}
        <div className="flex justify-center">
          <span className="text-center text-xs font-black text-textPrimary border-2 border-darkBorder bg-white inline-block px-4 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] select-none">
            🗂️ CARD {currentIndex + 1} OF {flashcards.length}
          </span>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 sm:flex sm:justify-between gap-3 pt-4 border-t border-darkBorder/10">
          <button
            onClick={prevCard}
            className={`${secondaryButton} flex items-center justify-center gap-1 py-3 px-6`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Prev</span>
          </button>
          
          <button
            onClick={nextCard}
            className={`${secondaryButton} flex items-center justify-center gap-1 py-3 px-6`}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleEdit}
            className={`${accentButton} flex items-center justify-center gap-1.5 py-3 px-6 col-span-2 sm:col-span-1`}
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            disabled={deleting}
            className={`${dangerButton} flex items-center justify-center gap-1.5 py-3 px-6 col-span-2 sm:col-span-1 disabled:opacity-50`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default FlashcardsPage;
