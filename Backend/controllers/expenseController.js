const expenseModel = require('../models/expenses-model');


const addExpense = async (req, res) => {
    try {
        const { title, description, amount, date, category } = req.body;
        if(!title || !amount || !category || !date || !description){
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        if(amount <= 0 || typeof amount !== 'number'){
            return res.status(400).json({ message: "Invalid amount" });
        }
        const newIncome = new expenseModel({
            title,
            description,
            amount,
            date,
            category,
            userId: req.user._id
        })
        await newIncome.save();
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}



const getExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.find({ userId: req.user._id }).select('-userId').sort({ createdAt : -1 });
        res.status(200).json({ expenses });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}


const deleteExpense = async (req, res) =>{
    try {
        const id = req.params.id;
        const income = await expenseModel.findByIdAndDelete({ _id: id, userId: req.user._id });
        if(!income){
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}



module.exports = {addExpense, getExpenses, deleteExpense }