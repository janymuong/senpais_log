// AnimeList.js
import React from 'react';
import AnimeCard from './AnimeCard';

const AnimeList = ({ animeTitles, onSelect, onDelete }) => {
  return (
    <div>
      {animeTitles.map(anime => (
        <AnimeCard key={anime.id} anime={anime} onSelect={onSelect} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default AnimeList;
