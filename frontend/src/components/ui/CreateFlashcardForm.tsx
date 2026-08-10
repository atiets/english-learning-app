import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { createFlashcard } from "../../services/api";
import { StatusBox } from "./RetroUI";

const CreateFlashcardForm = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); setError(null); setLoading(true);
    try {
      await createFlashcard({ word, meaning }); setSuccess(true); setWord(""); setMeaning("");
      window.setTimeout(() => navigate("/flashcards"), 1000);
    } catch { setError("The flashcard could not be created. Check the connection and try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="retro-panel form-panel">
      <form className="form-grid" onSubmit={handleSubmit} aria-describedby={error ? "create-error" : undefined}>
        {success && <StatusBox type="success">Flashcard created. Opening your card file…</StatusBox>}
        {error && <div id="create-error"><StatusBox type="error">{error}</StatusBox></div>}
        <div className="field">
          <label className="field-label" htmlFor="word">Word or phrase <small>/ required</small></label>
          <input className="retro-input" id="word" name="word" value={word} onChange={(event) => setWord(event.target.value)} placeholder="e.g. ephemeral" required autoComplete="off" disabled={loading || success} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="meaning">Meaning or definition <small>/ required</small></label>
          <textarea className="retro-input" id="meaning" name="meaning" value={meaning} onChange={(event) => setMeaning(event.target.value)} placeholder="e.g. Lasting for a very short time" required disabled={loading || success} />
        </div>
        <div className="form-actions">
          <button type="button" className="retro-button retro-button-secondary" onClick={() => navigate("/flashcards")} disabled={loading}><X size={17} />Cancel</button>
          <button type="submit" className="retro-button retro-button-primary" disabled={!word.trim() || !meaning.trim() || loading || success}><Plus size={17} />{loading ? "Filing card…" : "Create flashcard"}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateFlashcardForm;
