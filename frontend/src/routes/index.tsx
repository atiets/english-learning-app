import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import FlashcardsPage from "../pages/Flashcards/FlashcardsPage";
import CreateFlashcardForm from "../components/ui/CreateFlashcardForm";
import EditFlashcardPage from "../pages/Flashcards/EditFlashcardPage";
import MainLayout from "../components/layouts/MainLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/flashcards" element={<FlashcardsPage />} />

          <Route path="/flashcards/new" element={<CreateFlashcardForm />} />

          <Route path="/flashcards/edit/:id" element={<EditFlashcardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

