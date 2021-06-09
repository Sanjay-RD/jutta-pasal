import Prouduct from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all Products
// @route   GET /api/products
// access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Prouduct.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  // throw new Error("some error");
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single Product
// @route   GET /api/products/:id
// access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Prouduct.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res
      .status(404)
      .json({ message: `Product with id:${req.params.id} not found` });
  }
});

// @desc    Delete a Product
// @route   DELETE /api/products/:id
// access   Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Prouduct.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res
      .status(404)
      .json({ message: `Product with id:${req.params.id} not found` });
  }
});

// @desc    Create a Product
// @route   POST /api/products
// access   Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a Product
// @route   Put /api/products/:id
// access   Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, countInStock, image, brand, category } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.image = image;
    product.price = price;
    product.countInStock = countInStock;
    product.brand = brand;
    product.category = category;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Create a Review
// @route   POST /api/products/:id/review
// access   Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      name: product.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Get to rated products
// @route   GET /api/products/top
// access   Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
