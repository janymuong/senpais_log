import React from 'react';
import { Link } from 'react-router-dom';

function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.id}`}>
      <div className="card">
        <img src={anime.imageUrl} alt={anime.title} />
        <h3>{anime.title}</h3>
      </div>
    </Link>
  );
}

export default AnimeCard;
