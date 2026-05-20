import { NavLink } from "react-router-dom";

const navItemStyle =
  "px-4 py-2 rounded-full transition-all duration-200 border-2 border-transparent";

const Navbar = () => {
  return (
    <nav className="bg-primaryRed border-b-4 border-darkBorder shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-black text-beige tracking-wide">
          📚 Lit English
        </h1>

        <div className="flex gap-3 flex-wrap">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `
              ${navItemStyle}
              ${
                isActive
                  ? "bg-Byellow text-Bblack border-darkBorder shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "text-beige hover:bg-white/10"
              }
              `
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/flashcards"
            className={({ isActive }) =>
              `
              ${navItemStyle}
              ${
                isActive
                  ? "bg-Byellow text-Bblack border-darkBorder shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "text-beige hover:bg-white/10"
              }
              `
            }
          >
            Flashcards
          </NavLink>

          <NavLink
            to="/flashcards/new"
            className={({ isActive }) =>
              `
              ${navItemStyle}
              ${
                isActive
                  ? "bg-primaryGreen text-white border-darkBorder shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "text-beige hover:bg-white/10"
              }
              `
            }
          >
            Create
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;