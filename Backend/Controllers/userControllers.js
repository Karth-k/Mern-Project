const dotenv =require('dotenv');
const Admin = require("../model/Admin");
const Customer = require("../model/Customer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Data = require('../model/Data');
const Vendor = require('../model/Vendor');
dotenv.config();
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


const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
})



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


   let productsdetails = async (req, res) => {
      try {
        const products = await Data.find(); 
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
      }
    };
    

    let addproducts = async (req, res) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];  
        if (!token) return res.status(401).json({ message: "Unauthorized" });
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const vendorId = decoded.id; 

        console.log("Decoded Token:", decoded);
        console.log("Request body:", req.body);
    
        const newProduct = new Data({
          ...req.body,  
          vendorId: vendorId, 
        });
    
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", newProduct });
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }


    const singleProductsDetails = async (req, res) => {
      try {
        const product = await Data.findById(req.params.id); 
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
      } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
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
    
   
    
    
    
module.exports = {
  register, 
  login,
  forgot_password,
  reset_password,
  productsdetails,
  singleProductsDetails,
  addproducts,
  vendorProducts
};
