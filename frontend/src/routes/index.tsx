import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import FlashcardsPage from "../pages/Flashcards/FlashcardsPage";
import CreateFlashcardForm from "../components/ui/CreateFlashcardForm";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* <Route path="/" element={<HomePage />} /> */}

                <Route path="/flashcards" element={<FlashcardsPage />} />

                <Route path="/" element={<CreateFlashcardForm />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;