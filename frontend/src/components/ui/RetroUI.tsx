import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

export function PageHeader({ index, eyebrow, title, description }: {
  index: string; eyebrow: string; title: string; description?: string;
}) {
  return (
    <header className="page-header">
      <div className="page-header-index" aria-hidden="true">{index}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        {description && <p className="page-subtitle">{description}</p>}
      </div>
    </header>
  );
}

export function SegmentedProgress({ value, total, label }: { value: number; total: number; label: string }) {
  const segmentCount = Math.min(Math.max(total, 1), 16);
  const filled = total > 0 ? Math.ceil((value / total) * segmentCount) : 0;
  return (
    <div className="segmented" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={value}>
      {Array.from({ length: segmentCount }, (_, index) => <span className={index < filled ? "filled" : ""} key={index} />)}
    </div>
  );
}

export function StatusBox({ type, children }: { type: "error" | "success" | "warning"; children: React.ReactNode }) {
  const role = type === "error" ? "alert" : "status";
  return <div className={`status-box ${type}`} role={role}><span aria-hidden="true">{type === "success" ? "✓" : "!"}</span><div>{children}</div></div>;
}

export function LoadingCard({ label = "Loading flashcards" }: { label?: string }) {
  return (
    <div className="study-workspace" role="status" aria-label={label}>
      <div className="retro-card vocab-card skeleton">
        <span className="technical-label card-tab">ACCESSING FILE</span>
        <div className="skeleton-line" style={{ width: "52%", height: 54 }} />
        <div className="skeleton-line" style={{ width: "76%", marginTop: 24 }} />
      </div>
      <p className="technical-label" style={{ marginTop: 20, textAlign: "center" }}>Please stand by…</p>
    </div>
  );
}

export function ConfirmDialog({ title, children, confirmLabel, busy = false, destructive = false, onConfirm, onCancel }: {
  title: string; children: React.ReactNode; confirmLabel: string; busy?: boolean; destructive?: boolean; onConfirm: () => void; onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    cancelRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onCancel();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("keydown", handleKeyDown); previousFocus.current?.focus(); };
  }, [busy, onCancel]);

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && !busy && onCancel()}>
      <div className="retro-dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog-title" ref={dialogRef}>
        <header className="dialog-header">
          {destructive && <AlertTriangle size={20} aria-hidden="true" />}
          <h2 id="dialog-title">{title}</h2>
          <button className="dialog-close" onClick={onCancel} disabled={busy} aria-label="Close dialog"><X size={20} /></button>
        </header>
        <div className="dialog-body">{children}</div>
        <footer className="dialog-actions">
          <button ref={cancelRef} className="retro-button retro-button-secondary" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className={`retro-button ${destructive ? "retro-button-danger" : "retro-button-primary"}`} onClick={onConfirm} disabled={busy}>{busy ? "Working…" : confirmLabel}</button>
        </footer>
      </div>
    </div>
  );
}
