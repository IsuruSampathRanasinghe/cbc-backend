import express from 'express';
import { getProducts,createProduct, deleteProduct, updateProduct, getProductId, getProductsBySearch } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/",getProducts)
productRouter.post("/",createProduct)
productRouter.delete("/:productID",deleteProduct);
productRouter.put("/:productID",updateProduct)
productRouter.get("/search/:query", getProductsBySearch)
productRouter.get("/:productID",getProductId)


export default productRouter;