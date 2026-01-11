import React from 'react';
import MainLayout from './layouts/MainLayout';
import FlashcardsPage from './pages/Flashcards/FlashcardsPage';
import './App.css';

function App() {
  return (
    <MainLayout>
      <FlashcardsPage />
    </MainLayout>
  );
}

export default App;