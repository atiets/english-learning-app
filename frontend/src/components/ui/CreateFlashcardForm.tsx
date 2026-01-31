import { useState } from "react";
import { Flashcard } from "../../types/flashcard";

type Props = {
  onAdd: (card: Flashcard) => void;
};

const CreateFlashcardForm = ({ onAdd }: Props) => {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleSubmit = () => {
    onAdd({
      id: Date.now().toString(),
      term,
      definition,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    setTerm("");
    setDefinition("");
  }

  return (
    <div className="space-y-4 bg-white border-2 border-black p-6 rounded-r-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="text-2xl uppercase justify-center font-bold mb-4 flex tracking-tight">Create Flashcard</div>
      <input 
        type = "text"
        placeholder="Enter term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="border p-2 w-full bg-white border-black focus:outline-none focus:bg-Byellow/30 rounded-none placeholder:text-gray-400"
      />
      <textarea 
        placeholder="Enter definition"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
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
