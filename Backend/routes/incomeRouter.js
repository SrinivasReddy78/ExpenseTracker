const express = require('express');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeControllers');
const router = express.Router();


router.post('/add-income', addIncome);
router.get('/all-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome)




module.exports = router;