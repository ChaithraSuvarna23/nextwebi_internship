import React from 'react';
import { useCart } from 'context/CartContext';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import 'styles.css';

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const handleDecrease = (item) => {
    const newQty = item.quantity - 1;
    if (newQty <= 0) {
      removeFromCart(item.title);
    } else {
      addToCart({ ...item, quantity: newQty });
    }
  };

  const handleIncrease = (item) => {
    const newQty = item.quantity + 1;
    addToCart({ ...item, quantity: newQty });
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ maxWidth: '900px', mx: 'auto', py: 5, px: 2 }} className="cart-page">
      <Typography variant="h4" textAlign="center" color="#6E260E" fontWeight="bold" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Stack spacing={3}>
            {cartItems.map((item) => (
              <Card key={item.title} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ width: 90, height: 90, borderRadius: 2, mr: 2 }}
                />
                <Box sx={{ width: 10 }} />
                <Box sx={{ flexGrow: 1, paddingTop: '1.2rem' }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.price} × {item.quantity}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                      <IconButton onClick={() => handleDecrease(item)}>
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => handleIncrease(item)}>
                        <Add />
                      </IconButton>
                      <IconButton
                        sx={{ color: '#6E260E' }}
                        onClick={() => removeFromCart(item.title)}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" textAlign="right">
            Total: ₹{total}
          </Typography>

          <Button
            variant="contained"
            onClick={clearCart}
            sx={{
              backgroundColor: '#6E260E',
              mt: 2,
              display: 'block',
              ml: 'auto',
              borderRadius: '10px'
            }}
          >
            Clear Cart
          </Button>
        </>
      )}
    </Box>
  );
}



/*import React from 'react';
import { useCart } from 'context/CartContext';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'styles.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleDecrease = (title, quantity) => {
    if (quantity > 1) {
      updateQuantity(title, quantity - 1);
    } else {
      removeFromCart(title);
      toast.error(`${title} removed from cart`);
    }
  };  

  const handleIncrease = (title, quantity) => {
    updateQuantity(title, quantity + 1);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ maxWidth: '900px', mx: 'auto', py: 5, px: 2 }}
      className="cart-page">
      <Typography variant="h4" textAlign="center" color='#6E260E' fontWeight="bold" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Stack spacing={3}>
            {cartItems.map(item => (
              <Card key={item.title} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ width: 90, height: 90, borderRadius: 2, mr: 2 }}
                />
                <Box sx={{ width: 10 }}/>
                <Box sx={{ flexGrow: 1 ,paddingTop: '1.2rem'}}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.price} × {item.quantity}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                      <IconButton onClick={() => handleDecrease(item.title, item.quantity)}>
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => handleIncrease(item.title, item.quantity)}>
                        <Add />
                      </IconButton>
                      <IconButton
                        sx={{color: '#6E260E'}}
                        onClick={() => {
                          removeFromCart(item.title);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" textAlign="right">
            Total: ₹{total}
          </Typography>

          <Button
            variant="contained"
            onClick={() => {
              clearCart();
            }}
            sx={{ backgroundColor: '#6E260E',  mt: 2, display: 'block', ml: 'auto' ,borderRadius: '10px'}}
          >
            Clear Cart
          </Button>
        </>
      )}
    </Box>
  );
}
*/