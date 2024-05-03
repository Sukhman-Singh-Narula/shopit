import express from "express";
import { getProducts, newProduct, getProductDetails, updateProduct, deleteProduct } from "../controllers/productControllers.js";
import { isAuthenticatedUser, authoriseRoles } from "../middlewares/auth.js";
const router = express.Router();



router.route("/products").get(getProducts);
router.route("/admin/products").post(isAuthenticatedUser, authoriseRoles('admin'), newProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/admin/products/:id").put(isAuthenticatedUser, authoriseRoles('admin'),updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser, authoriseRoles('admin'),deleteProduct);




export default router;
