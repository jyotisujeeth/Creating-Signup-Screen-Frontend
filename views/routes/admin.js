const path= requir('path');

const express = require('express');

const adminController = require('../controllers/admin');
const router= express.Router();
const Expense = require('../models/expense');


const bodyParser= require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));



router.post('/add-expense', adminController.addExpense.postAddExpenses)

router.get('/get-expenses',adminController.getExpenses.getExpenses)

router.delete('/delete-expense/:id',adminController.deleteExpense)

module.exports = router;