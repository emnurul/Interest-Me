import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardPage from './components/CardPage';
import Card from './components/Card/Card';
import InputForm from './components/InputForm';
import QuizPage from './components/Quiz/QuizPage';
import QuizPageNoP from './components/Quiz No Prompt/QuizPageNoP';

function App() {

  document.title = 'Interest Me';
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/card/:encodedArrayinterests/:learning" element={<CardPage />} />
        <Route path="/quiz/:topic" element={<QuizPage />} />
        <Route path="/quiznop/:topic" element={<QuizPageNoP />} />
      </Routes>
    </Router>
  );
}

export default App;