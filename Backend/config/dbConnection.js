const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/ExpenseTracker';
        await mongoose.connect(uri);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
};

connectDB();

module.exports = mongoose.connection;
