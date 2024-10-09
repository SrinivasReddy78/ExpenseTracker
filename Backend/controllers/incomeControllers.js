const incomeModel = require('../models/income-model');


const addIncome = async (req, res) => {
    try {
        const { title, description, amount, date, category } = req.body;
        if(!title || !amount || !category || !date || !description){
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        if(amount <= 0 || typeof amount !== 'number'){
            return res.status(400).json({ message: "Invalid amount" });
        }
        const newIncome = new incomeModel({
            title,
            description,
            amount,
            date,
            category,
            userId: req.user._id
        })
        await newIncome.save();
        res.status(201).json({ message: 'Income added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}



const getIncomes = async (req, res) => {
    try {
        const incomes = await incomeModel.find({ userId: req.user._id }).select('-userId').sort({ createdAt : -1 });
        res.status(200).json({ incomes });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}


const deleteIncome = async (req, res) =>{
    try {
        const id = req.params.id;
        const income = await incomeModel.findByIdAndDelete({ _id: id, userId: req.user._id });
        console.log(income);
        if(!income){
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}



module.exports = {addIncome, getIncomes, deleteIncome }