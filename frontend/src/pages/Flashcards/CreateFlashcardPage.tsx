import CreateFlashcardForm from "../../components/ui/CreateFlashcardForm";

const CreateFlashcardPage = () => {
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">
                Create Flashcard
            </h1>
            <CreateFlashcardForm />
        </div>
    );
};

export default CreateFlashcardPage;