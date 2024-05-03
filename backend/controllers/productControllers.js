import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
import { response } from "express";

// Create new product => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {

  const apiFilters = new APIFilters(Product, req.query).search().filters()

  const resPerPage = 4;
  let products = await apiFilters.query;
  let filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductsCount,
    products
  });
});

// Create new product => /api/v1/admin/products

export const newProduct = catchAsyncErrors(async (req, res,next) => {
  req.body.user=req.user._id
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

// single product fetching => /api/v1/products/:id

export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found with this ID", 404));
  }

  res.status(200).json({
    product,
  });
})

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found with this ID", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json({
    product,
  });
})

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found with this ID", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
})