import { useState } from "react";
import { createFlashcard } from "../../services/api";

const CreateFlashcardForm = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFlashcard({ word, meaning });
      alert("Flashcard created successfully");
      setWord("");
      setMeaning("");
    } catch (error) {
      alert("Failed to create flashcard");
    }
  }

  return (
    <div className="space-y-4 bg-white border-2 border-black p-6 rounded-r-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
        className="bg-Borange text-Bblack text-sm px-4 py-2"
      >
        Add Flashcard
      </button>
    </div>
  );
};

export default CreateFlashcardForm;
