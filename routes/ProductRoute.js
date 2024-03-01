import Express from "express";
import {
    getProducts,
    getProductsById,
    createProducts,
    updateProducts,
    deleteProducts
} from "../controller/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = Express.Router();

router.get('/products', verifyUser, getProducts);
router.get('/products/:id', verifyUser, getProductsById);
router.post('/products', verifyUser, createProducts);
router.patch('/products/:id', verifyUser, updateProducts);
router.delete('/products/:id', verifyUser, deleteProducts);


export default router