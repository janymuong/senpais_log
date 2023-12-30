import React, { useState, useEffect } from 'react';
import './App.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// imports for react notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import linkedinIcon from './img/linkedin-light.svg';
import twitchIcon from './img/twitch.svg';
import twitterIcon from './img/twitter-light.svg';
import githubIcon from './img/github-light.svg';
import instagramIcon from './img/instagram-light.svg';
import discordIcon from './img/discord.svg';
import deleteIcon from './img/delete.png';
import appLogo from './img/anime-emot.svg';

function App() {

  const handleRefresh = () => {
    window.location.reload();
  };

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

  const [selectedDate, setSelectedDate] = useState(
    selectedAnime ? new Date(updateAnime.release_date) : null
  );  

  const [isFormVisible, setIsFormVisible] = useState(false);

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
    if (!searchTerm.trim()) {
      console.log('Search term is empty.');
      return;
    }
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
    let createdAnimeTitle;
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
        createdAnimeTitle = data.anime.title;
        toast.success(`Anime ${createdAnimeTitle} was successfully created!`, { autoClose: 5000 });
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
          const deletedAnimeTitle = data.deleted_anime.title;
  
          toast.success(`Anime ${deletedAnimeTitle} deleted!`);
  
          setTimeout(() => {
            toast.dismiss();
            fetchAnimeTitles();
          }, 5000);
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
    const updatedTitle = updateAnime.title;
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
        toast.success(`Anime ${updatedTitle} was successfully updated!`, { autoClose: 5000 });
        setSelectedAnime(null);
      })
      .catch(error => console.error('Error updating anime:', error));
  };

  return (
    <div className="App">
      <h1 id="app-name" onClick={handleRefresh}>
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
        <button onClick={handleSearch} disabled={!searchTerm.trim()}>検索入力</button>
      </div>
      <hr className="divider" />

      {animeTitles.map(anime => (
        <div
          className={`title ${anime.id === selectedAnime?.id ? 'selected-anime' : ''}`}
          key={anime.id}
          onClick={() => handleSelectAnime(anime)}
        >
          <li className="anime-title">{anime.title}</li>
          <li className="anime-description">{anime.description}</li>
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
          <div className="watch-section">
            <h2 className="watch">Night's Watch</h2>
            {animeTitles.some(anime => !anime.watched) ? (
              <ul className="anime-sp">
                {animeTitles
                  .filter(anime => !anime.watched)
                  .map(anime => (
                    <li className="title" key={anime.id} onClick={() => handleSelectAnime(anime)}>
                      {anime.title}
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="empty-message">ZZzz - Your WATCH's empty.</p>
            )}
          </div>
        )}
        <br></br>

        <div className="recommendation-section">
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
                <li className="splog-descp">{recommendation.description}</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="create-anime-button-container">
        <button className="create-anime-button" onClick={() => setIsFormVisible(true)}>
          Create or Update Anime
        </button>
      </p>

      {isFormVisible && (
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
            <DatePicker
              placeholderText="e.g: 12/30/2023 for MM/DD/YYYY."
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                if (selectedAnime) {
                  setUpdateAnime({ ...updateAnime, release_date: date });
                } else {
                  setNewAnime({ ...newAnime, release_date: date });
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
      )}
  
      {/* ToastContainer to render the notifications */}
      <ToastContainer />

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
          &copy; {new Date().getFullYear()} World Wide 'WEEB' :). Unlicense. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
