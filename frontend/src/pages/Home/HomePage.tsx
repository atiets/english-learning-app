import { ArrowRight, FilePlus2, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layouts/PageContainer";

export default function HomePage() {
  return (
    <PageContainer>
      <section className="home-hero" aria-labelledby="welcome-title">
        <div className="retro-panel welcome-copy">
          <p className="eyebrow">Language laboratory / vocabulary file</p>
          <h1 id="welcome-title">Words in.<br /><em>English out.</em></h1>
          <p>Build a personal vocabulary archive, then work through each index card at your own pace. Everything here is focused on the words you have actually saved.</p>
          <div className="hero-actions">
            <Link className="retro-button retro-button-primary" to="/flashcards"><Layers size={18} />View flashcards</Link>
            <Link className="retro-button retro-button-accent" to="/flashcards/new"><FilePlus2 size={18} />Create flashcard</Link>
          </div>
        </div>
        <aside className="lab-readout" aria-label="System status">
          <p className="technical-label">Terminal / LE-01</p>
          <div className="readout-screen">
            <span className="technical-label">Current mode</span>
            <strong>VOCAB</strong>
            <p>Card file ready.<br />Choose an operation to begin.</p>
          </div>
        </aside>
      </section>

      <section className="home-grid" aria-label="Learning workspace">
        <div className="retro-panel index-panel">
          <div className="section-rule"><p className="eyebrow">Quick index</p><h2>Vocabulary operations</h2></div>
          <div className="action-list">
            <Link className="action-row" to="/flashcards"><span className="action-number">01</span><span><b>Open card file</b><small>Browse and reveal your saved vocabulary.</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link className="action-row" to="/flashcards/new"><span className="action-number">02</span><span><b>Record a new word</b><small>Add a word and its definition to the file.</small></span><ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
        <aside className="retro-panel future-panel">
          <div className="section-rule"><p className="eyebrow">Reserved module</p><h2>Study desk</h2></div>
          <span className="future-stamp">UNDER CONSTRUCTION</span>
          <p>A guided study area will live here later. No progress, XP, streak, or learning statistics are inferred until that product work exists.</p>
        </aside>
      </section>
    </PageContainer>
  );
}
