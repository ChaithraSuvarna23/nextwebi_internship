import React, { useState } from 'react';
import './Filterbutton.css';

const cuisineOptions = ['Biryani', 'Pizza', 'Burger', 'Kebabs'];
const ratingOptions = [4, 3, 2];

export default function FilterButton({
  cuisineFilter,
  onCuisineChange,
  ratingFilter,
  onRatingChange
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleCuisine = (cuisine) => {
    if (cuisineFilter.includes(cuisine)) {
      onCuisineChange(cuisineFilter.filter(c => c !== cuisine));
    } else {
      onCuisineChange([...cuisineFilter, cuisine]);
    }
  };

  const handleRatingClick = (rating) => {
    onRatingChange(ratingFilter === rating ? 0 : rating);
  };


  return (
    <div className="filter-wrapper">
      <button className="filter-toggle" onClick={() => setShowDropdown(prev => !prev)}>
        Filter
      </button>

      {showDropdown && (
        <div className="filter-dropdown">

          <div className="filter-group">
            <h4>Cuisine</h4>
            <div className="filter-buttons">
              {cuisineOptions.map(cuisine => (
                <button
                  key={cuisine}
                  className={cuisineFilter.includes(cuisine) ? 'active' : ''}
                  onClick={() => toggleCuisine(cuisine)}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Rating</h4>
            <div className="filter-buttons">
              {ratingOptions.map(rating => (
                <button
                  key={rating}
                  className={ratingFilter === rating ? 'active' : ''}
                  onClick={() => handleRatingClick(rating)}
                >
                  {rating}★ & up
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}




/* import React, { useState } from 'react';
import './Filterbutton.css';

export default function Filterbutton({
  bestsellerFilter,
  onBestsellerChange,
  cuisineFilter,
  onCuisineChange,
  ratingFilter,
  onRatingChange
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="filter-wrapper">
      <button className="filter-toggle" onClick={() => setShowDropdown(prev => !prev)}>
        Filter
      </button>

      {showDropdown && (
        <div className="filter-dropdown">
          <div className="filter-group">
            <label htmlFor="bestseller">Bestseller</label>
            <select id="bestseller" value={bestsellerFilter} onChange={(e) => onBestsellerChange(e.target.value)}>
              <option value="All">All</option>
              <option value="VegBestseller">Veg Bestsellers</option>
              <option value="NonVegBestseller">Non-Veg Bestsellers</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="cuisine">Cuisine</label>
            <select id="cuisine" value={cuisineFilter} onChange={(e) => onCuisineChange(e.target.value)}>
              <option value="All">All</option>
              <option value="Biryani">Biryani</option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Kebabs">Kebab</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="rating">Rating</label>
            <select id="rating" value={ratingFilter} onChange={(e) => onRatingChange(Number(e.target.value))}>
              <option value={0}>All</option>
              <option value={4}>4★ </option>
              <option value={3}>3★ </option>
              <option value={2}>2★ </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
*/
