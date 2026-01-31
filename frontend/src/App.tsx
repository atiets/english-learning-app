import React from 'react';
import MainLayout from './layouts/MainLayout';
import FlashcardsPage from './pages/Flashcards/FlashcardsPage';
import StudyFlashcardsPage from './pages/Flashcards/StudyFlashcardsPage';
import './App.css';

function App() {
  return (
    <MainLayout>
      <StudyFlashcardsPage />
    </MainLayout>
  );
}

export default App;
