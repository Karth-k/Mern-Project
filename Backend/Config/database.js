const mongoose = require('mongoose');

let connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("The DB is connected");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    }
};

module.exports = connectDb;
