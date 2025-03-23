const dotenv =require('dotenv');
const Admin = require("../model/Admin");
const Customer = require("../model/Customer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Data = require('../model/Data');
const Vendor = require('../model/Vendor');
const Cart = require('../model/Cart');
const Order = require('../model/Order');
const Stripe = require('stripe');
dotenv.config();
const path = require('path')
const multer = require('multer')
const JWT_SECRET = process.env.JWT_SECRET;



let register = async (req, res) => {
  const {  name, phoneNumber, email, password, role,sellerName, sellerPhoneNumber, sellerEmail, sellerPassword,adminName,adminPhoneNumber,adminEmail,adminPassword} = req.body;

  console.log(req.body);
  try {
  const salt= await bcrypt.genSalt(10);
  const hashedPassword = password ? await bcrypt.hash(password,salt):null ;
  const hashedSellerPassword =  sellerPassword ? await bcrypt.hash(sellerPassword,salt): null;
  const hashedAdminPassword =  adminPassword ? await bcrypt.hash(adminPassword,salt) : null;
  

  
    if (role === "customer") {
      const newcustomer = new Customer({ name, phoneNumber, email, password:hashedPassword, role });
      await newcustomer.save();
      return res.status(201).json({ message: "Customer registered successfully!" });
    } else if (role === "vendor") {
      const newVendor = new Vendor({ sellerName, sellerPhoneNumber,  sellerEmail,sellerPassword:hashedSellerPassword, role});
      await newVendor.save();
      return res.status(201).json({ message: "Vendor registered successfully!" });
    } else if(role === "admin"){
      const newAdmin = new Admin({ adminName, adminPhoneNumber, adminEmail, adminPassword:hashedAdminPassword, role});
      await newAdmin.save();
      return res.status(201).json({ message: "Admin registered successfully!" });
    }
    else{
      return res.status(400).json({ message: "Invalid role. Only 'customer' or 'vendor' allowed." });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let check; 
    let role;

    check = await Customer.findOne({ email });
    if (check && await bcrypt.compare(password,check.password)) {
      role = "customer";
      const token = jwt.sign({ id: check._id, role },JWT_SECRET, { expiresIn: "1h" }); 
      return res.status(200).json({ message: "Customer logged in successfully!", role, authToken: token });
    }

    check = await Vendor.findOne({ sellerEmail: email});
    if (check && await bcrypt.compare(password,check.sellerPassword)) {
      role = "vendor";
      const token = jwt.sign({ id: check._id, role }, JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({ message: "Vendor logged in successfully!", role, authToken: token });
    }

    check = await Admin.findOne({ adminEmail: email });
    if (check && await bcrypt.compare(password,check.adminPassword)) {
      role = "admin";
      const token = jwt.sign({ id: check._id, role }, JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({ message: "Admin is logged  in successfully..", role, authToken: token });
    }

    return res.status(404).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};



// -----------Node Mailer------------


const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
})


// -----------Forgot Password------------

const forgot_password = async(req,res) =>{
    const{email} = req.body;

    try{
      let role =await Customer.findOne({email}) || await Vendor.findOne({sellerEmail:email}) || await Admin.findOne({adminEmail:email})

      if(!role){
        return res.status(404).json({message:"User not found"});
      }


      const resetToken = jwt.sign({id:role._id},JWT_SECRET,{expiresIn:"10m"});

      const url = `http://localhost:3000/reset-password/${resetToken}`;
      const mailOptions ={
        from:process.env.EMAIL_USER,
        to:email, 
        subject:"Password Reset",
        html:`<h2>Please click on the link below to reset your password</h2>
              <a href=${url}>${url}</a>`
      }
      await transporter.sendMail(mailOptions);
      res.status(200).json({message:"Password reset link sent to your email"});
    }
    catch(error){
      console.error("Error during password reset:",error);
      return res.status(500).json({message:"Server error. Please try again later."});
    }

}


// -----------Reset Password------------



const reset_password = async(req,res) =>{
    const{token} = req.params;
    const{newPassword} = req.body;  

    try{
      const decoded = jwt.verify(token,JWT_SECRET);
      console.log("Decodedd ",decoded);
      const email =decoded.email;

      let role =
          (await Customer.findOne({ _id: decoded.id })) || (await Vendor.findOne({ _id: decoded.id })) || (await Admin.findOne({ _id: decoded.id }));

          if(!role){

            return res.status(404).json({message:"User not found"});  
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newPassword,salt);


          if(role.email)role.password = hashedPassword;
          if(role.sellerEmail)role.sellerPassword = hashedPassword;
          if(role.adminEmail)role.adminPassword = hashedPassword;

          await role.save();
          res.status(200).json({message:"Password reset successfully"});
      }catch(error){
        console.error("Error during password reset:",error);
        return res.status(500).json({message:"Server error. Please try again later."});
      }
    }




// -----------Product Rendering------------


    const productsdetails = async (req, res) => {
      try {
        const products = await Data.find();
    
       
        const updatedProducts = products.map((product) => {
          return {
            ...product._doc,
            image: (product.image || []).map((img) =>
              img.startsWith("http") ? img : `http://localhost:5000/${img}`
            ),
            image_1: (product.image_1 || []).map((img) =>
              img.startsWith("http") ? img : `http://localhost:5000/${img}`
            ),
            image_2: (product.image_2 || []).map((img) =>
              img.startsWith("http") ? img : `http://localhost:5000/${img}`
            ),
            brand_image:
              product.brand_image && typeof product.brand_image === "string" && product.brand_image.trim() !== ""
                ? product.brand_image.startsWith("http")
                  ? product.brand_image
                  : `http://localhost:5000/${product.brand_image}`
                : null, 
          };
        });
    
        res.json(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error });
      }
    };


// -----------Multer Adding------------



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});



const upload = multer({ storage });


// -----------Vendor Adding Products------------


const addproducts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];  
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendorId = decoded.id; 

    console.log("Decoded Token:", decoded);
    console.log("Request body:", req.body);

    const baseUrl = `${req.protocol}://${req.get("host")}/`; 

    const imagePaths = req.files["images"] 
      ? req.files["images"].map(file => baseUrl + file.path) 
      : [];

    const brandImagePath = req.files["brand_image"] 
      ? baseUrl + req.files["brand_image"][0].path 
      : null;

    const newProduct = new Data({
      ...req.body,
      vendorId,
      image: imagePaths[0] || "",
      image_1: imagePaths[1] || "",
      image_2: imagePaths[2] || "",
      brand_image: brandImagePath
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// -----------Indivual Prodcuts Based on ID Rendering------------



const singleProductsDetails = async (req, res) => {
  try {
    const product = await Data.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Fetched product:", product);

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};




const vendorProducts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendorId = decoded.id;

    const products = await Data.find({ vendorId });

    res.json(products); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor products", error });
  }
};




// -----------Sendin Prodcuts to Cart------------

    
    
const sendCart = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    const { cart } = req.body;
    console.log("Received Cart Data:", cart);
    const userId = req.user.id;
    
    for (const item of cart) {
      const product = await Data.findById(item._id);

      if (!product) {
        return res.status(404).json({ error: `Product ${item._id} not found. `});
      }

      if (item.quantity > product.Quantity) {
        return res.status(400).json({
          error: `Stock limit exceeded for ${product.title}. Available: ${product.Quantity}, Requested: ${item.quantity}`,
        });
      }
    }

   
    let existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      existingCart.items = cart;
      await existingCart.save();
    } else {
      await Cart.create({ userId, items: cart });
    }

    res.status(200).json({ message: "Cart saved successfully!" });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};


// -----------Retriving the Cart Products------------


const showCart = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    res.status(200).json(cart ? cart.items : []);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};



// -----------Payment and setting up Stripe------------

   
   
    
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    
    const createCheckoutSession = async (req, res) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
    
        if (!token) {
          return res.status(401).json({ error: "Unauthorized: No token provided" });
        }
    
        let decoded;
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          return res.status(403).json({ error: "Invalid or expired token" });
        }
    
        if (decoded.role !== "customer") {
          return res.status(403).json({ error: "Access denied: Only customers can proceed" });
        }
    
        const { cartItems, shippingAddress } = req.body;
        const userId = decoded.id;
    
        const customer = await Customer.findById(userId);
        if (!customer) {
          return res.status(404).json({ error: "Customer not found" });
        }
    
        const addressExists = customer.addresses.some((addr) =>
          Object.keys(shippingAddress).every((key) => addr[key] === shippingAddress[key])
        );
    
        if (!addressExists) {
          customer.addresses.push(shippingAddress);
          await customer.save();
        }
    
        const line_items = cartItems.map((item) => ({
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
              images: (Array.isArray(item.image) && item.image.length > 0) 
                ? [item.image[0]]  
                : [],  
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }));
        
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `http://localhost:4000/ConfirmOrder?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: "http://localhost:4000/cancel",
          metadata: { cartItems: JSON.stringify(cartItems), userId },
        });
    
        res.json({ id: session.id });
      } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
      }
    };
    
// -----------Storing Order to Backend------------
  

const storeOrder = async (req, res) => {
  try {
    console.log("Received order request:", req.body); 
    const token = req.header("Authorization");
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { cartItems } = req.body;

  
    const newOrder = await Order.create({
      userId,
      items: cartItems,
      status: "Paid",
      createdAt: new Date(),
    });

    console.log("Order created:", newOrder); 

   
    
   
    const deletedCart = await Cart.deleteOne({ userId });
    console.log("Cart deleted:", deletedCart); 

    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};
// for (const item of cartItems) {
    //   const updatedProduct = await Data.findOneAndUpdate(
    //     { _id: item._id },
    //     { $inc: { Quantity: -item.quantity } },
    //     { new: true }
    //   );

    //   console.log(`Stock updated for ${item._id}:`, updatedProduct); 
    // }



// -----------Confirm Order Check------------


const confirmOrder = async (req, res) => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("Stripe Session Data:", session); 

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

   
    const cartItems = JSON.parse(session.metadata.cartItems);
    const userId = session.metadata.userId;

    console.log("Cart Items:", cartItems); 
    console.log("User ID:", userId); 

    if (!cartItems || !userId) {
      return res.status(400).json({ error: "Invalid order details" });
    }

    
    const formattedItems = cartItems.map((item) => ({
      productId: item._id, 
      title: item.title,
      price: item.price,
      image: item.image[0], 
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      Quantity: item.Quantity, 
    }));

    
    const order = new Order({
      userId,
      items: formattedItems, 
      paymentStatus: "Paid",
    });

    await order.save();
    console.log("Order saved:", order); 


    for (const item of formattedItems) {
      const updatedProduct = await Data.findOneAndUpdate(
        { _id: item.productId },
        { $inc: { Quantity: -item.quantity } },
        { new: true }
      );

      console.log(`Stock updated for ${item.productId}:`, updatedProduct);
    }

    res.status(200).json({ message: "Order confirmed successfully", order });

  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


    
   
    
module.exports = {
  register, 
  login,
  forgot_password,
  reset_password,
  productsdetails,
  singleProductsDetails,
  addproducts,
  vendorProducts,
  sendCart,showCart,
  addproducts,upload,
  createCheckoutSession ,
  storeOrder ,
  confirmOrder,
  

};








// buyNow
 // const buyNow= async (req, res) => {
    //   try {
    //     const { customerId } = req.params;
    //     const addressData = req.body;
    
    //     const customer = await Customer.findById(customerId);
    //     if (!customer) {
    //       return res.status(404).json({ message: "Customer not found" });
    //     }
    
    //     customer.addresses.push(addressData);
    //     await customer.save();
    
    //     res.status(200).json({ message: "Address added successfully", customer });
    //   } catch (error) {
    //     console.error("Error saving address:", error);
    //     res.status(500).json({ message: "Server error" });
    //   }
    // };
    