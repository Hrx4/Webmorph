import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import { WebsiteBuilderProvider } from './context/WebsiteBuilderContext';

function App() {
  return (
    <WebsiteBuilderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<BuilderPage />} />
        </Routes>
      </Router>
    </WebsiteBuilderProvider>
  );
}

export default App;