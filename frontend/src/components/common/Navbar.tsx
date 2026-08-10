import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  ChevronDown,
  Flame,
  Home,
  Layers,
  Menu,
  Plus,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/flashcards", label: "Flashcards", icon: Layers, end: true },
  { to: "/flashcards/new", label: "Create", icon: Plus, end: false },
];

const controlClass = "min-h-11 inline-flex items-center justify-center gap-2 border-2 border-ink bg-paper-input px-2.5 text-ink shadow-hard-sm font-mono text-xs font-extrabold uppercase tracking-wide transition-all duration-fast hover:bg-paper-structural active:translate-x-[3px] active:translate-y-[3px] active:shadow-none";
const menuItemClass = "flex min-h-11 w-full items-center gap-2 border-2 border-transparent px-3 py-2 text-left font-mono text-xs font-bold text-ink transition-colors duration-fast hover:border-ink hover:bg-paper-structural focus-visible:border-ink";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openReadout, setOpenReadout] = useState<"streak" | "level" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        setOpenReadout(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeDesktopPanels = () => {
    setIsDropdownOpen(false);
    setOpenReadout(null);
  };
  const navigateFromProfile = (path: string) => {
    navigate(path);
    closeDesktopPanels();
  };
  const navLinkClass = ({ isActive }: { isActive: boolean }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <nav className="app-nav" aria-label="Primary navigation">
      <div className="nav-inner !max-w-[90rem] !gap-3 xl:!gap-6">
        <NavLink to="/" className="brand shrink-0" aria-label="LitEnglish home">
          <span className="brand-mark" aria-hidden="true"><BookOpen size={24} /></span>
          <span className="brand-copy"><strong>LitEnglish</strong><small>LANGUAGE LAB / LOCAL FILE</small></span>
        </NavLink>

        <div className="hidden min-[821px]:flex items-center gap-1 xl:gap-2">
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink to={to} end={end} className={navLinkClass} key={to}>
              <Icon size={17} aria-hidden="true" />
              <span className="hidden xl:inline">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="ml-auto hidden min-[821px]:flex items-center gap-2" aria-label="Demo learning status and profile">
          <span className="font-mono text-[8px] font-bold tracking-[.12em] text-mustard">DEMO</span>

          <div className="group relative">
            <button
              className={controlClass}
              onClick={() => { setOpenReadout(openReadout === "streak" ? null : "streak"); setIsDropdownOpen(false); }}
              aria-expanded={openReadout === "streak"}
              aria-controls="streak-readout"
              aria-label="Streak: 5 days, demo data"
            >
              <Flame className="fill-state-warning text-oxblood" size={18} aria-hidden="true" />
              <span className="hidden 2xl:inline">5 Days</span><span className="2xl:hidden">5D</span>
            </button>
            <div
              id="streak-readout"
              className={`${openReadout === "streak" ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"} absolute right-0 top-full z-50 mt-2 w-72 border-2 border-ink bg-paper-panel text-left text-ink shadow-hard transition-opacity duration-fast`}
            >
              <div className="flex items-center justify-between border-b-2 border-ink bg-forest px-3 py-2 text-paper-panel">
                <span className="flex items-center gap-2 font-mono text-xs font-extrabold uppercase"><Flame size={16} aria-hidden="true" />Streak Active!</span>
              </div>
              <div className="p-4">
                <p className="mb-3 text-sm leading-relaxed text-ink-muted">You have studied for <strong className="text-ink">5 days</strong> in a row! Learn or test a new card tomorrow to keep it going.</p>
                <div className="grid grid-cols-7 gap-1" aria-label="Five of seven placeholder study days complete">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                    <div className="grid gap-1 text-center" key={`${day}-${index}`}>
                      <span className="font-mono text-[10px] font-bold text-ink-muted">{day}</span>
                      <span className={`grid h-7 place-items-center border-2 border-ink font-mono text-xs font-black ${index < 5 ? "bg-state-warning text-white" : "border-dashed bg-paper-structural text-ink-muted"}`}>{index < 5 ? "✓" : ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <button
              className={controlClass}
              onClick={() => { setOpenReadout(openReadout === "level" ? null : "level"); setIsDropdownOpen(false); }}
              aria-expanded={openReadout === "level"}
              aria-controls="level-readout"
              aria-label="Level 2, 120 of 200 XP, demo data"
            >
              <Award className="fill-mustard text-oxblood" size={18} aria-hidden="true" />
              <span>Lv. 2</span>
            </button>
            <div
              id="level-readout"
              className={`${openReadout === "level" ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"} absolute right-0 top-full z-50 mt-2 w-72 border-2 border-ink bg-paper-panel text-left text-ink shadow-hard transition-opacity duration-fast`}
            >
              <div className="flex items-center justify-between border-b-2 border-ink bg-forest px-3 py-2 text-paper-panel">
                <span className="flex items-center gap-2 font-mono text-xs font-extrabold uppercase"><Sparkles size={16} aria-hidden="true" />Level 2 Scholar</span>
              </div>
              <div className="p-4">
                <div className="mb-2 flex justify-between font-mono text-xs font-extrabold"><span>Next level progress</span><span className="text-forest">120/200 XP</span></div>
                <div className="segmented" role="progressbar" aria-label="Placeholder experience progress" aria-valuemin={0} aria-valuemax={200} aria-valuenow={120}>
                  {Array.from({ length: 10 }, (_, index) => <span className={index < 6 ? "filled" : ""} key={index} />)}
                </div>
                <p className="mb-0 mt-3 text-sm leading-relaxed text-ink-muted">You're doing great! Earn <strong className="text-ink">80 XP</strong> more to level up. Write custom cards and practice to gain XP.</p>
              </div>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              className={controlClass}
              onClick={() => { setIsDropdownOpen(!isDropdownOpen); setOpenReadout(null); }}
              aria-expanded={isDropdownOpen}
              aria-controls="profile-menu"
              aria-haspopup="menu"
            >
              <span className="grid h-7 w-7 place-items-center border-2 border-ink bg-oxblood text-white" aria-hidden="true">A</span>
              <span>Atit</span>
              <ChevronDown className={`transition-transform duration-standard ${isDropdownOpen ? "rotate-180" : ""}`} size={15} aria-hidden="true" />
            </button>

            {isDropdownOpen && (
              <div id="profile-menu" className="absolute right-0 top-full z-50 mt-2 w-64 border-2 border-ink bg-paper-panel text-left text-ink shadow-hard">
                <div className="border-b-2 border-ink bg-forest px-3 py-3 text-paper-panel">
                  <div><p className="mb-1 font-editorial text-base font-bold">Atit S.</p><p className="mb-0 font-mono text-[11px] text-paper-structural">atit@example.com</p></div>
                </div>
                <div className="p-2">
                  <button className={menuItemClass} onClick={() => navigateFromProfile("/")}><Home size={17} aria-hidden="true" />Dashboard</button>
                  <button className={menuItemClass} onClick={() => navigateFromProfile("/flashcards")}><Layers size={17} aria-hidden="true" />My Flashcards</button>
                  <button className={menuItemClass} onClick={() => navigateFromProfile("/flashcards/new")}><Plus size={17} aria-hidden="true" />Create Flashcard</button>
                  <hr className="my-2 border-0 border-t-2 border-dashed border-ink/50" />
                  <button className={menuItemClass} onClick={() => { alert("Settings page coming soon!"); setIsDropdownOpen(false); }}><Settings size={17} aria-hidden="true" />Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 min-[821px]:hidden">
          <div className="flex min-h-11 items-center gap-1.5 border-2 border-ink bg-paper-input px-2.5 font-mono text-xs font-extrabold text-oxblood" aria-label="Demo streak: 5 days">
            <Flame className="fill-state-warning" size={18} aria-hidden="true" /><span>5</span>
          </div>
          <button className="mobile-toggle !ml-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-expanded={isMobileMenuOpen} aria-controls="mobile-nav" aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}>
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-panel" id="mobile-nav">
          <div className="grid gap-2">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink to={to} end={end} className={navLinkClass} key={to} onClick={() => setIsMobileMenuOpen(false)}>
                <Icon size={19} aria-hidden="true" />{label === "Home" ? "Dashboard / Home" : label === "Flashcards" ? "My Flashcards" : "Create Flashcard"}
              </NavLink>
            ))}
          </div>
          <div className="border-2 border-ink bg-paper-structural p-3 text-ink shadow-hard-sm">
            <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-ink/50 pb-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink bg-oxblood font-mono font-black text-white">A</span>
                <div className="min-w-0"><p className="mb-0 font-editorial text-base font-bold">Atit S.</p><p className="mb-0 truncate font-mono text-[11px] text-ink-muted">Level 2 Scholar</p></div>
              </div>
              <span className="border border-ink bg-mustard px-2 py-1 font-mono text-[10px] font-black">DEMO / 120 XP</span>
            </div>
            <div className="py-3">
              <div className="mb-2 flex justify-between gap-2 font-mono text-xs font-bold"><span>Next level progress</span><span>60%</span></div>
              <div className="segmented" role="progressbar" aria-label="Placeholder next level progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={60}>
                {Array.from({ length: 10 }, (_, index) => <span className={index < 6 ? "filled" : ""} key={index} />)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex min-h-11 items-center justify-center gap-2 border-2 border-ink bg-paper-input px-2 font-mono text-xs font-black text-oxblood"><Flame className="fill-state-warning" size={18} aria-hidden="true" />5-Day Streak</div>
              <button className={`${menuItemClass} justify-center border-ink bg-paper-input`} onClick={() => { alert("Settings coming soon!"); setIsMobileMenuOpen(false); }}><Settings size={17} aria-hidden="true" />Settings</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
