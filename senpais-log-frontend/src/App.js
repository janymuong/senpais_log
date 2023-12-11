import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [animeTitles, setAnimeTitles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    // fetch anime titles when the component mounts
    fetchAnimeTitles();
  }, []);

  const fetchAnimeTitles = () => {
    fetch('http://localhost:5000/anime')
      .then(response => response.json())
      .then(data => setAnimeTitles(data.anime))
      .catch(error => console.error('Error fetching anime titles:', error));
  };

  const handleSearch = () => {
    // fetch anime titles based on the search term
    fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search_in: searchTerm }),
    })
      .then(response => response.json())
      .then(data => setAnimeTitles(data.anime_results))
      .catch(error => console.error('Error searching anime:', error));
  };

  const handleRecommendation = () => {
    // fetch anime recommendation for a specific user;
    fetch('http://localhost:5000/recommend_anime/1')
      .then(response => response.json())
      .then(data => setRecommendation(data.recommendation))
      .catch(error => console.error('Error fetching recommendation:', error));
  };

  return (
    <div className="App">
      <h1>Senpai's Log</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Anime"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchTerm && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {animeTitles.map(anime => (
              <div>
                <li key={anime.id}>{anime.title}</li>
                <li>{anime.description}</li>
              </div>
              
            ))}
          </ul>
        </div>
      )}

      {!searchTerm && (
        <div>
          <h2>Night's Watch</h2>
          <ul>
            {animeTitles.map(anime => (
              <li key={anime.id}>{anime.title}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <button onClick={handleRecommendation}>Get Recommendation</button>
        {recommendation && (
          <p>Recommendation: {recommendation.title}</p>
        )}
      </div>
    </div>
  );
}

export default App;
