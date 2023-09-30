import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppCopy from './components/AppCopy';
import CardPage from './components/CardPage';
import Card from './components/Card/Card';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppCopy />} />
        <Route path="/card" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;