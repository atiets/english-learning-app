import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import FlashcardsPage from "../pages/Flashcards/FlashcardsPage";
import CreateFlashcardPage from "../pages/Flashcards/CreateFlashcardPage";
import EditFlashcardPage from "../pages/Flashcards/EditFlashcardPage";
import MainLayout from "../components/layouts/MainLayout";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/flashcards" element={<FlashcardsPage />} />

          <Route path="/flashcards/new" element={<CreateFlashcardPage />} />

          <Route path="/flashcards/edit/:id" element={<EditFlashcardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
