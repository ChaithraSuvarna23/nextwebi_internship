const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const biryaniRoutes = require('./routes/BiryaniRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const cartRoutes = require('./routes/CartRoutes');

app.use('/api/biryani', biryaniRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 


// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error(" MONGO_URI not found in .env");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });


const biryaniRoutes = require('./routes/BiryaniRoutes');
const orderRoutes = require('./routes/OrderRoutes');

app.use('/api/biryani', biryaniRoutes);
app.use('/api/order', orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
*/