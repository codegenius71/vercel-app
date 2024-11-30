const mongoose = require('mongoose');
const slugify = require('slugify');

// Define the Item schema
const itemSchema = new mongoose.Schema({
  imageURL: { type: String, required: true }, // URL of the item's image
  items_left: { type: Number, required: true }, // Number of items in stock
  price: { type: Number, required: true }, // Price of the item
  category: { type: String, required: true }, // Category of the item (e.g., clothing, electronics)
  gender: { type: String, required: true }, // Gender suitability (e.g., male, female, unisex)
  brand: { type: String, required: true }, // Brand of the item
  name: { type: String, required: true }, // Name of the item
  slug: { type: String, unique: true } // Slug for the item, unique identifier generated from the name
});

// Middleware to generate a unique slug before saving the item
itemSchema.pre('save', async function (next) {
  if (this.isModified('name') && !this.slug) {
    let slug = slugify(this.name, { lower: true, strict: true });

    // Check if the generated slug already exists
    const existingItem = await mongoose.models.Item.findOne({ slug });
    if (existingItem) {
      // Append a unique timestamp to the slug to avoid duplicates
      slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
  }
  next();
});

// Index to optimize search queries involving slug and category
itemSchema.index({ slug: 1, category: 1 });

// Create the Item model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
