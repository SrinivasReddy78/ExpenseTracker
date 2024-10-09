const express = require('express');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();


router.post('/add-expense', addExpense);
router.get('/all-expenses', getExpenses);
router.delete('/delete-expense/:id', deleteExpense)




module.exports = router;