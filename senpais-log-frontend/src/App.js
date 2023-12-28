// this jsx code is used with components - separation of concern
import React, { useState, useEffect } from 'react';
import './App.css';

import appLogo from './img/anime-emot.svg';

import AnimeList from './components/AnimeList';
import CreateUpdateForm from './components/CreateUpdateForm';
import Recommendation from './components/Recommendation';
import Footer from './components/Footer';

function App() {
  const [animeTitles, setAnimeTitles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [newAnime, setNewAnime] = useState({
    title: '',
    description: '',
    genre: '',
    release_date: '',
    image_url: '',
    watched: false,
  });
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [updateAnime, setUpdateAnime] = useState({
    title: '',
    description: '',
    genre: '',
    release_date: '',
    image_url: '',
    watched: false,
  });

  useEffect(() => {
    fetchAnimeTitles();
  }, []);

  const fetchAnimeTitles = () => {
    fetch('http://localhost:5000/anime')
      .then(response => response.json())
      .then(data => setAnimeTitles(data.anime))
      .catch(error => console.error('Error fetching anime titles:', error));
  };

  const handleSearch = () => {
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
    fetch('http://localhost:5000/recommend_anime/1')
      .then(response => response.json())
      .then(data => {
        console.log('Recommendation data:', data);
        setRecommendation(data.recommendation);
      })
      .catch(error => console.error('Error fetching recommendation:', error));
  };

  const handleCreateAnime = () => {
    // check if release_date is a non-empty string
    if (!newAnime.release_date) {
      console.error('Release date is required.');
      return;
    }
  
    // API calls issues/debugging soln - log the data before making the API call
    console.log('Creating new anime with data:', newAnime);
  
    fetch('http://localhost:5000/anime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnime),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New anime created:', data.anime);
        setNewAnime({
          title: '',
          description: '',
          genre: '',
          release_date: '',
          image_url: '',
          watched: false,
        });
        fetchAnimeTitles();
      })
      .catch(error => console.error('Error creating anime:', error));
  };
  

  const handleDeleteAnime = animeId => {
    if (window.confirm('Are you sure you want to delete this anime?')) {
      fetch(`http://localhost:5000/anime/${animeId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Anime deleted:', data.deleted_anime);
          fetchAnimeTitles();
        })
        .catch(error => console.error('Error deleting anime:', error));
    }
  };

  const handleSelectAnime = anime => {
    setSelectedAnime(anime);
    setUpdateAnime({
      title: anime.title,
      description: anime.description,
      genre: anime.genre,
      release_date: anime.release_date,
      image_url: anime.image_url,
      watched: anime.watched,
    });
  };

  const handleUpdateAnime = () => {
    const { id } = selectedAnime;
    fetch(`http://localhost:5000/anime/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateAnime),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Anime updated:', data.updated_anime);
        fetchAnimeTitles();
        setUpdateAnime({
          title: '',
          description: '',
          genre: '',
          release_date: '',
          image_url: '',
          watched: false,
        });
        setSelectedAnime(null);
      })
      .catch(error => console.error('Error updating anime:', error));
  };

  return (
    <div className="App">
      <h1 id="app-name">
        {' '}
        <img src={appLogo} alt="Anime Emoticon" />
        Senpai's Log
      </h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Anime"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>検索入力</button>
      </div>
      <hr className="divider" />

      <AnimeList
        animeTitles={animeTitles}
        onSelect={handleSelectAnime}
        onDelete={handleDeleteAnime}
      />

      <div className="cards">
        {searchTerm && (
          <div>
            <h2>検索入力</h2>
            <ul>
              {animeTitles.map(anime => (
                <div className="title" key={anime.id} onClick={() => handleSelectAnime(anime)}>
                  <li>{anime.title}</li>
                  <li>{anime.description}</li>
                </div>
              ))}
            </ul>
          </div>
        )}

        {!searchTerm && (
          <div>
            <h2 className="watch">Night's Watch</h2>
            <ul className="anime-sp">
              {animeTitles.map(anime => (
                <li className="title" key={anime.id} onClick={() => handleSelectAnime(anime)}>
                  {anime.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        <br></br>

        <span>
          You have reached thus far; get a good ANIME recommendation from your SENPAI here:
        </span>
        <button className="recommendation-button" onClick={handleRecommendation}>
          sp_LOG Anime
        </button>
        {recommendation && <Recommendation recommendation={recommendation} />}
      </div>

      <CreateUpdateForm
        isUpdate={!!selectedAnime}
        animeData={selectedAnime || newAnime}
        onSubmit={selectedAnime ? handleUpdateAnime : handleCreateAnime}
        onCancel={() => setSelectedAnime(null)}
      />

      <Footer />
    </div>
  );
}

export default App;
