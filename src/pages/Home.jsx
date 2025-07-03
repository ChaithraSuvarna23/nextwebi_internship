import 'styles.css';
import React, { useRef, useState } from 'react';
import BiryaniCards from 'components/Bircards/Bircards';
import biryaniData from 'data/biryaniData.json';
import ReviewCards from 'components/Reviewcards/Reviewcards';
import reviewData from 'data/reviewData';
import { useNavigate } from 'react-router-dom';


function Home() {
  const carouselRef = useRef(null);
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const [orderType, setOrderType] = useState('dinein');

  const navigate = useNavigate();
  
  return (
    <>
      <section className="biryani" style={{ backgroundImage: "url('/assets/biryani.png')" }}>
        <div className="biryani-content">
          <div className="left">
            <h1>Best Biryani In <br /> Electronic City</h1>
            <p>Bagara Biryani is fusion of Telangana special rice and many hidden recipes of tribes.
                Hence we call it as Folk Biryani or Naatu Biryani.</p>
            <button className="click-btn">Click Here</button>
          </div>
        </div>
        <img className="disc" src="/assets/disc.png" alt="biryani" />
      </section>


      <section className="booking-section">
        <div className="container">
          <div className="about-text">
            <h2>Traditional Chicken<br /> Biryani In Electronic City</h2>
            <br />
            <p>Bagara Biryani is fusion of Telengana special rice and many hidden recipes of tribes. Hence we call it as Folk Biryani or Naatu Biryani.</p>
            <p>We have dedicated some of the names to remember the greatness and significance of many tribes of India. Like Banjara Chicken Biryani, Kalinga Chicken Biryani and many more</p>
            <p>Over all, if you want to taste a different biryani, visit us. It's flavorful and Unique..</p>

            <ul className="features">
              <li><i className="fas fa-check-circle"></i> World Level Insurance Travelling</li>
              <li><i className="fas fa-check-circle"></i> Many Language Tour Guide Skills</li>
              <li><i className="fas fa-check-circle"></i> Many Language Tour Guide Skills</li>
            </ul>
          </div>

          <div className="booking-form">
            <h2>Book Your Table Now!</h2>
            <form>
              <div className="toggle-container">
                <input
                  type="radio"
                  id="dinein"
                  name="orderType"
                  checked={orderType === 'dinein'}
                  onChange={() => setOrderType('dinein')}
                />
                <label htmlFor="dinein" className="toggle-option">Dine in</label>

                <input
                  type="radio"
                  id="orderonline"
                  name="orderType"
                  checked={orderType === 'orderonline'}
                  onChange={() => setOrderType('orderonline')}
                />
                <label htmlFor="orderonline" className="toggle-option">Order online</label>
              </div>

              {orderType === 'dinein' ? (
                <>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Rojar" />

                  <label htmlFor="mobile">Mobile Number</label>
                  <input type="text" id="mobile" placeholder="+91" />

                  <div className="offer-box">
                    Get 15% discount on your next Dine in
                  </div>
                  <button className="submit-btn" type="submit">Submit</button>
                </>
              ) : (
                <div className="order-platforms">
                  <div className="platform-icons">
                    <a href="https://www.swiggy.com/city/bangalore/bagara-biryani-cafe-electronic-city-rest639045" target="_blank" rel="noopener noreferrer">
                      <img src="/assets/swiggy.png" alt="Order on Swiggy" className="platform-icon" />
                    </a>
                    <a href="https://www.zomato.com/bangalore/bagara-biriyani-cafe-electronic-city-bangalore" target="_blank" rel="noopener noreferrer">
                      <img src="/assets/zomato.png" alt="Order on Zomato" className="platform-icon" />
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>


      <section className="whychoose">
        <div className="whycontainer">
          <h2>Why Choose Bagara Biryani Cafe</h2>
          <div className="why-cards">
            <div className="why-card">
              <img src="/assets/deli.png" alt="Delivery Icon" className="why-icon" />
              <h3>24/7 delivery</h3>
              <p>Biryani cravings anytime? We deliver 24/7  hot, fresh, and fast!</p>
            </div>

            <div className="why-card">
              <img src="/assets/nati.png" alt="Nati Icon" className="why-icon" />
              <h3>Authentic Nati style</h3>
              <p>Bold spices, rich flavors experience the true taste of Authentic Nati Style Biryani!</p>
            </div>

            <div className="why-card">
              <img src="/assets/veri.png" alt="Variety Icon" className="why-icon2" />
              <h3>15 Plus Varieties Of Biryanis</h3>
              <p>Explore 15+ mouth-watering Biryani varieties, each crafted with unique spices and love.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="biryani-items">
        <div className="bir-title">
          <h2>Biryani Items</h2>
          <div className="nav-arrows">
            <button onClick={scrollLeft} className="nav-arrow">&#8592;</button>
            <button onClick={scrollRight} className="nav-arrow">&#8594;</button>
          </div>
        </div>
        <div className="biryani-carousel" ref={carouselRef}>
          {biryaniData.slice(0,4).map((item, index) => (
            <BiryaniCards
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              badge={item.badge}
            />
          ))}
        </div>
        <div className="dine-button-container">
          <button onClick={() => navigate('/list')} className="dine-button">Dine in</button> 
        </div>
      </section>

      
      <section className="catering-section">
        <h2 className="catering-title">Looking for customized Bulk Biryani<br/>Boxes & Catering Services</h2>
        <div className="catering-boxes">
          <div className="catering-card">
            <img src="/assets/vegbuf.png" alt="VegBuffetImage" className="catering-img" />
            <div className="catering-details">
              <img src="/assets/vegbuftitle.png" alt="vegbuftitle" />
              <ul>
                <li>Soup</li>
                <li>Veg Starter</li>
                <li>Bread</li>
                <li>Veg Curry</li>
                <li>Veg Biryani</li>
                <li>Salan</li>
                <li>Raita</li>
                <li>Dessert</li>
                <li>Ice Cream Scoop</li>
              </ul>
            </div>
          </div>
          <div className="catering-card">
            <img src="/assets/vegbuf2.png" alt="NonVegBuffetImage" className="catering-img" />
            <div className="catering-details">
              <img src="/assets/vegbuftitle.png" alt="vegbuftitle" />
              <ul>
                <li>Soup</li>
                <li>Veg Starter</li>
                <li>Bread</li>
                <li>Veg Curry</li>
                <li>Veg Biryani</li>
                <li>Salan</li>
                <li>Raita</li>
                <li>Dessert</li>
                <li>Ice Cream Scoop</li>
              </ul>
            </div>
          </div>
        </div>
        <button className="catering-btn">Contact us &#8594;</button>
      </section>


      <section className="celebrate">
        <h2 className="celebrate-title">Celebrate with us at Bagara Biryani Cafe in<br/> Electronic City</h2>
        <div className="celebrate-cards">
          <div className="celebrate-card1">
            <img src="/assets/get.png" alt="get together" className="getimg" />
            <div className="ccard-content">
              <h3>Social Get togethers</h3>
              <p>Hosting Open-Mic and Stand Up Comedy Shows for Lively Experiences.</p>
            </div>
          </div>
          <div className="celebrate-card">
            <img src="/assets/events.png" alt="Live events" />
            <div className="ccard-content">
              <h3>Live Events</h3>
              <p>Ideas Venue for various events.</p>
            </div>
          </div>
          <div className="celebrate-card">
            <img src="/assets/birthday.png" alt="Birthday" />
            <div className="ccard-content">
              <h3>Birthday Celebrations</h3>
              <p>Welcoming spaces for socials.</p>
            </div>
          </div>
        </div>
        <div className="contact-btn-container">
          <button className="contact-btn">Contact us &#8594;</button>
        </div>
      </section>


      <section className="unique">
        <div className="ucontainer">
          <h2 className="utitle">Uniqueness About Our Brand</h2>
          <div className="ucontent">
            <ul>
                <li><h4>In-House Food Processing Unit:</h4>
                  <p>Streamlining cost effective food production for quality and freshness.</p></li>
                <li><h4>No Skilled Manpower Required:</h4>
                  <p>Only last-mile regeneration like microwave or grill is required at the outlet level.</p></li>
                <li><h4>Supply Chain Management:</h4>
                  <p>Ensuring efficient sourcing, processing and distribution through single point of contact.</p></li>
                  <li><h4>Consistency Assured:</h4>
                  <p>Ensuring a consistent standard for all food items and beverages is guaranteed.</p></li>
            </ul>
            <img src="/assets/unique.png" alt="unique" />
          </div>   
        </div>
      </section>


      <section className="contact">
        <div className="contact-container">
          <h2>Contact us if you are interested<br/>in owning our Franchise</h2>
          <button className="cbtn">Get in touch&#8594; </button>
        </div>
      </section>


      <section className="reviews">
        <h2 className="reviews-title">User Reviews and Feedback</h2>
        <div className="reviews-container">
                {reviewData.map((item) => (
                    <ReviewCards
                        name={item.name}
                        review={item.review}
                        image={item.image}
                        rating={item.rating}
                    />
                ))}
        </div>
      </section>


      <section className="map">
        <div className="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.071101819968!2d77.64778817458767!3d12.838681917779477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b84b9b69563%3A0xa9bd721fcb25938e!2sBagara%20Biryani%20cafe!5e0!3m2!1sen!2sin!4v1749809753745!5m2!1sen!2sin"
            title="map"  width="1405"  height="300" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    </>
    
  );
}

export default Home;
