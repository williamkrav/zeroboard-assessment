import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogDetail from './pages/LogDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs/:id" element={<LogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
