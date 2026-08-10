import { Link } from "react-router-dom";
import PageContainer from "../components/layouts/PageContainer";
import { PageHeader } from "../components/ui/RetroUI";

export default function NotFoundPage() {
  return <PageContainer><PageHeader index="404" eyebrow="Terminal message / route error" title="Page not found" /><div className="empty-state retro-panel"><div><span className="empty-state-symbol" aria-hidden="true">?</span><h2>No file at this address</h2><p>The requested page is not part of the current LitEnglish terminal.</p><Link className="retro-button retro-button-primary" to="/">Return home</Link></div></div></PageContainer>;
}
