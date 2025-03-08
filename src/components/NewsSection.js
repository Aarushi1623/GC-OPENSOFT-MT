import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/NewsSection.css";

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

function NewsSection() {
  const [news, setNews] = useState({});
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const scrollRefs = useRef({});

  // Fetch news for a category
  const fetchNews = async (category) => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      setNews((prevNews) => ({
        ...prevNews,
        [category]: response.data.articles || [],
      }));
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error.message);
    }
  };

  // Fetch news for all categories on mount
  useEffect(() => {
    CATEGORIES.forEach((category) => fetchNews(category));
  }, []);

  // Scroll function
  const scroll = (category, direction) => {
    const container = scrollRefs.current[category];
    if (container) {
      container.scrollBy({ left: direction * 300, behavior: "smooth" });
    }
  };

  // Toggle favorite articles
  const toggleFavorite = (article) => {
    let updatedFavorites = favorites.some((fav) => fav.url === article.url)
      ? favorites.filter((fav) => fav.url !== article.url) // Remove if already favorited
      : [...favorites, article]; // Add if not favorited

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Share article
  const shareArticle = (article) => {
    if (navigator.share) {
      navigator
        .share({ title: article.title, url: article.url })
        .then(() => console.log("Article shared!"))
        .catch((error) => console.log("Sharing failed:", error));
    } else {
      navigator.clipboard.writeText(`${article.title} - ${article.url}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Container className="news-section">
      {CATEGORIES.map((category) => (
        <div key={category} id={category} className="news-category">
          <h2>{category.toUpperCase()} NEWS</h2>
          <div className="scroll-wrapper">
            {/* Scroll Left Button */}
            <button className="scroll-btn left" onClick={() => scroll(category, -1)}>
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* News Cards */}
            <div className="news-scroll-container" ref={(el) => (scrollRefs.current[category] = el)}>
              {news[category]?.map((article, index) => (
                <div key={index} className="news-card">
                  <div className="news-image-container">
                    <img
                      src={article.urlToImage || "https://via.placeholder.com/300x150?text=No+Image"}
                      alt={article.title}
                      onError={(e) => {
                        if (e.target.src !== "https://via.placeholder.com/300x150?text=No+Image") {
                          e.target.src = "https://via.placeholder.com/300x150?text=No+Image";
                        }
                      }}
                    />
                  </div>

                  <div className="news-content">
                    <h5>{article.title}</h5>
                    <p>{article.description}</p>

                    {/* Favorite Button */}
                    <button
                      className={`favorite-btn ${favorites.some((fav) => fav.url === article.url) ? "favorited" : ""}`}
                      onClick={() => toggleFavorite(article)}
                    >
                      {favorites.some((fav) => fav.url === article.url) ? "❤ Favorited" : "🤍 Favorite"}
                    </button>

                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read More <i className="bi bi-arrow-right"></i>
                    </a>
                    <br />
                    <button className="share-icon" onClick={() => shareArticle(article)}>
                      <i className="bi bi-share-fill"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button className="scroll-btn right" onClick={() => scroll(category, 1)}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default NewsSection;
