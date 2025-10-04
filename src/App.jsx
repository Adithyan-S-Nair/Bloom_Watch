import React, { useState } from 'react';
import BloomMapPage from "./components/BloomMapPage";
import HomePage from "./components/HomePage";
import InsightsPage from "./components/InsightsPage";
import TrendsPage from "./components/TrendsPage";

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
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};

export default App;