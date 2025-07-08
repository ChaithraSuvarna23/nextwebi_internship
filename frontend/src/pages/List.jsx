import React, { useState, useEffect } from 'react';
import BiryaniCard from 'components/Bircards/Bircards';
import FilterButton from 'components/Filterbutton/Filterbutton';
import Chip from '@mui/material/Chip';
import { useCart } from 'context/CartContext';
import 'styles.css';
import axios from 'axios';

export default function List() {
  const [biryaniData, setBiryaniData] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const { addToCart, updateQuantity, cartItems } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/biryani')
      .then(response => {
        setBiryaniData(response.data);
      })
      .catch(error => {
        console.error('Error fetching biryani items:', error);
      });
  }, []);

  const getQuantity = (title) => {
    const item = cartItems.find(i => i.title === title);
    return item ? item.quantity : 0;
  };

  const filteredItems = biryaniData
    .filter(item => cuisineFilter.length === 0 || item.cuisine.some(c => cuisineFilter.includes(c)))
    .filter(item => item.rating >= ratingFilter)
    .filter(item => {
      if (typeFilter.length === 0) return true; 

      return typeFilter.every(filter =>
        filter === 'Best Seller'
          ? item.tag?.includes('Best Seller') 
          : item.type === filter              
      );
    })

  return (
    <div className="list-page">
      <div className="filter-row">
        <div className="bfilters">
          <button
            className={typeFilter.length === 0 ? 'active' : ''}
            onClick={() => setTypeFilter([])}
          >
            All
          </button>
          {['Veg', 'NonVeg', 'Best Seller'].map((type) => (
            <button
              key={type}
              className={typeFilter.includes(type) ? 'active' : ''}
              onClick={() =>
                setTypeFilter((prev) =>
                  prev.includes(type)
                    ? prev.filter((t) => t !== type)
                    : [...prev, type]
                )
              }
            >
              {type}
            </button>
          ))}
        </div>

        <FilterButton
          cuisineFilter={cuisineFilter}
          onCuisineChange={setCuisineFilter}
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
        />
      </div>

      <div className="applied-filters">
        {typeFilter.map((type) => (
          <Chip
            key={type}
            label={type}
            onDelete={() => setTypeFilter(typeFilter.filter(t => t !== type))}
            variant="outlined"
            sx={{ mr: 1 }}
          />
        ))}

        {cuisineFilter.map((cuisine) => (
          <Chip
            key={cuisine}
            label={cuisine}
            onDelete={() => setCuisineFilter(cuisineFilter.filter(c => c !== cuisine))}
            variant="outlined"
            sx={{ mr: 1 }}
          />
        ))}

        {ratingFilter !== 0 && (
          <Chip
            label={`${ratingFilter}★ & up`}
            onDelete={() => setRatingFilter(0)}
            variant="outlined"
            sx={{ mr: 1 }}
          />
        )}
      </div>

      <div className="card-container">
        {filteredItems.map((item, index) => (
          <BiryaniCard
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
            badge={item.badge}
            price={item.price}
            type={item.type}
            rating={item.rating}
            quantity={getQuantity(item.title)}
            onQuantityChange={(newQty) => updateQuantity(item.title, newQty)}
            onAddToCart={() => addToCart(item)}
            quantityControl={true}
            showDescription={false}
            showVegIcon={true}
            showRating={true}
            showAddToCart={true}
          />
        ))}
      </div>
    </div>
  );
}


/*import React, { useState } from 'react';
import biryaniData from 'data/biryaniData.json';
import BiryaniCard from 'components/Bircards/Bircards';
import FilterButton from 'components/Filterbutton/Filterbutton';
import 'styles.css';
import Chip from '@mui/material/Chip';
import { useCart } from 'context/CartContext';

export default function List() {
  const [typeFilter, setTypeFilter] = useState([]);           
  const [cuisineFilter, setCuisineFilter] = useState([]); 
  const [ratingFilter, setRatingFilter] = useState(0);           

  const filteredItems = biryaniData
    .filter(item => {
      if (typeFilter.length === 0) return true;
      return typeFilter.includes(item.type) || (typeFilter.includes('Best Seller') && item.tag?.includes('Best Seller'));
    })
    .filter(item => cuisineFilter.length === 0 || 
      item.cuisine.some(c => cuisineFilter.includes(c)))
    .filter(item => item.rating >= ratingFilter)
    
  const getQuantity = (title) => {
    const item = cartItems.find(i => i.title === title);
    return item ? item.quantity : 0;
  };

  const { addToCart, updateQuantity, cartItems } = useCart();

  return (
    
      <div className="list-page">
        <div className="filter-row">
          <div className="bfilters">
            <button
                    className={typeFilter.length === 0 ? 'active' : ''}
                    onClick={() => setTypeFilter([])}
            >
              All
            </button>
            {['Veg', 'NonVeg', 'Best Seller'].map((type) => (
              <button
                key={type}
                className={typeFilter.includes(type) ? 'active' : ''}
                onClick={() =>
                  setTypeFilter((prev) =>
                    prev.includes(type)
                      ? prev.filter((t) => t !== type)
                      : [...prev, type]
                  )
                }
              >
                {type}
              </button>
            ))}
          </div>

          <FilterButton
            cuisineFilter={cuisineFilter}
            onCuisineChange={setCuisineFilter}
            ratingFilter={ratingFilter}
            onRatingChange={setRatingFilter}
          />

        </div>
        <div className="applied-filters">  
            {typeFilter.length > 0 &&
              typeFilter.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onDelete={() =>setTypeFilter(typeFilter.filter((t) => t !== type))}
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
              ))
            }

            {cuisineFilter.map((cuisine) => (
              <Chip
                key={cuisine}
                label={cuisine}
                onDelete={() => setCuisineFilter(cuisineFilter.filter(c => c !== cuisine))}
                variant="outlined"
                sx={{ marginRight: 1 }}
              />
            ))}

            {ratingFilter !== 0 && (
              <Chip
                label={`${ratingFilter}★ & up`}
                onDelete={() => setRatingFilter(0)}
                variant="outlined"
                sx={{ marginRight: 1 }}
              />
            )}
        </div>

        <div className="card-container">
          {filteredItems.map((item, index) => (
            <BiryaniCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              badge={item.badge}
              price={item.price}
              type={item.type}
              rating={item.rating}
              quantity={getQuantity(item.title)}
              onQuantityChange={(newQty) => {
                updateQuantity(item.title, newQty);
              }}
              onAddToCart={() => addToCart(item)}
              quantityControl={true}
              showDescription={false}
              showVegIcon={true}
              showRating={true}
              showAddToCart={true}  
            />
          ))}
        </div>
      </div>
    
  );
}
*/