const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Budget = require('../../models/Budget');
const User = require('../../models/User');

// @route   GET api/budget
// @desc    Get my budget
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.user.id });

    if (!budget) {
      return res.status(400).json({ msg: 'There is no budget for this user' });
    }

    res.json(budget);
  } catch (err) {
    console.error(err.message);
  }
});

// @route   POST api/budget
// @desc    Create or update budget
// @access  Private
router.post('/', auth, async (req, res) => {
  const { spenditure, budgetLimit } = req.body;

  // Build budget object
  const budgetObj = {};
  budgetObj.user = req.user.id;
  if (spenditure) budgetObj.spenditure = spenditure;
  if (budgetLimit) budgetObj.budgetLimit = budgetLimit;

  try {
    let budget = await Budget.findOne({ user: req.user.id });

    if (budget) {
      //update
      budget = await Budget.findOneAndUpdate(
        { user: req.user.id },
        { $set: budgetObj },
        { new: true }
      );

      return res.json(budget);
    }

    //Create
    budget = new Budget(budgetObj);
    await budget.save();
    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
