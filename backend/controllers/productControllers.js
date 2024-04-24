import Product from "../models/product.js";


// Create new product => /api/v1/products
export const getProducts = async (req, res) => {

  const products = await Product.find();

  res.status(200).json({
    products
  });
};

// Create new product => /api/v1/admin/products

export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
};

// single product fetching => /api/v1/products/:id

export const getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found with this ID",
    });
  }

  res.status(200).json({
    product,
  });
}

export const updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found with this ID",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json({
    product,
  });
}

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found with this ID", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
}