import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
  CircularProgress,
  Paper,
  Chip
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const cookie = Cookies.get('userInfo');
    if (!cookie) return;

    const { id: userId } = JSON.parse(cookie);

    try {
      const res = await axios.get(`http://localhost:5000/api/order/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fff9f3', minHeight: '100vh', py: 5, px: 2 }}>
      <Paper elevation={6} sx={{ maxWidth: 900, mx: 'auto', p: 4, borderRadius: 4 }}>
        <Typography
          variant="h4"
          color="#6E260E"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography textAlign="center">You haven’t placed any orders yet.</Typography>
        ) : (
          <Stack spacing={4} mt={4}>
            {orders.map((order, index) => (
              <Card key={index} elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6" fontWeight="bold" color="#6E260E">
                      <ShoppingBagIcon fontSize="small" sx={{ mr: 1 }} />
                      Order #{index + 1}
                    </Typography>
                    <Chip
                      label={new Date(order.timestamp).toLocaleString()}
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: '0.8rem' }}
                    />
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  <Stack spacing={1} mb={2}>
                    {order.cartItems.map((item, i) => (
                      <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>{item.title} × {item.quantity}</Typography>
                        <Typography fontWeight="bold">
                          ₹{item.price * item.quantity}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body1" fontWeight="bold" textAlign="right">
                    Total: ₹{order.total}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={1} mt={2}>
                    <Typography variant="body2">
                      <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                      {order.name}
                    </Typography>
                    <Typography variant="body2">
                      <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                      {order.phone}
                    </Typography>
                    <Typography variant="body2">
                      <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                      {order.address}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
