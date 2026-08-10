import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Edit, Plus, Trash2 } from "lucide-react";
import FlashcardCard from "../../components/ui/FlashcardCard";
import { ConfirmDialog, LoadingCard, PageHeader, SegmentedProgress, StatusBox } from "../../components/ui/RetroUI";
import PageContainer from "../../components/layouts/PageContainer";
import { deleteFlashcard, getFlashcards } from "../../services/api";
import { Flashcard } from "../../types/flashcard";

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { (async () => { try { setFlashcards(await getFlashcards()); } catch { setError("The vocabulary file could not be loaded. Check the connection and try again."); } finally { setLoading(false); } })(); }, []);
  const nextCard = () => setCurrentIndex((value) => (value + 1) % flashcards.length);
  const prevCard = () => setCurrentIndex((value) => value === 0 ? flashcards.length - 1 : value - 1);
  const handleDelete = async () => {
    const current = flashcards[currentIndex];
    setDeleting(true);
    try {
      await deleteFlashcard(current.id);
      const remaining = flashcards.filter((card) => card.id !== current.id);
      setFlashcards(remaining); setCurrentIndex((value) => Math.min(value, Math.max(remaining.length - 1, 0))); setShowConfirm(false);
    } catch { setError("The flashcard could not be deleted. No changes were made."); setShowConfirm(false); }
    finally { setDeleting(false); }
  };

  return (
    <PageContainer>
      {showConfirm && <ConfirmDialog title="Delete vocabulary card?" confirmLabel="Delete card" destructive busy={deleting} onConfirm={handleDelete} onCancel={() => setShowConfirm(false)}><p>This permanently removes <strong>“{flashcards[currentIndex]?.word}”</strong> from the card file. This action cannot be undone.</p></ConfirmDialog>}
      <PageHeader index="02" eyebrow="Card file / study mode" title="Study flashcards" description="Select a card, recall the definition, then reveal the reverse side. Use the arrow controls to move through your file." />
      {loading ? <LoadingCard /> : error && flashcards.length === 0 ? <div className="empty-state retro-panel"><div><span className="empty-state-symbol" aria-hidden="true">!</span><h2>File unavailable</h2><StatusBox type="error">{error}</StatusBox></div></div> : flashcards.length === 0 ? <div className="empty-state retro-panel"><div><span className="empty-state-symbol" aria-hidden="true">▱</span><h2>No flashcards filed</h2><p>Your vocabulary drawer is empty. Record your first English word to begin.</p><button className="retro-button retro-button-primary" onClick={() => navigate("/flashcards/new")}><Plus size={17} />Create first card</button></div></div> : (
        <div className="study-workspace">
          {error && <div style={{ marginBottom: 18 }}><StatusBox type="error">{error}</StatusBox></div>}
          <FlashcardCard flashcard={flashcards[currentIndex]} />
          <div className="card-progress-wrap">
            <div className="card-position"><span>Card position</span><span>{String(currentIndex + 1).padStart(2, "0")} / {String(flashcards.length).padStart(2, "0")}</span></div>
            <SegmentedProgress value={currentIndex + 1} total={flashcards.length} label={`Card ${currentIndex + 1} of ${flashcards.length}`} />
          </div>
          <div className="card-controls">
            <button className="retro-button retro-button-secondary" onClick={prevCard} aria-label="Previous flashcard"><ChevronLeft size={18} />Previous</button>
            <button className="retro-button retro-button-secondary" onClick={nextCard} aria-label="Next flashcard">Next<ChevronRight size={18} /></button>
            <button className="retro-button retro-button-accent edit-action" onClick={() => navigate(`/flashcards/edit/${flashcards[currentIndex].id}`)}><Edit size={17} />Edit</button>
            <button className="retro-button retro-button-danger delete-action" onClick={() => setShowConfirm(true)} disabled={deleting}><Trash2 size={17} />Delete</button>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default FlashcardsPage;
