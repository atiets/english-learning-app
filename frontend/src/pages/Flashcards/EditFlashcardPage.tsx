import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X } from "lucide-react";
import PageContainer from "../../components/layouts/PageContainer";
import { ConfirmDialog, LoadingCard, PageHeader, StatusBox } from "../../components/ui/RetroUI";
import { getFlashcardById, updateFlashcard } from "../../services/api";

const EditFlashcardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => { (async () => { try { const card = await getFlashcardById(id!); setWord(card.word); setMeaning(card.meaning); } catch { setError("The selected flashcard could not be loaded."); } finally { setLoading(false); } })(); }, [id]);
  const handleSubmit = (event: React.FormEvent) => { event.preventDefault(); if (!word.trim() || !meaning.trim()) { setError("Both the word and definition are required."); return; } setError(null); setShowConfirm(true); };
  const confirmUpdate = async () => {
    setUpdating(true);
    try { await updateFlashcard(id!, { word, meaning }); navigate("/flashcards"); }
    catch { setError("The changes could not be saved. No update was confirmed."); setShowConfirm(false); }
    finally { setUpdating(false); }
  };

  if (loading) return <PageContainer><PageHeader index="04" eyebrow="Vocabulary records / edit entry" title="Edit flashcard" /><LoadingCard label="Loading flashcard for editing" /></PageContainer>;
  if (error && !word) return <PageContainer><PageHeader index="04" eyebrow="Vocabulary records / edit entry" title="Record unavailable" /><div className="empty-state retro-panel"><div><span className="empty-state-symbol" aria-hidden="true">!</span><h2>Card not found</h2><StatusBox type="error">{error}</StatusBox><button className="retro-button retro-button-secondary" style={{ marginTop: 20 }} onClick={() => navigate("/flashcards")}>Return to card file</button></div></div></PageContainer>;

  return (
    <PageContainer>
      {showConfirm && <ConfirmDialog title="Save this vocabulary record?" confirmLabel="Save changes" busy={updating} onConfirm={confirmUpdate} onCancel={() => setShowConfirm(false)}><p>The current word and definition will replace the existing contents of this card.</p></ConfirmDialog>}
      <PageHeader index="04" eyebrow="Vocabulary records / edit entry" title="Edit flashcard" description="Review the record carefully before saving it back to your vocabulary file." />
      <div className="retro-panel form-panel">
        <form className="form-grid" onSubmit={handleSubmit} aria-describedby={error ? "edit-error" : undefined}>
          {error && <div id="edit-error"><StatusBox type="error">{error}</StatusBox></div>}
          <div className="field"><label className="field-label" htmlFor="word">Word or phrase <small>/ required</small></label><input className="retro-input" id="word" value={word} onChange={(event) => setWord(event.target.value)} required disabled={updating} /></div>
          <div className="field"><label className="field-label" htmlFor="meaning">Meaning or definition <small>/ required</small></label><textarea className="retro-input" id="meaning" value={meaning} onChange={(event) => setMeaning(event.target.value)} required disabled={updating} /></div>
          <div className="form-actions"><button type="button" className="retro-button retro-button-secondary" onClick={() => navigate("/flashcards")} disabled={updating}><X size={17} />Cancel</button><button type="submit" className="retro-button retro-button-primary" disabled={!word.trim() || !meaning.trim() || updating}><Save size={17} />Review changes</button></div>
        </form>
      </div>
    </PageContainer>
  );
};

export default EditFlashcardPage;
