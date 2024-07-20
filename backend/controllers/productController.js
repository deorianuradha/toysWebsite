import asyncHandler from "../middlewares/asyncHandler.js";
import Product from '../models/productModel.js';



const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand, image } = req.fields;

    // Validation
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!brand) return res.status(400).json({ error: "Brand is required" });
    if (!description) return res.status(400).json({ error: "Description is required" });
    if (!price) return res.status(400).json({ error: "Price is required" });
    if (!category) return res.status(400).json({ error: "Category is required" });
    if (!quantity) return res.status(400).json({ error: "Quantity is required" });

    // Create and save the product
    const product = new Product({ name, description, price, category, quantity, brand, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update Product
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand, image } = req.fields;

    // Validation
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!brand) return res.status(400).json({ error: "Brand is required" });
    if (!description) return res.status(400).json({ error: "Description is required" });
    if (!price) return res.status(400).json({ error: "Price is required" });
    if (!category) return res.status(400).json({ error: "Category is required" });
    if (!quantity) return res.status(400).json({ error: "Quantity is required" });

    // Update product
    const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, category, quantity, brand, image }, { new: true });
    
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Remove Product
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product removed", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch Products with Pagination and Search
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: count > pageSize,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Fetch Product by ID
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

// Fetch All Products
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate({ path: 'category', model: 'Category' })
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Add Product Review
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());

    if (alreadyReviewed) return res.status(400).json({ error: "Product already reviewed" });

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Fetch Top Products
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Fetch New Products
const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const filterProducts = asyncHandler(async(req, res) => {
  try {
    const {checked, radio} = req.body

    let args = {}
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = {$gte: radio[0], $lte: radio[1]}

    const products = await Product.find(args)
    res.json(products);

  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Server Error"})
  }
})

export {
  addProduct, 
  updateProductDetails, 
  removeProduct, 
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};