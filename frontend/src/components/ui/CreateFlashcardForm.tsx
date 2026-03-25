import { useState } from "react";
import { createFlashcard } from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreateFlashcardForm = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createFlashcard({ word, meaning });
      setSuccess(true);
      setWord("");
      setMeaning("");
      setTimeout(() => {
        navigate("/flashcards");
      }, 1000);
    } catch (error) {
      alert("Failed to create flashcard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 bg-white border-2 border-black p-6 rounded-r-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

      {success && (
        <div className="border-2 border-black bg-green-200 text-black p-2 text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Flashcard created successfully!
        </div>
      )}

      <div className="text-2xl uppercase justify-center font-bold mb-4 flex tracking-tight">Create Flashcard</div>
      <input
        type="text"
        placeholder="Enter word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border p-2 w-full bg-white border-black focus:outline-none focus:bg-Byellow/30 rounded-none placeholder:text-gray-400"
      />
      <textarea
        placeholder="Enter meaning"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        className="border p-2 w-full bg-white border-black focus:outline-none focus:bg-Byellow/30 rounded-none placeholder:text-gray-400"
      />
      <button
        onClick={handleSubmit}
        disabled={word.length === 0 || meaning.length === 0}
        className="bg-Borange text-Bblack text-sm px-4 py-2"
      >
        {loading ? "Adding..." : "Add Flashcard"}
      </button>
    </div>
  );
};

export default CreateFlashcardForm;
