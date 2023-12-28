import React, { useState, useEffect } from 'react';
import './App.css';

import linkedinIcon from './img/linkedin-light.svg';
import twitchIcon from './img/twitch.svg';
import twitterIcon from './img/twitter-light.svg';
import githubIcon from './img/github-light.svg';
import instagramIcon from './img/instagram-light.svg';
import discordIcon from './img/discord.svg';
import deleteIcon from './img/delete.png';
import appLogo from './img/anime-emot.svg';

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

      {animeTitles.map(anime => (
        <div className="title" key={anime.id} onClick={() => handleSelectAnime(anime)}>
          <li>{anime.title}</li>
          <li>{anime.description}</li>
          <button className="delete-button" onClick={() => handleDeleteAnime(anime.id)}>
            <img src={deleteIcon} title="Delete ANIME" alt="Delete" />
          </button>
        </div>
      ))}

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
        {recommendation && (
          <div>
            <p>
              My Otaku friend, your <strong>Senpai</strong> recommends watching :){' '}
            </p>
            <ul className="splog-rbg">
              <li className="splog-r">{recommendation.title}</li>
              <li className="splog-r">{recommendation.description}</li>
            </ul>
          </div>
        )}
      </div>

      <div className="create-anime-container">
        <h2>{selectedAnime ? 'Update Anime' : 'Create Anime'}</h2>
        <form>
          <label>Title:</label>
          <input
            type="text"
            value={selectedAnime ? updateAnime.title : newAnime.title}
            onChange={e => {
              if (selectedAnime) {
                setUpdateAnime({ ...updateAnime, title: e.target.value });
              } else {
                setNewAnime({ ...newAnime, title: e.target.value });
              }
            }}
          />

          <label>Description:</label>
          <textarea
            value={selectedAnime ? updateAnime.description : newAnime.description}
            onChange={e => {
              if (selectedAnime) {
                setUpdateAnime({ ...updateAnime, description: e.target.value });
              } else {
                setNewAnime({ ...newAnime, description: e.target.value });
              }
            }}
          ></textarea>

          <label>Genre:</label>
          <input
            type="text"
            value={selectedAnime ? updateAnime.genre : newAnime.genre}
            onChange={e => {
              if (selectedAnime) {
                setUpdateAnime({ ...updateAnime, genre: e.target.value });
              } else {
                setNewAnime({ ...newAnime, genre: e.target.value });
              }
            }}
          />

          <label>Release Date:</label>
          <input
            type="text"
            placeholder="e.g: 12/30/2023 for MM/DD/YYYY."
            value={selectedAnime ? updateAnime.release_date : newAnime.release_date}
            onChange={e => {
              if (selectedAnime) {
                setUpdateAnime({ ...updateAnime, release_date: e.target.value });
              } else {
                setNewAnime({ ...newAnime, release_date: e.target.value });
              }
            }}
          />

          <label>Image URL:</label>
          <input
            type="text"
            value={selectedAnime ? updateAnime.image_url : newAnime.image_url}
            onChange={e => {
              if (selectedAnime) {
                setUpdateAnime({ ...updateAnime, image_url: e.target.value });
              } else {
                setNewAnime({ ...newAnime, image_url: e.target.value });
              }
            }}
          />

          {selectedAnime && (
            <>
              <label>Watched:</label>
              <select
                value={updateAnime.watched}
                onChange={e =>
                  setUpdateAnime({ ...updateAnime, watched: e.target.value === 'true' })
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </>
          )}

          <button
            type="button"
            onClick={selectedAnime ? handleUpdateAnime : handleCreateAnime}
          >
            {selectedAnime ? 'UPDATE' : 'SAVE'}
          </button>
        </form>
      </div>

      <footer className="footer" id="footer">
        <h6>CONNECT with ME :</h6>
        <p align="left">
          <a
            href="https://www.linkedin.com/in/janymuong/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img align="center" src={linkedinIcon} title="LinkedIn" alt="@janymuong" />
          </a>
          <a href="https://www.twitch.tv/janymuong/" target="_blank" rel="noopener noreferrer">
            <img align="center" src={twitchIcon} title="Twitch" alt="@janymuong" />
          </a>
          <a href="https://twitter.com/janymuong/" target="_blank" rel="noopener noreferrer">
            <img align="center" src={twitterIcon} title="Twitter" alt="janymuong" />
          </a>
          <a href="https://github.com/janymuong/" target="_blank" rel="noopener noreferrer">
            <img align="center" src={githubIcon} title="GitHub" alt="@janymuong" />
          </a>
          <a
            href="https://instagram.com/jany_muong/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img align="center" src={instagramIcon} title="Instagram" alt="@janymuong" />
          </a>
          <code>
            <a href="https://discord.com/janymuong#0/" target="_blank" rel="noopener noreferrer">
              <img align="center" src={discordIcon} title="Discord" alt="@janymuong" />
            </a>
          </code>
        </p>
        <div className="copyright">
          &copy; 2023 World Wide 'WEEB' :). Unlicense. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;