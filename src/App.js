import './App.css';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import NewsTabs from "./components/NewsTabs";
import Banner from "./components/Banner";
import NewsSection from './components/NewsSection';
import Connect from './components/Connect';
import Favorites from "./components/Favorites";  

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ✅ Define toggleDarkMode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Apply dark mode to the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      {/* ✅ Pass darkMode and toggleDarkMode to NavBar */}
      <div className="navbar-container">
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <div className="news-tabs-container">
        <NewsTabs />
      </div>

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              {/* ✅ Pass setSearchQuery to Banner */}
              <Banner onSearch={setSearchQuery} />  
              <div className="main-content">
                <h1><b>Daily Digest</b></h1><hr />
                {/* ✅ Pass searchQuery to NewsSection */}
                <NewsSection searchQuery={searchQuery} />
              </div>
              <Connect />
            </>
          } 
        />
        
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
