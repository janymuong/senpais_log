// Recommendation.js
import React from 'react';

const Recommendation = ({ recommendation }) => {
  return (
    <div>
      <p>
        My Otaku friend, your <strong>Senpai</strong> recommends watching :){' '}
      </p>
      <ul className="splog-rbg">
        <li className="splog-r">{recommendation.title}</li>
        <li className="splog-r">{recommendation.description}</li>
      </ul>
    </div>
  );
};

export default Recommendation;
