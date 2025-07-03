import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge } from '@mui/material';
import { useCart } from 'context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar">
      <img className="logo" src="/assets/logo 2.png" alt="Logo" />
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="#">About Us</Link>
        <Link to="#">Menu</Link>
        <Link to="#">Contact</Link>
        <Link to="/list" className="dinebtn">Dine in</Link>
        
        <Link to="/cart" className="cart-link">
          <Badge
            badgeContent={totalItems}
            sx={{
              '& .MuiBadge-badge': {
                color: '#6E260E',       
                backgroundColor: '#ffff', 
              }
            }}
            overlap="circular"
          >
            <FaShoppingCart size={25} />
          </Badge>
        </Link>
      </nav>
    </div>
  );
}
