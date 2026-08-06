import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Layers,
  Plus,
  Flame,
  Award,
  Menu,
  X,
  ChevronDown,
  Settings,
  BookOpen,
  Sparkles
} from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItemStyle =
    "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-150 border-2 border-transparent select-none";

  const getNavLinkClass = (isActive: boolean) => {
    return `
      ${navItemStyle}
      ${
        isActive
          ? "bg-primaryRed text-white border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] translate-y-[1px]"
          : "text-beige hover:text-white hover:border-darkBorder hover:bg-white/10"
      }
    `;
  };

  return (
    <nav className="sticky top-0 z-50 bg-primaryGreen border-b-4 border-darkBorder shadow-[0_4px_0_0_rgba(43,43,43,1)] transition-all">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Left Section: Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="bg-primaryRed text-white p-2 rounded-xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] group-hover:scale-105 group-hover:rotate-[-2deg] transition-all duration-200 flex items-center justify-center">
            <BookOpen className="w-6 h-6 fill-white/10" />
          </div>
          <span className="text-xl md:text-2xl font-black text-white tracking-tight select-none">
            Lit<span className="text-accentYellow group-hover:text-beige transition-colors duration-200">English</span>
          </span>
        </NavLink>

        {/* Middle Section: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
            <Home className="w-4 h-4" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/flashcards" className={({ isActive }) => getNavLinkClass(isActive)} end>
            <Layers className="w-4 h-4" />
            <span>Flashcards</span>
          </NavLink>

          <NavLink to="/flashcards/new" className={({ isActive }) => getNavLinkClass(isActive)}>
            <Plus className="w-4 h-4 font-bold" />
            <span>Create</span>
          </NavLink>
        </div>

        {/* Right Section: Stats & Profile */}
        <div className="hidden md:flex items-center gap-4">
          {/* Streak Badge */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-white hover:bg-orange-50 text-accentOrange px-3 py-1.5 rounded-xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] transition-all active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(43,43,43,1)] font-bold text-xs">
              <Flame className="w-4 h-4 fill-accentOrange animate-pulse" />
              <span>5 Days</span>
            </button>
            
            {/* Popover */}
            <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-darkBorder rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(43,43,43,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left">
              <div className="flex items-center gap-1.5 text-accentOrange font-extrabold text-sm mb-1">
                <Flame className="w-4 h-4 fill-accentOrange" />
                <span>Streak Active!</span>
              </div>
              <p className="text-xs text-textSoft leading-relaxed font-medium">
                You have studied for <strong>5 days</strong> in a row! Learn or test a new card tomorrow to keep it going.
              </p>
              <div className="mt-3 flex justify-between items-center gap-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-textSoft/80 font-black">{day}</span>
                    <span className={`w-6 h-6 flex items-center justify-center text-xs font-black rounded-full border-2 ${
                      idx < 5
                        ? "bg-accentOrange text-white border-darkBorder"
                        : "bg-beige/20 text-textSoft border-dashed border-darkBorder/40"
                    }`}>
                      {idx < 5 ? "✓" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Level / XP Badge */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-white hover:bg-yellow-50 text-textPrimary px-3 py-1.5 rounded-xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] transition-all active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(43,43,43,1)] font-bold text-xs">
              <Award className="w-4 h-4 text-accentOrange fill-accentYellow" />
              <span>Lv. 2</span>
            </button>

            {/* Popover */}
            <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-darkBorder rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(43,43,43,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left">
              <div className="flex justify-between items-center text-textPrimary font-extrabold text-sm mb-1.5">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-accentOrange fill-accentYellow" />
                  Level 2 Scholar
                </span>
                <span className="text-xs font-bold text-primaryGreen">120/200 XP</span>
              </div>
              <div className="w-full bg-beige h-3.5 rounded-full border-2 border-darkBorder overflow-hidden relative shadow-inner">
                <div className="bg-accentYellow h-full border-r-2 border-darkBorder rounded-l-full transition-all duration-500" style={{ width: "60%" }}></div>
              </div>
              <p className="text-[10px] text-textSoft mt-2 leading-relaxed font-medium">
                You're doing great! Earn <strong>80 XP</strong> more to level up. Write custom cards and practice to gain XP.
              </p>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white hover:bg-beige/25 px-3 py-1.5 rounded-xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] transition-all active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(43,43,43,1)] font-bold text-xs text-textPrimary"
            >
              <div className="w-6 h-6 rounded-full bg-primaryRed text-white flex items-center justify-center font-black text-xs border border-darkBorder">
                A
              </div>
              <span>Atit</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-darkBorder rounded-2xl shadow-[4px_4px_0px_0px_rgba(43,43,43,1)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-100 text-left">
                <div className="p-3 border-b-2 border-darkBorder bg-beige/20">
                  <p className="font-black text-textPrimary text-sm">Atit S.</p>
                  <p className="text-[10px] text-textSoft">atit@example.com</p>
                </div>
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => { navigate("/"); setIsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-textPrimary hover:bg-beige/30 flex items-center gap-2 transition-colors"
                  >
                    <Home className="w-4 h-4 text-textSoft" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => { navigate("/flashcards"); setIsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-textPrimary hover:bg-beige/30 flex items-center gap-2 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-textSoft" />
                    My Flashcards
                  </button>
                  <button
                    onClick={() => { navigate("/flashcards/new"); setIsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-textPrimary hover:bg-beige/30 flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-textSoft" />
                    Create Flashcard
                  </button>
                  <hr className="border-darkBorder my-1" />
                  <button
                    onClick={() => { alert("Settings page coming soon!"); setIsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-textPrimary hover:bg-beige/30 flex items-center gap-2 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-textSoft" />
                    Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="flex items-center md:hidden gap-2">
          {/* Flame Icon Mobile (Shortcut) */}
          <div className="flex items-center gap-1 bg-white text-accentOrange px-2 py-1 rounded-lg border border-darkBorder font-extrabold text-xs">
            <Flame className="w-3.5 h-3.5 fill-accentOrange" />
            <span>5</span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border-2 border-darkBorder bg-white shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(43,43,43,1)] transition-all flex items-center justify-center text-textPrimary"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-2 border-darkBorder bg-white/95 backdrop-blur-md py-4 px-4 space-y-4 shadow-inner text-left animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold border-2 ${
                  isActive
                    ? "bg-primaryRed border-darkBorder text-white shadow-[2px_2px_0px_0px_rgba(43,43,43,1)]"
                    : "border-transparent text-textSoft hover:bg-beige/20 hover:text-textPrimary"
                }`
              }
            >
              <Home className="w-5 h-5" />
              <span>Dashboard / Home</span>
            </NavLink>

            <NavLink
              to="/flashcards"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold border-2 ${
                  isActive
                    ? "bg-primaryRed border-darkBorder text-white shadow-[2px_2px_0px_0px_rgba(43,43,43,1)]"
                    : "border-transparent text-textSoft hover:bg-beige/20 hover:text-textPrimary"
                }`
              }
              end
            >
              <Layers className="w-5 h-5" />
              <span>My Flashcards</span>
            </NavLink>

            <NavLink
              to="/flashcards/new"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold border-2 ${
                  isActive
                    ? "bg-primaryRed border-darkBorder text-white shadow-[2px_2px_0px_0px_rgba(43,43,43,1)]"
                    : "border-transparent text-textSoft hover:bg-beige/20 hover:text-textPrimary"
                }`
              }
            >
              <Plus className="w-5 h-5" />
              <span>Create Flashcard</span>
            </NavLink>
          </div>

          <hr className="border-darkBorder" />

          {/* Stats Summary in Mobile Menu */}
          <div className="p-3 bg-beige/20 border-2 border-darkBorder rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primaryRed text-white flex items-center justify-center font-bold border border-darkBorder">
                  A
                </div>
                <div>
                  <p className="font-black text-xs text-textPrimary">Atit S.</p>
                  <p className="text-[10px] text-textSoft">Level 2 Scholar</p>
                </div>
              </div>
              <span className="text-2xs font-extrabold bg-accentYellow border border-darkBorder px-2 py-0.5 rounded-md">
                120 XP
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-textSoft">
                <span>Next level progress</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-white h-2.5 rounded-full border border-darkBorder overflow-hidden">
                <div className="bg-accentYellow h-full border-r border-darkBorder rounded-l-full" style={{ width: "60%" }}></div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex items-center justify-center gap-1.5 bg-orange-50 border border-darkBorder py-2 rounded-xl text-xs font-black text-accentOrange">
                <Flame className="w-4 h-4 fill-accentOrange" />
                <span>5-Day Streak</span>
              </div>
              <button
                onClick={() => {
                  alert("Settings coming soon!");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 bg-white border border-darkBorder hover:bg-beige/20 py-2 px-3 rounded-xl text-xs font-bold text-textSoft"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;