import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

function Home() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    axios.get('/anime').then((response) => {
      setAnimes(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Senpai's Log</h1>
      <div className="anime-list">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default Home;
