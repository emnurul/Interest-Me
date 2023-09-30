import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardPage from './components/CardPage';
import Card from './components/Card/Card';
import InputForm from './components/form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/card/:encodedArrayinterests/:learning" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;