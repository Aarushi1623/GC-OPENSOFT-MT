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

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
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
              <Banner onSearch={setSearchQuery} />  
              <div className="main-content">
                <h1><b>Daily Digest</b></h1><hr />
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
