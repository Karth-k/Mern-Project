const express = require("express");
const connectDb = require('./Config/database');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT=process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();
connectDb()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
