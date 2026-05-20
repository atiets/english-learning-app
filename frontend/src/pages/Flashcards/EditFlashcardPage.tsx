import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFlashcardById, updateFlashcard } from "../../services/api";

const EditFlashcardPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showConfirm, setShowConfirm] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getFlashcardById(id!);
                setWord(data.word);
                setMeaning(data.meaning);
            } catch (err) {
                setError("Failed to load flashcard");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!word || !meaning) {
            setError("Please fill all fields");
            return;
        }

        setShowConfirm(true);
    };

    const confirmUpdate = async () => {
        try {
            setUpdating(true);
            await updateFlashcard(id!, { word, meaning });

            navigate("/flashcards");
        } catch (err) {
            setError("Failed to update");
        } finally {
            setUpdating(false);
            setShowConfirm(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-md mx-auto p-4">
                <div className="w-full h-64 border-2 border-black bg-[#fef3c7] shadow-[6px_6px_0_0_rgba(0,0,0,1)] animate-pulse" />
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-4 space-y-4">

            <h1 className="text-xl font-bold border-b border-black pb-2">
                Edit Flashcard
            </h1>

            {error && (
                <div className="border border-black bg-red-200 p-2 text-sm">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Enter word"
                    className="border p-2 w-full border-black focus:outline-none focus:bg-amber-100"
                />

                <textarea
                    value={meaning}
                    onChange={(e) => setMeaning(e.target.value)}
                    placeholder="Enter meaning"
                    className="border p-2 w-full border-black focus:outline-none focus:bg-amber-100"
                />

                <button
                    type="submit"
                    className="bg-orange-400 border border-black px-4 py-2 hover:bg-orange-500 transition"
                >
                    Update Flashcard
                </button>
            </form>

            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="border-2 border-black bg-yellow-100 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 max-w-sm w-full animate-in fade-in zoom-in duration-200">
                        <h2 className="text-lg font-bold">Confirm Update</h2>
                        <p className="text-sm font-semibold">
                            Are you sure you want to save these changes to the flashcard?
                        </p>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="border-2 border-black px-4 py-2 hover:bg-black/5 transition font-bold"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmUpdate}
                                disabled={updating}
                                className="bg-orange-400 border-2 border-black px-4 py-2 hover:bg-orange-500 transition disabled:opacity-50 font-bold"
                            >
                                {updating ? "Updating..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditFlashcardPage;