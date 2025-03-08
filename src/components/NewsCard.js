import "../css/NewsCard.css";
// import { useNewsContext } from "../contexts/NewsContext"; // Assuming you have a NewsContext

function NewsCard({news}) {
    // const { isFavorite, addToFavorites, removeFromFavorites } = useNewsContext();
    // const favorite = isFavorite(news.id);

    function onFavoriteClick(e) {
        // e.preventDefault();
        // if (favorite) removeFromFavorites(news.id);
        // else addToFavorites(news);
        alert("clicked")
    }

    return (
        <div className="news-card">
            <div className="news-image">
                <img src={news.imageUrl} alt={news.title} />
                <div className="news-overlay">
                    <button 
                        className= "favorite-btn" onClick={onFavoriteClick}
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className="news-info">
                <h3>{news.title}</h3>
                <p>{news.description}</p>
            </div>
        </div>
    );
}

export default NewsCard;
