import React, { useState } from 'react';
import BloomMapPage from "./components/BloomMapPage";
import HomePage from "./components/HomePage";
import InsightsPage from "./components/InsightsPage";
import TrendsPage from "./components/TrendsPage";
import AboutNasa from "./components/AboutNasa"; // Correct import name

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'map':
        return <BloomMapPage onNavigate={setCurrentPage} />;
      case 'trends':
        return <TrendsPage onNavigate={setCurrentPage} />;
      case 'insights':
        return <InsightsPage onNavigate={setCurrentPage} />;
      case 'nasa':
        return <AboutNasa onNavigate={setCurrentPage} />; // Correct component name
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};

export default App;