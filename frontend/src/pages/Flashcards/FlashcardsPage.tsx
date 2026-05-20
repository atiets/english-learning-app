import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlashcardCard from "../../components/ui/FlashcardCard";
import { Flashcard } from "../../types/flashcard";
import { deleteFlashcard, getFlashcards } from "../../services/api";
import { primaryButton } from "../../styles/button";
import PageContainer from "../../components/layouts/PageContainer";

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
    );
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
    );
  }

  if (flashcards.length === 0) {
  return (
    <PageContainer>

      <div className="bg-cardBg border-4 border-darkBorder rounded-[32px] p-10 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

        <div className="text-6xl mb-4">
          📭
        </div>

        <h2 className="text-3xl font-black text-primaryRed">
          No Flashcards Yet
        </h2>

        <p className="mt-3 text-lg text-text/70">
          Start building your vocabulary collection!
        </p>

        <button
          onClick={() => navigate("/flashcards/new")}
          className="
            mt-8
            bg-primaryGreen
            text-white
            px-6
            py-3
            rounded-full
            border-4
            border-darkBorder
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            hover:translate-y-[2px]
            hover:shadow-none
            transition-all
            font-bold
          "
        >
          + Create First Flashcard
        </button>
      </div>
    </PageContainer >
  );
}

  return (
    <PageContainer>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-yellow-100 border-2 border-black p-6 shadow-[6px_6px_0_black]">
            <p className="mb-4">Are you sure you want to delete?</p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className={primaryButton}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className={primaryButton}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      <FlashcardCard flashcard={flashcards[currentIndex]} />
      <p className="text-center mt-4 text-sm border border-black inline-block px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {currentIndex + 1} / {flashcards.length}
      </p>
      <div className="flex justify-between mt-4">
        <button onClick={prevCard} className={primaryButton}>
          Prev
        </button>
        <button onClick={nextCard} className={primaryButton}>
          Next
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          disabled={deleting}
          className={primaryButton}
        >
          Delete
        </button>
        <button onClick={handleEdit} className={primaryButton}>
          Edit
        </button>
      </div>
    </PageContainer>
  );
};

export default FlashcardsPage;
