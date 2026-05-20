import PageContainer from "../../components/layouts/PageContainer";
import CreateFlashcardForm from "../../components/ui/CreateFlashcardForm";

const CreateFlashcardPage = () => {
  return (
    <PageContainer>
      <h1 className="text-xl font-bold mb-4">Create Flashcard</h1>
      <CreateFlashcardForm />
    </PageContainer>
  );
};

export default CreateFlashcardPage;
