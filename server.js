const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item'); // Your item model
const User = require('./models/user');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;  // Now you can access it using process.env.JWT_SECRET

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1); // Exit the application if the connection string is missing
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1); // Exit the server if MongoDB connection fails
  });
const authRouter = require('./routes/authRoutes');
app.use('/api/auth', authRouter); // Make sure this is correct


app.use(express.static(path.join(__dirname, 'public')));
// Import routes
const PORT = process.env.PORT || 3000;

// Middleware

// Auth routes

// Serve the sign-in and sign-up pages
app.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign-in.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign-up.html'));
});
// Serve static files from the "public" folder

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the cart page
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

// Route for the checkout page
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

app.get('/cartcheckout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cartcheckout.html'));
});
// Route for fetching all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find({}); // Fetch all items from the database
    res.json(items); // Send back the list of items
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

app.get('/products', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'allproducts.html'));
})
// Route for fetching a specific product by slug
app.get('/product/:slug', async (req, res) => {
  const slug = req.params.slug;

  try {
    const product = await Item.findOne({ slug }); // Fetch product based on slug
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Read product.html and replace placeholders with product data
    fs.readFile(path.join(__dirname, 'public', 'product.html'), 'utf8', (err, html) => {
      if (err) {
        console.error('Error reading product.html:', err);
        return res.status(500).send('Error loading the product page');
      }

      // Replace placeholders with actual product data
      html = html.replace('{{title}}', product.name)
                 .replace('{{name}}', product.name)
                 .replace('{{price}}', `${product.price}`)
                 .replace('{{imageURL}}', `${product.imageURL}`);

      res.send(html);
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Error fetching product');
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
