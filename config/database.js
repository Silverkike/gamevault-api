const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Removed useNewUrlParser and useUnifiedTopology as they are default in Mongoose 6+
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Connection Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;