import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppCopy from './components/AppCopy';
import CardPage from './components/CardPage';
import Card from './components/Card/Card';
import InputForm from './components/form';
import QuizPage from './components/Quiz/QuizPage';

function App() {

  document.title = 'Interest Me';
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/card/:encodedArrayinterests/:learning" element={<CardPage />} />
        <Route path="/quiz/:topic" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;