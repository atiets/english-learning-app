import PageContainer from "../../components/layouts/PageContainer";
import CreateFlashcardForm from "../../components/ui/CreateFlashcardForm";
import { PageHeader } from "../../components/ui/RetroUI";

const CreateFlashcardPage = () => (
  <PageContainer>
    <PageHeader index="03" eyebrow="Vocabulary records / new entry" title="Create flashcard" description="File one English word or phrase with a clear meaning. Both fields are required." />
    <CreateFlashcardForm />
  </PageContainer>
);

export default CreateFlashcardPage;
