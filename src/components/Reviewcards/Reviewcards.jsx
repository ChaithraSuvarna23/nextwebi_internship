import './Reviewcards.css';

export default function Reviewcards({ image, name, rating, review }) {
  return (
    <div className="reviewCard">
      <div className="reviewHeader">
        <img src={image} alt={name} className="reviewAvatar" />
        <div className="reviewInfo">
          <h3 className="reviewName">{name}</h3>
          <div className="stars">{'★'.repeat(rating)}</div>
        </div>
      </div>
      <p className="reviewText">{review}</p>
    </div>
  );
}
