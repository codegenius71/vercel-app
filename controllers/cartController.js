// controllers/cartController.js

const Cart = require('../models/Cart'); // Assuming Cart model exists
const { verifyToken } = require('../middleware/auth');

// Example controller for fetching the cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
