const express = require('express');



const router = express.Router();

const{register,login,forgot_password,reset_password,productsdetails,
    singleProductsDetails,addproducts,vendorProducts,sendCart,showCart,upload,createCheckoutSession,storeOrder
    ,confirmOrder}= require('../Controllers/userControllers');

    const uploadFields = upload.fields([
        { name: "images", maxCount: 3 },  
        { name: "brand_image", maxCount: 1 } 
      ]);
      
      router.post("/addProduct", uploadFields, addproducts);
      
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password',forgot_password);
router.post('/reset-password/:token',reset_password);
router.get('/products',productsdetails);
router.get('/products/:id',singleProductsDetails);
router.get("/vendor-products", vendorProducts);
router.post("/cart", sendCart);
router.get("/show/cart", showCart);
router.post("/payment", createCheckoutSession)
router.post("/orders", storeOrder);
router.post("/orders/confirm-order", confirmOrder);

module.exports = router;    





// router.post("/customers/:customerId/address",buyNow);
// router.post();
// router.post("/addProduct", upload.array("images", 3), addproducts);
// router.post("/address",addAdress);
// router.delete('/cart',clearCart);