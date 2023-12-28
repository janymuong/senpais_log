// AnimeCard.js
import React from 'react';
import deleteIcon from '../img/delete.png';

const AnimeCard = ({ anime, onSelect, onDelete }) => {
  return (
    <div className="title" onClick={() => onSelect(anime)}>
      <li>{anime.title}</li>
      <li>{anime.description}</li>
      <button className="delete-button" onClick={() => onDelete(anime.id)}>
        <img src={deleteIcon} title="Delete ANIME" alt="Delete" />
      </button>
    </div>
  );
};

export default AnimeCard;
