import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogDetail from './pages/LogDetail';
import CreateLogs from './pages/CreateLogs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs/:id" element={<LogDetail />} />
        <Route path="/create-logs" element={<CreateLogs />} />
      </Routes>
    </Router>
  );
}

export default App;
