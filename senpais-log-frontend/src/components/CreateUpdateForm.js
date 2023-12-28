// CreateUpdateForm.js
import React, { useState, useEffect } from 'react';

function CreateUpdateForm({
  isUpdate,
  animeData,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(animeData);

  useEffect(() => {
    setFormData(animeData);
  }, [animeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // validate and format release_date
    const formattedValue = name === 'release_date' ? formatReleaseDate(value) : value;

    console.log(`Setting ${name} to:`, formattedValue);

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  // Helper Function to format release_date
  const formatReleaseDate = (inputDate) => {
    // date formatting logic 
    const parts = inputDate.split('/');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return inputDate;
  };

  return (
    <div className="create-anime-container">
      <h2>{isUpdate ? 'Update Anime' : 'Create Anime'}</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />

        <label>Release Date:</label>
        <input
          type="date"
          placeholder="e.g: 12/30/2023 for MM/DD/YYYY."
          name="release_date"
          value={formData.release_date}
          onChange={handleChange}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />

        {isUpdate && (
          <>
            <label>Watched:</label>
            <select
              name="watched"
              value={formData.watched.toString()}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </>
        )}

        <button type="button" onClick={() => onSubmit(formData)}>
          {isUpdate ? 'UPDATE' : 'SAVE'}
        </button>

        <button type="button" onClick={onCancel}>
          CANCEL
        </button>
      </form>
    </div>
  );
}

export default CreateUpdateForm;
