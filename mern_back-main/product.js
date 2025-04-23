const mongoose = require('mongoose')

// Define Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
}, { timestamps: true })

// Create Model
const ProductModel = mongoose.model('Products', ProductSchema, 'Products')

module.exports = ProductModel
