import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AnimeDetail({ match }) {
  const [anime, setAnime] = useState({});

  useEffect(() => {
    const animeId = match.params.id;
    axios.get(`http://localhost:5000/anime/${animeId}`).then((response) => {
      setAnime(response.data);
    });
  }, [match.params.id]);

  return (
    <div className="anime-detail">
      <h1>{anime.title}</h1>
      <img src={anime.imageUrl} alt={anime.title} />
      <p>{anime.description}</p>
    </div>
  );
}

export default AnimeDetail;
