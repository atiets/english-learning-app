import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b-4 border-black bg-[#fef3c7] shadow-[0_6px_0_0_rgba(0,0,0,1)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">📚 Lit English</h1>

        <div className="flex gap-6 text-sm font-semibold">

          <Link to="/" className="hover:underline">Home</Link>

          <Link to="/explore" className="hover:underline">Explore</Link>

          <Link to="/flashcards" className="hover:underline">Flashcards</Link>

          <Link to="/flashcards/new" className="hover:underline">Create</Link>

          <Link to="/study" className="hover:underline">Study</Link>

          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;