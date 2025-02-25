const express = require('express');



const router = express.Router();

const{register,login,forgot_password,reset_password,productsdetails,singleProductsDetails,addproducts,vendorProducts}= require('../Controllers/userControllers');


router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password',forgot_password);
router.post('/reset-password/:token',reset_password);
router.get('/products',productsdetails);
router.get('/products/:id',singleProductsDetails);
router.post('/addProduct',addproducts);
router.get("/vendor-products", vendorProducts);


module.exports = router;