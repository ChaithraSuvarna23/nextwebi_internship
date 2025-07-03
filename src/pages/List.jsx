import React, { useState } from 'react';
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





/*import React, { useState } from 'react';
import biryaniData from 'data/biryaniData.json';
import BiryaniCard from 'components/Bircards/Bircards';
import 'styles.css';
import Layout from 'layout/Layout';
import FilterButton from 'components/Filterbutton/Filterbutton'

export default function List() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [bestsellerFilter, setBestsellerFilter] = useState('All');
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState(0);


  const filteredItems = biryaniData
  .filter(item => {
    if (typeFilter === 'All') return true;
    return item.type === typeFilter;
  })
  
  .filter(item => {
    const bestseller = {
      All: true,
      VegBestseller: item.isVeg && item.badge === 'Best Seller',
      NonVegBestseller: !item.isVeg && item.badge === 'Best Seller'
    };
    return bestseller[bestsellerFilter];
  })
  .filter(item => {
    if (cuisineFilter === 'All') return true;
    return item.cuisine === cuisineFilter;
  })
  .filter(item => item.rating >= ratingFilter);
  
  return (
     <Layout>
      <div className="list-page">
        <div className="filter-row">
          <div className="bfilters">
            <button className={typeFilter === 'All' ? 'active' : ''} onClick={() => setTypeFilter('All')}>All</button>
            <button className={typeFilter === 'Veg' ? 'active' : ''} onClick={() => setTypeFilter('Veg')}>Veg</button>
            <button className={typeFilter === 'NonVeg' ? 'active' : ''} onClick={() => setTypeFilter('NonVeg')}>Non-Veg</button>
            <button className={typeFilter === 'NonVeg' ? 'active' : ''} onClick={() => setTypeFilter('NonVeg')}>Non-Veg</button>
          </div>
          
          <FilterButton
            bestsellerFilter={bestsellerFilter}
            onBestsellerChange={setBestsellerFilter}
            cuisineFilter={cuisineFilter}
            onCuisineChange={setCuisineFilter}
            ratingFilter={ratingFilter}
            onRatingChange={setRatingFilter}
          /> 
        </div>

        <div className="card-container">
          {filteredItems.map((item, index) => (
            <BiryaniCard
              title={item.title}
              image={item.image}
              badge={item.badge}
              price={item.price}
              type={item.type}
              rating={item.rating}
              quantityControl={true}
              showDescription={false}
              showVegIcon={true}
              showRating={true}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
*/