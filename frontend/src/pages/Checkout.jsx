import React, { useState } from 'react';
import { useCart } from 'context/CartContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [userData, setUserData] = useState({ name: '', phone: '', address: '' });
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!userData.name || !userData.phone || !userData.address) {
      toast.error('Please fill all fields');
      return;
    }

    const cookie = Cookies.get('userInfo');
    if (!cookie) {
      toast.error('User session not found!');
      return;
    }

    
  try {
    await axios.post(
      'http://localhost:5000/api/order',
      {
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        cartItems,
        total,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, 
      }
    );

      toast.success('Order placed successfully!');
      clearCart();
      setUserData({ name: '', phone: '', address: '' });
      navigate('/orders');
    } catch (error) {
      console.error('Order submission failed:', error);
      toast.error('Failed to place order. Try again.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#fdf7f3', minHeight: '100vh', py: 5 }}>
      <Paper elevation={6} sx={{ maxWidth: 800, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography variant="h4" color="#6E260E" fontWeight="bold" gutterBottom>
          Checkout
        </Typography>

        <Stack spacing={3} mt={2}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={userData.name}
            onChange={handleChange}
            autoComplete="name"
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            value={userData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          <TextField
            label="Address"
            name="address"
            multiline
            rows={3}
            fullWidth
            value={userData.address}
            onChange={handleChange}
            autoComplete="street-address"
          />
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>

        <Stack spacing={2}>
          {cartItems.map((item) => (
            <Card key={item.title} sx={{ bgcolor: '#fff7f0' }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{item.title} × {item.quantity}</Typography>
                <Typography fontWeight="bold">₹{item.price * item.quantity}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Typography variant="h6" textAlign="right" mt={3}>
          <strong>Total: ₹{total}</strong>
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: '#6E260E',
            '&:hover': { backgroundColor: '#5a1f0b' },
            fontWeight: 'bold',
            px: 5,
            borderRadius: '10px'
          }}
          fullWidth
          onClick={handleOrder}
        >
          Place Order
        </Button>
      </Paper>
    </Box>
  );
}




/*import React, { useState } from 'react';
import { useCart } from 'context/CartContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Divider
} from '@mui/material';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!userData.name || !userData.phone || !userData.address) {
      toast.error('Please fill all fields');
      return;
    }

    const cookie = Cookies.get('userInfo');
    if (!cookie) {
      toast.error('User session not found!');
      return;
    }

    const userInfo = JSON.parse(cookie);

    const orderSummary = {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      total,
      timestamp: new Date().toISOString()
    };

    const updatedUser = {
      ...userInfo,
      orderSummary  
    };

    Cookies.set('userInfo', JSON.stringify(updatedUser), { expires: 7 });

    console.log('Order saved in cookie:', updatedUser);
    toast.success('Order placed successfully!');
    clearCart();
    setUserData({ name: '', phone: '', address: '' });
    navigate('/'); 
  };


  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 5, px: 3 }}>
      <Typography variant="h4" gutterBottom color="#6E260E" fontWeight="bold">
        Checkout
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={userData.name}
          onChange={handleChange}
          autoComplete='name'
        />
        <TextField
          label="Phone Number"
          name="phone"
          fullWidth
          value={userData.phone}
          onChange={handleChange}
          autoComplete='tel'
        />
        <TextField
          label="Address"
          name="address"
          multiline
          rows={3}
          fullWidth
          value={userData.address}
          onChange={handleChange}
          autoComplete='address'
        />
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>

      <Stack spacing={2}>
        {cartItems.map(item => (
          <Card key={item.title}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{item.title} × {item.quantity}</Typography>
              <Typography>₹{item.price * item.quantity}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Typography variant="h6" sx={{ textAlign: 'right', mt: 2 }}>
        Total: ₹{total}
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 4, backgroundColor: '#6E260E' }}
        onClick={handleOrder}
      >
        Place Order
      </Button>
    </Box>
  );
}
*/

